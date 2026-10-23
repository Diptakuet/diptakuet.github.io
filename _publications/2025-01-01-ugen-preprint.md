---
title: "uGen: An Agentic Framework for Generating Microarchitectural Attack PoCs"
collection: publications
category: preprints
status: 'arXiv Preprint'
topics: [llm]
permalink: /publication/2025-01-01-ugen-preprint
excerpt: 'We find that LLMs frequently misplace or misuse critical attack primitives when writing microarchitectural attack code, and present uGen, a retrieval-augmented, multi-agent framework that supplies the missing domain knowledge to generate working proof-of-concepts.'
date: 2026-05-15
venue: 'arXiv preprint arXiv:2605.15503'
citation: 'D. R. Dipta, T. Tiemann, E. Marin, T. Eisenbarth and B. Gulmezoglu, &quot;uGen: An Agentic Framework for Generating Microarchitectural Attack PoCs,&quot; <i>arXiv preprint arXiv:2605.15503</i>, 2026.'
paperurl: 'https://arxiv.org/abs/2605.15503'
---

Microarchitectural attacks are notoriously hard to reproduce across environments, which makes systematic vulnerability assessment difficult. We first study whether state-of-the-art commercial and open-weight large language models can write functionally correct attack code, and find that they often get critical attack primitives wrong or place them incorrectly. We then present uGen, a retrieval-augmented, multi-agent framework that supplies the missing domain knowledge. Evaluated on cache-based and speculative-execution attacks, uGen reaches up to 100% success for Spectre-v1 and 80% for Prime+Probe, and generates a working proof-of-concept for about $1.25 in under four minutes.
