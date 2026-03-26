---
title: "Dynamic Frequency-Based Fingerprinting Attacks against Modern Sandbox Environments"
collection: publications
category: conferences
permalink: /publication/2024-07-01-eurosp24-fingerprinting-sandbox
excerpt: 'We demonstrate that CPU dynamic frequency scaling can be exploited to fingerprint and identify web content executing inside modern sandbox environments such as V8 and Cloudflare Workers, bypassing isolation guarantees.'
date: 2024-07-01
venue: '2024 IEEE 9th European Symposium on Security and Privacy (EuroS&amp;P)'
paperurl: 'https://ieeexplore.ieee.org/document/10629032'
citation: 'D. R. Dipta, T. Tiemann, B. Gulmezoglu, E. Marin and T. Eisenbarth, &quot;Dynamic Frequency-Based Fingerprinting Attacks against Modern Sandbox Environments,&quot; <i>2024 IEEE 9th European Symposium on Security and Privacy (EuroS&amp;P)</i>, pp. 327-344, Vienna, Austria, 2024.'
---

This paper extends the dynamic frequency side-channel attack (DF-SCA) paradigm to fingerprint executing code within modern sandbox environments. By monitoring CPU frequency fluctuations from an unprivileged context, we demonstrate that an adversary can reliably identify JavaScript workloads running inside V8-based and Cloudflare Workers sandboxes, which are widely used in serverless cloud deployments. Our results expose a fundamental tension between performance-oriented hardware features and the isolation guarantees promised by modern sandboxing frameworks.
