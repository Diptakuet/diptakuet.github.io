---
title: "DefWeb: Defending User Privacy against Cache-based Website Fingerprinting Attacks with Intelligent Noise Injection"
collection: publications
category: conferences
venue_short: "ACSAC '23"
topics: [ml]
permalink: /publication/2023-12-01-acsac23-defweb
excerpt: 'DefWeb is a generative-learning defense against cache-based website fingerprinting that injects minimal, targeted noise during page rendering through self-modifying code, cutting attacker accuracy to 28.8% on real systems with 9.5% overhead.'
date: 2023-12-01
venue: 'Proceedings of the 39th Annual Computer Security Applications Conference (ACSAC &apos;23)'
paperurl: 'https://dl.acm.org/doi/10.1145/3627106.3627191'
citation: 'S. Son, D. R. Dipta and B. Gulmezoglu, &quot;DefWeb: Defending User Privacy against Cache-based Website Fingerprinting Attacks with Intelligent Noise Injection,&quot; <i>Proceedings of the 39th Annual Computer Security Applications Conference (ACSAC &apos;23)</i>, Association for Computing Machinery, New York, NY, USA, 379–393, 2023.'
---

Cache-based website fingerprinting attacks combine the shared last-level cache with machine and deep learning to identify the websites a user visits, even in incognito and anonymized browsers. Prior defenses inject random noise during page rendering, which either costs significant performance or fails once the attacker retrains on noisy data. DefWeb maps high-dimensional fingerprints into a low-dimensional space where each website forms a distinct cluster, extracts minimal noise templates there, and applies them during rendering using self-modifying code. Evaluated in simulation and on real systems with Firefox, Chrome, and Tor, DefWeb reduces attacker accuracy to 1.1% in simulation and 28.8% in the real world, with 9.5% performance overhead.
