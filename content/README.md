# 99aupairs — SEO & AI-Overview Authority: Execution Blueprint

Companion to the interactive scorecard (`/seo-ai-authority-scorecard.html`). This folder
holds **publish-ready content converted from existing Drive assets**, plus the full 90-day
execution reference below.

> **On `[VERIFY]` tags.** These pages were built as a fallback when live Drive reads weren't
> available in-session. Every `[VERIFY]` marks a 99aupairs-specific figure (pricing, hours,
> proprietary stats, testimonials) to confirm against the source Drive docs before publishing.
> No statistics were invented — general au-pair/visa/CCS facts are public knowledge; anything
> proprietary is flagged, not guessed.

## What's in this folder (the quick wins)

| File | Source asset on Drive | Publish as |
|---|---|---|
| `pillar/au-pair-in-australia.md` | 4× "Complete 2026 Guide" drafts (v4 FINAL) | Flagship pillar page |
| `compare/au-pair-vs-nanny.md` | Research Pack | Comparison page |
| `compare/au-pair-vs-daycare.md` | Research Pack | Comparison page |
| `compare/au-pair-vs-agency-diy.md` | Research Pack | Comparison page |
| `local/au-pair-melbourne.md` | Irene's Melbourne voice-memo script | Local page (template for other cities) |
| `faq/au-pair-australia-faq.md` | Guide FAQ + CCS sources doc | Answer-first FAQ hub |

---

## Internal-linking architecture (topic cluster)

```
                         [ Au Pair in Australia ]  <- PILLAR (/au-pair-australia)
                                    |
      ---------------------------------------------------------------
      |            |             |            |           |          |
   Costs/      Comparisons     Local        Visa/       Reviews    FAQ hub
  Calculator   (vs nanny,     (Melbourne,   Rules      + author   (/au-pair-faq)
 (/childcare-  vs daycare,    Sydney, ...)  section    (E-E-A-T)
  calculator)  vs DIY)
```

**Rules:** every cluster page links **up** to the pillar and the pillar links **down** to
each cluster page. Comparison and local pages cross-link to the Calculator. The FAQ hub links
to the relevant deep page under each answer. Irene's author page is linked from every byline.

---

## The 100-title content calendar (90 days)

### A. Pillar & knowledge hub (10)
1. Au Pair in Australia — The Complete 2026 Guide *(have — v4 draft)*
2. What Is an Au Pair? Meaning, Duties & How It Works
3. Au Pair Rules in Australia (2026)
4. Hosting Your First Au Pair: A Step-by-Step Guide
5. Au Pair Requirements for Host Families
6. Au Pair Matching: How Families and Au Pairs Are Paired
7. Au Pair Safety & Screening Explained
8. The Au Pair Family Agreement (with checklist)
9. Cultural Exchange: What It Really Means for Your Family
10. Au Pair Glossary: Every Term Explained

### B. Cost & money (10)
11. How Much Does an Au Pair Cost in Australia? *(feeds pillar)*
12. Au Pair Pocket Money Guide (2026)
13. Au Pair vs Daycare: Cost After Subsidy *(have — Research Pack)*
14. Au Pair Tax & Payment: What Host Families Need to Know
15. Au Pair Insurance & Cover
16. Childcare Subsidy (CCS) Explained for Parents
17. The True Cost of Childcare in Australia (2026)
18. Hidden Costs of Daycare vs Au Pair
19. Au Pair on a Budget: Making It Work
20. Childcare Calculator: How to Use It *(tool page)*

### C. Comparisons (10)
21. Au Pair vs Nanny *(have)*
22. Au Pair vs Daycare *(have)*
23. Au Pair vs Babysitter
24. Au Pair vs Live-in Nanny
25. Au Pair vs Family Day Care
26. Au Pair vs Before/After School Care
27. Agency vs Facebook (DIY) *(have)*
28. Agency vs DIY: Safety Compared
29. Au Pair vs Grandparent Care
30. Nanny Share vs Au Pair

### D. Visa & legal (8)
31. Au Pair Visa Australia: The Real Rules
32. Working Holiday Visa (417) for Au Pairs
33. Work and Holiday Visa (462) for Au Pairs
34. How Long Can an Au Pair Stay?
35. Au Pair Police & Background Checks
36. First Aid & Working with Children Checks
37. Au Pair Rights & Responsibilities
38. CAPAA & Industry Standards

### E. Local / city & regional (14)
39–52. Au Pairs in: Melbourne *(have)*, Sydney, Brisbane, Perth, Adelaide, Canberra,
Gold Coast, Hobart, Darwin, Newcastle, Geelong, Regional VIC, Regional NSW, Regional QLD.

### F. Audience / situation pages (12)
53. Au Pairs for FIFO Families
54. Au Pairs for Shift Workers
55. Au Pairs for Doctors & Nurses
56. Au Pairs for ADHD Families
57. Au Pairs for Twins & Multiples
58. Au Pairs for Single Parents
59. Au Pairs for Executive Parents
60. Au Pairs for Return-to-Work Parents
61. Au Pairs for School-Holiday Cover
62. Au Pairs for Newborns & Toddlers
63. Au Pairs for Regional & Rural Families
64. Au Pairs for Emergency / Short-Notice Care

