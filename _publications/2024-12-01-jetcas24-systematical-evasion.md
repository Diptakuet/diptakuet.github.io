---
title: "Systematical Evasion From Learning-Based Microarchitectural Attack Detection Tools"
collection: publications
category: manuscripts
venue_short: "IEEE JETCAS"
topics: [ml]
selected: true
permalink: /publication/2024-12-01-jetcas24-systematical-evasion
excerpt: 'We build a fuzzing framework that manipulates hardware performance counter values in a controlled way and use it to modify attack code so that it evades learning-based microarchitectural attack detectors.'
date: 2024-12-01
venue: 'IEEE Journal on Emerging and Selected Topics in Circuits and Systems (IEEE JETCAS)'
paperurl: 'https://ieeexplore.ieee.org/document/10742379'
citation: 'D. R. Dipta, J. Tan and B. Gulmezoglu, &quot;Systematical Evasion From Learning-Based Microarchitectural Attack Detection Tools,&quot; <i>IEEE Journal on Emerging and Selected Topics in Circuits and Systems (IEEE JETCAS)</i>, vol. 14, no. 4, pp. 823-833, Dec. 2024.'
---

Because hardware vulnerabilities often cannot be patched quickly, machine learning-based detectors that monitor hardware performance counters at runtime have been proposed to catch microarchitectural attacks as they execute. This paper examines how robust those detectors really are. We build a fuzzing framework, composed of separate fuzzing blocks, that changes hardware performance counter values in a controlled way, and use it to modify attack source code so that it evades detection. The framework is evaluated in terms of time overhead, achieved leakage rate, and the number of trials needed to evade the detectors.
