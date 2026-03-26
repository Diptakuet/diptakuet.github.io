---
title: "Exploiting and Mitigating Information Leakage at the Container-Kernel Interface"
collection: publications
category: preprints
permalink: /publication/2025-01-03-container-kernel-preprint
excerpt: 'We systematically study information leakage channels that arise at the interface between containerized applications and the Linux kernel, demonstrating practical co-residence detection and cross-container side-channel attacks in serverless deployments.'
date: 2025-01-03
venue: 'Under Review'
citation: 'D. R. Dipta, E. Marin, B. Gulmezoglu and T. Eisenbarth, &quot;Exploiting and Mitigating Information Leakage at the Container-Kernel Interface.&quot; Under review.'
---

Containers rely on the Linux kernel for resource management, scheduling, and I/O, creating a rich set of shared state that can be exploited as a side channel. In this paper, we systematically map the information leakage surface at the container-kernel interface, identify novel leakage vectors that persist even in hardened container configurations, and demonstrate practical attacks including co-residence detection and workload fingerprinting in serverless cloud environments. We also propose and evaluate kernel-level and runtime mitigations to reduce the leakage surface without breaking container semantics.
