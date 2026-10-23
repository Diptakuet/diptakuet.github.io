/* ==========================================================================
   Site interactions: home page frequency trace, publication filters, cite buttons
   ========================================================================== */

(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ------------------------------------------------------------------------
     Frequency trace: a CPU frequency signal whose high/low levels encode the
     bits of a message, "recovered" as it scrolls past the sampling cursor.
     ------------------------------------------------------------------------ */
  function initScope(canvas) {
    var ctx = canvas.getContext("2d");
    var readout = document.querySelector("[data-scope-readout]");
    var decodedEl = document.querySelector("[data-scope-decoded]");

    var MESSAGE = "SIDE-CHANNEL LEAK ";
    var BIT_W = 26;                 // px per bit
    var SPEED = 38;                 // px per second
    var F_HI = 3.8, F_LO = 1.6;     // GHz
    var F_MIN = 1.0, F_MAX = 4.4;   // plot range
    var CURSOR = 0.8;               // cursor position as a fraction of width

    var bits = [];
    for (var i = 0; i < MESSAGE.length; i++) {
      var code = MESSAGE.charCodeAt(i);
      for (var b = 7; b >= 0; b--) bits.push((code >> b) & 1);
    }

    var width = 0, height = 0, dpr = 1;
    var offset = 0;                 // global x of the left edge
    var samples = [];               // samples[k] = frequency at global x = sampleStart + k
    var sampleStart = 0;
    var level = F_LO;
    var lastByte = -1;
    var decoded = "";
    var running = false, visible = true, lastTime = 0;

    function bitAt(gx) {
      var idx = Math.floor(gx / BIT_W);
      return bits[((idx % bits.length) + bits.length) % bits.length];
    }

    function extendTo(gx) {
      while (sampleStart + samples.length <= gx) {
        var x = sampleStart + samples.length;
        var target = bitAt(x) ? F_HI : F_LO;
        level += (target - level) * 0.16;
        samples.push(level + (Math.random() - 0.5) * 0.12);
      }
      var drop = Math.floor(offset) - sampleStart - 4;
      if (drop > 0) { samples.splice(0, drop); sampleStart += drop; }
    }

    function sampleAt(gx) {
      return samples[Math.max(0, Math.round(gx) - sampleStart)];
    }

    function yFor(f) {
      var pad = 14;
      return pad + (1 - (f - F_MIN) / (F_MAX - F_MIN)) * (height - 2 * pad - 14);
    }

    var placed = false;

    function resize() {
      dpr = window.devicePixelRatio || 1;
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      if (!placed && width) {
        // start with the first bit of the message under the cursor
        placed = true;
        offset = reduceMotion ? 0 : -width * CURSOR;
        sampleStart = Math.floor(offset);
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    }

    function updateDecoded(gx) {
      var bitIdx = Math.floor(gx / BIT_W);
      var byteIdx = Math.floor(bitIdx / 8);
      if (byteIdx !== lastByte) {
        if (lastByte >= 0) {
          var ch = MESSAGE.charAt(((lastByte % MESSAGE.length) + MESSAGE.length) % MESSAGE.length);
          if (lastByte % MESSAGE.length === 0) decoded = "";
          decoded += ch;
          if (decodedEl) decodedEl.textContent = decoded;
        }
        lastByte = byteIdx;
      }
    }

    function draw() {
      if (!width || !height) return;
      extendTo(offset + width + 2);
      ctx.clearRect(0, 0, width, height);

      // grid
      ctx.strokeStyle = "rgba(148, 163, 180, 0.12)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (var gxLine = Math.ceil(offset / (BIT_W * 2)) * BIT_W * 2; gxLine < offset + width; gxLine += BIT_W * 2) {
        var sx = Math.round(gxLine - offset) + 0.5;
        ctx.moveTo(sx, 0); ctx.lineTo(sx, height - 14);
      }
      for (var r = 1; r < 4; r++) {
        var sy = Math.round(r * (height - 14) / 4) + 0.5;
        ctx.moveTo(0, sy); ctx.lineTo(width, sy);
      }
      ctx.stroke();

      // bit labels
      ctx.font = "10px 'JetBrains Mono', monospace";
      ctx.textAlign = "center";
      ctx.fillStyle = "rgba(219, 227, 236, 0.35)";
      var firstBit = Math.floor(offset / BIT_W);
      for (var bi = firstBit; bi * BIT_W < offset + width; bi++) {
        var cx = bi * BIT_W + BIT_W / 2 - offset;
        ctx.fillText(String(bitAt(bi * BIT_W)), cx, height - 3);
      }

      // trace
      ctx.strokeStyle = "#2dd4bf";
      ctx.lineWidth = 1.75;
      ctx.shadowColor = "rgba(45, 212, 191, 0.55)";
      ctx.shadowBlur = 6;
      ctx.beginPath();
      for (var x = 0; x <= width; x += 2) {
        var y = yFor(sampleAt(offset + x));
        if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      // sampling cursor
      var cxCursor = Math.round(width * CURSOR) + 0.5;
      var fNow = sampleAt(offset + width * CURSOR);
      ctx.strokeStyle = "rgba(251, 191, 36, 0.6)";
      ctx.setLineDash([3, 3]);
      ctx.beginPath(); ctx.moveTo(cxCursor, 0); ctx.lineTo(cxCursor, height - 14); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = "#fbbf24";
      ctx.beginPath(); ctx.arc(cxCursor, yFor(fNow), 3, 0, Math.PI * 2); ctx.fill();

      if (readout) readout.textContent = fNow.toFixed(2) + " GHz";
    }

    function frame(t) {
      if (!running) return;
      var dt = lastTime ? Math.min(0.05, (t - lastTime) / 1000) : 0;
      lastTime = t;
      offset += SPEED * dt;
      updateDecoded(offset + width * CURSOR);
      draw();
      requestAnimationFrame(frame);
    }

    function start() {
      if (running || reduceMotion || !visible || document.hidden) return;
      running = true; lastTime = 0;
      requestAnimationFrame(frame);
    }

    function stop() { running = false; }

    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", function () { document.hidden ? stop() : start(); });
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        visible = entries[0].isIntersecting;
        visible ? start() : stop();
      }).observe(canvas);
    }

    resize();
    if (reduceMotion) {
      if (decodedEl) decodedEl.textContent = MESSAGE.trim();
    } else {
      start();
    }
  }

  /* ------------------------------------------------------------------------
     Publication filters by research area
     ------------------------------------------------------------------------ */
  function initFilters(buttons) {
    var pubs = document.querySelectorAll(".pub");
    var groups = document.querySelectorAll(".pub-group, .pub-earlier");
    var empty = document.querySelector(".pub-empty");

    function apply(topic) {
      buttons.forEach(function (btn) {
        var on = btn.getAttribute("data-filter") === topic;
        btn.classList.toggle("is-active", on);
        btn.setAttribute("aria-pressed", on ? "true" : "false");
      });
      var shown = 0;
      pubs.forEach(function (pub) {
        var topics = (pub.getAttribute("data-topics") || "").split(" ");
        var match = topic === "all" || topics.indexOf(topic) !== -1;
        pub.hidden = !match;
        if (match) shown++;
      });
      groups.forEach(function (group) {
        group.hidden = !group.querySelector(".pub:not([hidden])");
      });
      if (empty) empty.hidden = shown > 0;
    }

    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var topic = btn.getAttribute("data-filter");
        apply(topic);
        history.replaceState(null, "", topic === "all" ? location.pathname : "#topic-" + topic);
      });
    });

    var match = location.hash.match(/^#topic-([\w-]+)$/);
    if (match && document.querySelector('.pub-filter[data-filter="' + match[1] + '"]')) apply(match[1]);
  }

  /* ------------------------------------------------------------------------
     Copy citation to clipboard
     ------------------------------------------------------------------------ */
  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text);
    return new Promise(function (resolve, reject) {
      var ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "absolute";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      var ok = document.execCommand("copy");
      document.body.removeChild(ta);
      ok ? resolve() : reject();
    });
  }

  function initCite() {
    document.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-cite]");
      if (!btn) return;
      var label = btn.querySelector("span");
      copyText(btn.getAttribute("data-cite")).then(function () {
        if (!label) return;
        label.textContent = "Copied";
        btn.classList.add("is-copied");
        setTimeout(function () { label.textContent = "Cite"; btn.classList.remove("is-copied"); }, 1600);
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    var canvas = document.querySelector("[data-scope]");
    if (canvas) initScope(canvas);
    var filters = document.querySelectorAll(".pub-filter");
    if (filters.length) initFilters(Array.prototype.slice.call(filters));
    initCite();
  });
})();
