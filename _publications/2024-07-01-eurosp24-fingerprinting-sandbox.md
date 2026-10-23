---
title: "Dynamic Frequency-Based Fingerprinting Attacks against Modern Sandbox Environments"
collection: publications
category: conferences
venue_short: "EuroS&amp;P '24"
topics: [frequency, cloud]
selected: true
permalink: /publication/2024-07-01-eurosp24-fingerprinting-sandbox
excerpt: 'We show that CPU frequency reporting sensors on Intel and AMD processors, readable from user space, let an attacker fingerprint Docker containers and workloads inside sandboxes such as gVisor, AWS Firecracker, Gramine-SGX, and AMD SEV.'
date: 2024-07-01
venue: '2024 IEEE 9th European Symposium on Security and Privacy (EuroS&amp;P)'
paperurl: 'https://ieeexplore.ieee.org/document/10629032'
citation: 'D. R. Dipta, T. Tiemann, B. Gulmezoglu, E. Marin and T. Eisenbarth, &quot;Dynamic Frequency-Based Fingerprinting Attacks against Modern Sandbox Environments,&quot; <i>2024 IEEE 9th European Symposium on Security and Privacy (EuroS&amp;P)</i>, pp. 327-344, Vienna, Austria, 2024.'
arxivurl: 'https://arxiv.org/abs/2404.10715'
---

Container and sandbox technologies promise isolation between co-located workloads. This paper shows that the CPU frequency reporting sensors on Intel and AMD processors, which user-space attackers can read, break that promise. Docker images exhibit a unique frequency signature, allowing containers to be distinguished with up to 84.5% accuracy even when several run simultaneously on different cores. The attack also succeeds against Google's gVisor, AWS Firecracker, Gramine running on Intel SGX, and AMD SEV, reaching over 70% accuracy in under 40 seconds in every case. We propose a noise-injection countermeasure to mitigate the attack in cloud environments.