### G. Interview, red flags & how-to (10)
65. Best Questions to Ask an Au Pair
66. Au Pair Interview Guide (with MAIA)
67. Red Flags When Choosing an Au Pair
68. How to Choose an Au Pair Agency
69. Au Pair References: What to Check
70. First Week With Your Au Pair
71. Setting House Rules & Boundaries
72. Handling Problems in a Placement
73. Re-matching: What Happens If It Doesn't Work
74. Saying Goodbye: End of Placement

### H. Original research & data (6)
75. The State of Au Pairing in Australia 2026 *(flagship report)*
76. Australia's Childcare Cost Report
77. Working Parent Index
78. FIFO Family Childcare Report
79. Return-to-Work Report
80. Regional Childcare Shortage Report

### I. Topical expansion — modern family care (10)
81. Flexible Childcare Options in Australia
82. Returning to Work After Parental Leave
83. Childcare for School Holidays
84. Balancing Two Careers & Kids
85. Family Wellbeing & the Mental Load
86. Childcare Options Compared (the master hub)
87. Emergency Childcare in Australia
88. Childcare for Medical & Emergency-Service Families
89. The Childcare Decision: A Parent's Framework
90. Childcare Subsidy Changes 2026

### J. Tools, video & authority (10)
91. Pocket Money Calculator *(tool)*
92. Au Pair vs Nanny Cost Calculator *(tool)*
93. Family Match Quiz *(tool)*
94. Hosting Readiness Quiz *(tool)*
95. Irene Becker — Author & Expert page *(E-E-A-T)*
96. 99aupairs Reviews & Testimonials *(review schema)*
97. MAIA — Our Video Interview Technology
98. Donna — 24/7 Enquiry Support
99. Press & Media (Mamamia, national coverage)
100. Awards & Recognition (Glen Eira, Ausmumpreneur)

*Legend: "(have)" = draft/asset already on Drive → publish first.*

---

## Schema checklist (day-one requirement, every page)

| Page type | Required JSON-LD |
|---|---|
| Every page | `Organization`, `BreadcrumbList` |
| Pillar & guides | `Article` + `FAQPage` |
| Comparison / FAQ | `FAQPage` |
| How-to pages | `HowTo` |
| Local/city pages | `LocalBusiness` (areaServed) |
| Tools/calculators | `SoftwareApplication` |
| Reviews page | `Review` + `AggregateRating` |
| Author page | `Person` with `sameAs` (LinkedIn, Mamamia, CAPAA) |
| Videos | `VideoObject` |

---

## Backlink & digital-PR targets

**Earn-links engine:** the *State of Au Pairing in Australia 2026* report is the primary hook.
Pitch each stat to a matched audience.

- **Universities / research** — early-childhood, women's-workforce, social-policy departments.
- **Parenting media** — Mamamia (existing relationship), Kidspot, Babyology, The Parenthood.
- **Women's & workforce orgs** — return-to-work programs, women-in-business chambers.
- **Employer / HR / EAP** — corporate HR, employee-assistance providers, FIFO employers.
- **Health & NDIS** — allied-health, medical-workforce, disability-family networks.
- **Government & community** — council family services, regional childcare bodies.

**Off-site reputation (AI validation):** Trustpilot, ProductReview, Facebook, Bing Places,
Apple Maps, CAPAA/IAPA listings, Reddit (genuine helpful answers).

---

## KPI tracker (90 days — recommended targets)

| KPI | Baseline | 30 days | 60 days | 90 days |
|---|---|---|---|---|
| Authority pages live | `[VERIFY]` | 10 | 16 | 20 |
| Pages with full schema | ~0 | 10 | 16 | 20 |
| Flagship data report | 0 | drafted | published | pitched |
| Interactive tools | 1 | 1 | 3 | 3 |
| Flagship videos | 0 | 2 | 6 | 12 |
| New referring domains | `[VERIFY]` | +5 | +20 | +40 |
| Off-Google review profiles | `[VERIFY]` | 2 | 4 | 5 |
| AI-Overview inclusions (core queries) | `[VERIFY]` | track | 2–3 | 6 |
| Blended authority score | 33 | 48 | 62 | 74 |

**Core queries to track for AI-Overview inclusion:** "au pair Australia", "au pair cost",
"au pair vs nanny", "au pair vs daycare", "best au pair agency Australia", "au pair Melbourne".

---

## Sequencing (why this order)

1. **Convert (Days 1–30):** publish the drafts in this folder — fastest score gain because the
   content already exists; only schema + answer-first formatting is new work.
2. **Expand (Days 31–60):** build the moat — the data report, more cluster pages, 2 new tools,
   the topical-expansion cluster.
3. **Amplify (Days 61–90):** earn citations — YouTube from existing clips, digital PR on the
   report, Reddit, off-site reviews, backlink outreach.

Re-score monthly against the scorecard rubric to true up the numbers with live analytics.
