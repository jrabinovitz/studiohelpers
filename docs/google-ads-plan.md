# Drafting Helpers: Google Ads Search Plan (v1)

> **Status:** Plan only. Nothing has been created, changed, enabled or paused in any Google Ads account.
> **Keyword data pulled:** 2026-10-06, US, English, Google Search network.
> **Sources:**
> - **KP** = Google Ads Keyword Planner via API (`GenerateKeywordIdeas`, manager account 605-709-2164). It gives avg. monthly searches for Sep 2025 to Aug 2026, plus the **top-of-page bid range (low to high)**. This account has no spend history, so volumes come back in Google's buckets (10/20/30/50/70/90/110/...).
> - **AH** = Ahrefs Keywords Explorer (US). It gives monthly volume and average CPC, converted from cents to USD.
> - The two sources often disagree on low-volume B2B terms. **For bidding, rely on the KP bid range**, since that is the auction Google actually runs. Use AH as a second opinion on volume.

---

## 1. Goal & conversion setup

| Item | Setting |
|---|---|
| Business goal | Qualified discovery requests from **US architecture firms**, mainly for **CAD/Revit drafters** |
| Primary conversion | Form submit, which redirects to `https://draftinghelpers.com/thanks/` and fires GA4 event `generate_lead` |
| How it gets into Ads | GA4 marks `generate_lead` as a **Key event**. Link GA4 to Google Ads, then **import** the key event as conversion action **"Lead - Form Submit"** |
| Conversion action settings | Category: *Submit lead form*. **Primary** (used for bidding). Count: **One**. Click-through window: **90 days** (B2B sales cycle). Engaged-view: n/a. View-through: 1 day. Value: static **$100** placeholder (lets you read ROAS later; adjust once close rates are known) |
| Recommended extra | Add a **Google Ads native tag** on `/thanks/` via GTM with **Enhanced Conversions** (hashed email from the form). It gives better attribution than the GA4 import alone. If you add it, keep **only one of the two as Primary** so leads aren't double-counted |
| Guardrail | `/thanks/` must only be reachable after a submit. Add `noindex`, and either ignore the event on page reloads or rely on Count = One |
| Offline (month 2+) | Upload "qualified call booked" / "client signed" with the GCLID stored in a hidden form field. This lets bidding optimize for real deals, not form spam |
| Auto-tagging | **ON**. Store `gclid` plus UTMs in hidden form fields |

**Benchmarks to judge against (assumptions, not promises):** B2B service search CVR is around 3-6%. Target CPL is **≤ $250** at launch. One full-time drafter placement is $2,450/mo recurring, so a CPL of $250-500 is still very profitable if 1 in 5-10 leads closes.

---

## 2. Budget

**Recommendation: $40/day (~$1,215/mo).** Scale to $60-80/day only after CPL is proven.

| Data point (KP, drafter/BIM core terms) | Value |
|---|---|
| Top-of-page bid, low end | $3.40 to $9.00 (e.g. *architectural drafting services* $3.76, *cad drafting services* $4.32, *outsource cad drafting services* $8.69, *bim modeling services* $8.97) |
| Top-of-page bid, high end | $15 to $50 |
| AH average CPC on the same terms | $3 to $10 (Revit drafting services $20) |
| **Planning CPC** | **~$7** (blended) |

| Daily budget | Clicks/day @ $7 | Clicks/mo | Leads/mo @ 3-5% CVR | Est. CPL |
|---|---|---|---|---|
| $30 | ~4 | ~130 | 4-6 | $150-230 |
| **$40 (recommended)** | **~6** | **~175** | **5-9** | **$140-240** |
| $50 | ~7 | ~215 | 6-11 | $140-230 |

Why $40/day:
- At ~$7 CPC it buys ~170 clicks/mo. That is enough data to judge keywords and landing pages within 30 days.
- The core drafter niche is small: ~2,000-3,000 relevant US searches/mo in total. More budget than this would just push Google into broader, junkier matching.
- Split in practice: about 70% of spend should land in drafting/BIM (AG1 + AG2). Steer with the per-keyword bid caps in section 6 and by keeping AG5 paused at launch.

---

## 3. Campaign structure

| Setting | Value |
|---|---|
| Campaign | `SH - Search - Architecture Staffing - US` |
| Type | Search only. **Uncheck Search Partners and Display Network** |
| Ad groups | AG1 to AG4 **enabled** at launch. AG5 **paused** (phase 2, week 3+) |
| Match types | Phrase + Exact only. **No broad match** until 30+ conversions |
| Ad rotation | Optimize (default) |
| Auto-apply recommendations | **OFF** (account-level) |

| Ad group | Theme | Landing page | Launch | Priority |
|---|---|---|---|---|
| **AG1** CAD / Architectural Drafting | outsource drafting, CAD drafting services, CAD drafters | `/roles/cad-drafter/` | On | #1 |
| **AG2** Revit / BIM Modeling | Revit drafting, BIM modeling services, BIM modeler | `/roles/bim-modeler/` | On | #2 |
| **AG3** 3D Visualization / Rendering | architectural rendering/visualization services | `/roles/3d-visualization-artist/` | On (exact-heavy, capped bids) | #3 |
| **AG4** Architecture Outsourcing & Staffing | architecture outsourcing, staffing for architects, VA for architects | `/` (home) | On | #2 |
| **AG5** Construction Admin (phase 2) | construction virtual assistant, CA support | `/roles/construction-admin-support/` | **Paused** | #4 |

Not given their own ad group at launch: Architectural Designer, Permit Coordinator, Marketing Coordinator and Admin Assistant.
- Search demand for staffing-intent versions of these roles is near zero ("hire remote architectural designer" and "permit expediting virtual assistant" both return no volume).
- Generic "virtual assistant Philippines" terms cost $12-107 top-of-page and aren't architecture-specific.
- These roles still get traffic through **sitelinks** and the home-page ad group.

### Important intent warning: homeowners
Searches like "architectural drafting services" and "cad drafting services" include **homeowners who want one set of house plans**. Three defenses:
1. Price in the ads ("Full-Time Drafter $2,450/mo") filters out one-off buyers.
2. "Built for Architecture Firms" is pinned to headline position 2 in every RSA.
3. The negative list covers house plans, deck, ADU, remodel and similar terms (section 5).

---

## 4. Ad groups: keywords, landing pages, RSAs

Keyword notation: `"phrase"`, `[exact]`. KP bid = top-of-page low to high. "n/a" = Google returned no bid estimate (low data). AH = Ahrefs volume / CPC.

### AG1: CAD / Architectural Drafting → `https://draftinghelpers.com/roles/cad-drafter/`

| Keyword | Match | KP vol/mo | KP bid (low-high) | AH vol / CPC |
|---|---|---|---|---|
| cad drafting services | "phrase" | 590 | $4.32-$20.46 | 900 / $3.00 |
| architectural drafting services | "phrase" | 480 | $3.76-$18.54 | 800 / $3.00 |
| architectural drafting firms | [exact] | 210 | n/a | 100 / n/a |
| outsource cad drafting services | "phrase" | 110 | $8.69-$40.68 | 350 / $4.00 |
| cad drawing services | [exact] | 110 | $6.15-$35.98 | 200 / $5.00 |
| autocad drafting services | "phrase" | 90 | $5.99-$14.87 | 100 / $4.50 |
| architectural drawings services | [exact] | 90 | $7.97-$39.43 | 80 / $4.50 |
| cad outsourcing services | "phrase" | 70 | $8.63-$26.04 | 200 / $4.50 |
| architectural cad drafting services | "phrase" | 70 | n/a | 200 / $6.00 |
| cad drafting companies | "phrase" | 70 | $3.43-$24.28 | 150 / $2.00 |
| cadd drafting services | [exact] | 70 | $5.86-$26.75 | 40 / $3.00 |
| outsource cad | "phrase" | 50 | $6.50-$37.10 | 10 / $6.00 |
| architectural cad drafter | [exact] | 50 | $3.66-$14.78 | 20 / $1.60 |
| outsource drafting services | "phrase" | 40 | n/a | n/a |
| outsourcing cad drawings | "phrase" | 30 | $14.64-$34.29 | 100 / $8.00 |
| architectural drafting companies | "phrase" | 30 | $3.51-$6.26 | n/a |
| outsource architectural drafting | "phrase" | 20 | n/a | n/a |
| architectural drafting services outsourcing | "phrase" | 10 | $7.33-$15.75 | 40 / n/a |
| hire cad drafter | "phrase" | 10 | n/a | n/a |

Skipped on purpose:
- *remote cad drafter* (50/mo). Its bid is only $0.11-$2.39, a sign that ~all searchers are job seekers. Revisit later as [exact] if search terms prove otherwise.
- Every "near me" variant.
- *drafting* and *cad drafting* (too broad).

**RSA (AG1).** Pin H12 "Built for Architecture Firms" to position 2. Final URL `/roles/cad-drafter/`, display path `/CAD-Drafters/Remote`.

| # | Headline (≤30) | Chars |
|---|---|---|
| H1 | Remote CAD Drafters for Firms | 29 |
| H2 | Hire a Dedicated CAD Drafter | 28 |
| H3 | Architectural Drafting Staff | 28 |
| H4 | AutoCAD & Revit Drafters | 24 |
| H5 | Up to 70% Less Than a US Hire | 29 |
| H6 | Placed in 1-2 Weeks | 19 |
| H7 | Full-Time Drafter $2,450/mo | 27 |
| H8 | Part-Time Drafter $1,500/mo | 27 |
| H9 | Fully Managed Remote Staff | 26 |
| H10 | Free Replacement Guarantee | 26 |
| H11 | No Long-Term Contracts | 22 |
| H12 | Built for Architecture Firms | 28 |
| H13 | Outsource Your CAD Drafting | 27 |
| H14 | Drafters From PH & LATAM | 24 |
| H15 | Request a Drafter Today | 23 |

| # | Description (≤90) | Chars |
|---|---|---|
| D1 | Dedicated remote CAD drafters for US architecture firms, placed in just 1-2 weeks. | 82 |
| D2 | Full-time drafter $2,450/mo or part-time $1,500/mo. Up to 70% less than a US hire. | 82 |
| D3 | Fully managed: we recruit, vet and support your drafter. Free replacement guarantee. | 84 |
| D4 | No long-term contracts. AutoCAD & Revit talent from the Philippines and LATAM. | 78 |

### AG2: Revit / BIM Modeling → `https://draftinghelpers.com/roles/bim-modeler/`

| Keyword | Match | KP vol/mo | KP bid (low-high) | AH vol / CPC |
|---|---|---|---|---|
| bim services | "phrase" | 590 | $9.41-$28.49 | 900 / $10.00 |
| bim modeling services | "phrase" | 390 | $8.97-$52.49 | 800 / $8.00 |
| scan to bim services | "phrase" | 260 | $7.65-$27.80 | 500 / $8.00 |
| bim modeler | [exact] | 260 | $3.00-$15.92 | 200 / $0.90 |
| revit drafter | [exact] | 170 | $1.43-$15.48 | 50 / $0.60 |
| revit drafting | [exact] | 170 | $1.43-$15.48 | n/a |
| bim companies | "phrase" | 170 | $3.69-$12.33 | n/a |
| revit modeling services | "phrase" | 70 | $5.78-$18.51 | 400 / $0.60 |
| revit drafting services | "phrase" | 50 | $12.31-$33.84 | 200 / $20.00 |
| bim service providers | "phrase" | 50 | $12.00-$73.79 | 200 / $7.00 |
| bim modeling company | "phrase" | 40 | $13.95-$54.55 | n/a |
| revit outsourcing | "phrase" | 20 | $15.06-$48.31 | 150 / $8.00 |
| bim outsourcing companies | "phrase" | 20 | n/a | n/a |
| bim drafting services | "phrase" | 20 | n/a | n/a |

Watch list: *bim modeler*, *revit drafter* and *revit drafting* have mixed intent (job seekers and students). They are exact match only. Pause any of them that spend more than $60 with no lead.

**RSA (AG2).** Pin H12 to position 2. Display path `/BIM-Modelers/Revit`.

| # | Headline (≤30) | Chars |
|---|---|---|
| H1 | Remote Revit & BIM Modelers | 27 |
| H2 | Hire a Dedicated BIM Modeler | 28 |
| H3 | Revit Staff for Architects | 26 |
| H4 | Outsource Revit Modeling | 24 |
| H5 | Up to 70% Less Than a US Hire | 29 |
| H6 | Placed in 1-2 Weeks | 19 |
| H7 | Full-Time Modeler $2,450/mo | 27 |
| H8 | Part-Time Modeler $1,500/mo | 27 |
| H9 | Fully Managed Remote Staff | 26 |
| H10 | Free Replacement Guarantee | 26 |
| H11 | No Long-Term Contracts | 22 |
| H12 | Built for Architecture Firms | 28 |
| H13 | Add BIM Capacity Fast | 21 |
| H14 | Revit Talent From PH & LATAM | 28 |
| H15 | Request a BIM Modeler Today | 27 |

| # | Description (≤90) | Chars |
|---|---|---|
| D1 | Dedicated remote Revit/BIM modelers for US architecture firms, placed in 1-2 weeks. | 83 |
| D2 | Full-time modeler $2,450/mo or part-time $1,500/mo. Up to 70% less than a US hire. | 82 |
| D3 | Fully managed staffing with a free replacement guarantee. No long-term contracts. | 81 |
| D4 | A dedicated modeler who works only on your projects, inside your team's workflow. | 81 |

### AG3: 3D Visualization / Rendering → `https://draftinghelpers.com/roles/3d-visualization-artist/`

| Keyword | Match | KP vol/mo | KP bid (low-high) | AH vol / CPC |
|---|---|---|---|---|
| 3d rendering services | [exact] | 1,300 | $15.00-$63.55 | 1,800 / $8.00 |
| architectural rendering services | "phrase" | 590 | $7.89-$48.23 | 800 / $0.40 |
| architectural visualization services | "phrase" | 590 | $7.89-$48.23 | 500 / $0.30 |
| 3d architectural rendering services | "phrase" | 480 | $6.80-$60.03 | 700 / $14.00 |
| architectural rendering companies | "phrase" | 320 | $6.80-$40.13 | n/a |
| architectural visualization company | "phrase" | 320 | $6.80-$40.13 | n/a |
| architectural visualization studio | [exact] | 260 | $4.73-$15.00 | n/a |
| 3d interior rendering services | [exact] | 260 | $7.64-$32.01 | n/a |
| 3d exterior rendering services | "phrase" | 210 | $8.11-$30.93 | n/a |
| 3d visualization services | [exact] | 170 | $11.80-$82.32 | 700 / $9.00 |
| outsource 3d rendering | "phrase" | 30 | n/a | 150 / $0.60 |
| 3d architectural rendering outsource | "phrase" | 30 | n/a | n/a |
| architectural rendering firms | "phrase" | 30 | n/a | n/a |
| outsource architectural visualization | "phrase" | 10 | n/a | n/a |
| outsource 3d visualization | "phrase" | 10 | n/a | n/a |

Rendering is the **most expensive** cluster: *3d rendering services* tops out at $64 and *3d rendering companies* at $119. Most of these searchers want per-project renders, not staff. Keep this group on **[exact] for the head term** with a **$10 keyword-level cap** (see section 6). It should be the first ad group cut if CPL runs high.

**RSA (AG3).** Pin H12 to position 2. Display path `/3D-Visualization/Artist`.

| # | Headline (≤30) | Chars |
|---|---|---|
| H1 | Remote 3D Visualization Artist | 30 |
| H2 | Architectural Rendering Staff | 29 |
| H3 | Hire a Dedicated 3D Artist | 26 |
| H4 | Your Own Rendering Artist | 25 |
| H5 | Up to 70% Less Than a US Hire | 29 |
| H6 | Placed in 1-2 Weeks | 19 |
| H7 | Full-Time Artist $2,450/mo | 26 |
| H8 | Part-Time Artist $1,500/mo | 26 |
| H9 | Fully Managed Remote Staff | 26 |
| H10 | Free Replacement Guarantee | 26 |
| H11 | No Long-Term Contracts | 22 |
| H12 | Built for Architecture Firms | 28 |
| H13 | Outsource 3D Rendering | 22 |
| H14 | Flat Monthly Pricing | 20 |
| H15 | Request a 3D Artist Today | 25 |

| # | Description (≤90) | Chars |
|---|---|---|
| D1 | A dedicated 3D visualization artist for your architecture firm, placed in 1-2 weeks. | 84 |
| D2 | Full-time artist $2,450/mo or part-time $1,500/mo. Up to 70% less than a US hire. | 81 |
| D3 | Fully managed remote staff with a free replacement guarantee. No long-term contracts. | 85 |
| D4 | Stop paying per render. Get a dedicated artist who works only on your projects. | 79 |

### AG4: Architecture Outsourcing & Staffing → `https://draftinghelpers.com/`

| Keyword | Match | KP vol/mo | KP bid (low-high) | AH vol / CPC |
|---|---|---|---|---|
| architectural staffing agency | "phrase" | 90 | $2.00-$14.65 | 40 / n/a |
| architecture placement agency | [exact] | 90 | $2.00-$14.65 | n/a |
| architecture recruiting firms | [exact] | 90 | $2.00-$14.65 | n/a |
| architecture outsourcing services | "phrase" | 50 | $12.93-$25.17 | 20 / $4.50 |
| architecture outsourcing | "phrase" | 30 | $10.58-$30.23 | n/a |
| architectural outsourcing | "phrase" | 20 | n/a | n/a |
| outsourcing in architecture | "phrase" | 20 | n/a | n/a |
| architectural outsourcing companies | "phrase" | 10 | n/a | n/a |
| architectural design outsourcing | "phrase" | 10 | n/a | n/a |
| outsourcing work for architects | "phrase" | 10 | n/a | n/a |
| virtual assistant for architects | "phrase" | 10 | n/a | n/a |
| architect virtual assistant | "phrase" | 10 | n/a | n/a |
| architecture firm staffing agency | "phrase" | <10 (no data) | n/a | n/a |
| hire remote architectural designer | "phrase" | <10 (no data) | n/a | n/a |

Note: *architecture recruiting firms*, *placement agency* and *staffing agency* share one Keyword Planner bucket (90/mo). Some of that demand comes from architects looking for jobs. The jobs/careers negatives below handle most of it; check search terms in week 1.

**RSA (AG4).** Pin H12 "Built for Architecture Firms" to position 2. Display path `/Architecture/Staffing`.

| # | Headline (≤30) | Chars |
|---|---|---|
| H1 | Remote Staff for Architects | 27 |
| H2 | Architecture Outsourcing | 24 |
| H3 | Drafters, BIM & Admin Staff | 27 |
| H4 | Staffing Agency for Architects | 30 |
| H5 | Up to 70% Less Than a US Hire | 29 |
| H6 | Placed in 1-2 Weeks | 19 |
| H7 | Drafters From $1,500/mo | 23 |
| H8 | Admin Support From $1,300/mo | 28 |
| H9 | Fully Managed Remote Staff | 26 |
| H10 | Free Replacement Guarantee | 26 |
| H11 | No Long-Term Contracts | 22 |
| H12 | Built for Architecture Firms | 28 |
| H13 | Hire a Remote Drafter | 21 |
| H14 | Talent From PH & LATAM | 22 |
| H15 | Get Matched in 1-2 Weeks | 24 |

| # | Description (≤90) | Chars |
|---|---|---|
| D1 | Remote drafters, BIM modelers, designers and admin staff for US architecture firms. | 83 |
| D2 | Drafters from $1,500/mo, admin from $1,300/mo. Up to 70% less than a US hire. | 77 |
| D3 | Fully managed staffing with a free replacement guarantee. No long-term contracts. | 81 |
| D4 | Tell us the role you need and we place a dedicated team member in 1-2 weeks. | 76 |

### AG5: Construction Admin Support (PAUSED at launch) → `https://draftinghelpers.com/roles/construction-admin-support/`

| Keyword | Match | KP vol/mo | KP bid (low-high) | AH vol / CPC |
|---|---|---|---|---|
| virtual construction assistant | "phrase" | 110 | $5.60-$28.42 | 60 / $1.80 |
| construction virtual assistant | "phrase" | 50 | $6.61-$38.59 | 150 / $7.00 |
| virtual assistant for construction company | "phrase" | 30 | $11.87-$40.66 | n/a |
| contractor virtual assistant | "phrase" | 30 | n/a | n/a |
| virtual assistant construction | [exact] | 20 | $12.14-$49.99 | n/a |
| virtual assistant construction industry | [exact] | 10 | n/a | n/a |
| permit expediting services *(test only)* | [exact] | 210 | $2.57-$11.23 | 250 / $3.00 |
| permit expediting virtual assistant | "phrase" | <10 (no data) | n/a | n/a |

Why AG5 is paused:
- Most "construction VA" searchers are **contractors**, not architecture firms.
- "Permit expediting services" searchers usually want a local expediter.
- Turn AG5 on in **week 3+** only if AG1 to AG4 are below the target CPL. Watch CPL separately.
- If permit terms convert, split them into their own ad group pointing at `/roles/permit-coordinator/`.

**RSA (AG5).** Pin H12 to position 2. Display path `/Construction/Admin`.

| # | Headline (≤30) | Chars |
|---|---|---|
| H1 | Construction Admin Support | 26 |
| H2 | Submittals & RFI Support | 24 |
| H3 | Hire a Remote Admin Assistant | 29 |
| H4 | Construction Virtual Assistant | 30 |
| H5 | Up to 70% Less Than a US Hire | 29 |
| H6 | Placed in 1-2 Weeks | 19 |
| H7 | Full-Time Admin $2,100/mo | 25 |
| H8 | Part-Time Admin $1,300/mo | 25 |
| H9 | Fully Managed Remote Staff | 26 |
| H10 | Free Replacement Guarantee | 26 |
| H11 | No Long-Term Contracts | 22 |
| H12 | Built for Architecture Firms | 28 |
| H13 | Permit Coordination Support | 27 |
| H14 | Admin Talent From PH & LATAM | 28 |
| H15 | Request an Assistant Today | 26 |

| # | Description (≤90) | Chars |
|---|---|---|
| D1 | Remote construction admin support for architecture firms: submittals, RFIs, logs. | 81 |
| D2 | Full-time $2,100/mo or part-time $1,300/mo. Up to 70% less than a US hire. | 74 |
| D3 | Fully managed staffing with a free replacement guarantee. No long-term contracts. | 81 |
| D4 | A dedicated assistant placed in 1-2 weeks, working only for your firm. | 70 |

---

## 5. Shared negative keyword list: `SH - Negatives - Core`

Apply at campaign level. All entries are **phrase match** unless they are in [brackets].

| Theme | Negatives |
|---|---|
| Jobs & careers | job, jobs, career, careers, hiring now, now hiring, vacancy, vacancies, opening, openings, position, apply, application, resume, cv, interview, salary, salaries, pay, hourly rate, wage, wages, income, earn, indeed, glassdoor, ziprecruiter, linkedin, monster, work from home, remote jobs, part time jobs, entry level, internship, intern, apprentice, apprenticeship, job description, description |
| Education | course, courses, class, classes, training, tutorial, tutorials, certification, certificate, certified, degree, school, college, university, program, programs, bootcamp, learn, learning, how to, student, students, exam, youtube |
| Software / downloads | free, download, crack, cracked, torrent, license, licence, autocad license, revit license, subscription, trial, student version, price of autocad, autocad price, revit price, software, app, plugin, template, templates, block, blocks, family, families, pdf, dwg file, sample, samples, examples, symbols, shortcut, shortcuts, commands |
| Tools (rendering learners) | blender, lumion, enscape, vray, v-ray, twinmotion, 3ds max, sketchup tutorial, d5 render, render farm, cloud rendering, ai rendering, ai render |
| DIY / homeowners | house plans, home plans, floor plans for sale, deck, garage, adu, addition, remodel, renovation, kitchen, bathroom, basement, shed, pool, fence, homeowner, my house, cheap, cheapest |
| Wrong discipline | mechanical, solidworks, electrical drafting, civil drafting, pcb, jewelry, tattoo, product rendering, furniture, millwork, sheet metal, piping, structural steel detailing |
| Marketplaces / freelance platforms | fiverr, upwork, freelancer.com, reddit, craigslist |
| Info / definitions | what is, definition, meaning, vs, versus, wiki, salary of |
| Local (we're remote) | near me |
| Supplies | drafting table, drafting chair, drafting supplies, drafting tools, drafting pencil, drafting board, drafting paper |

Do **not** add these as negatives. They are core intent: hire, outsource, outsourcing, services, company, agency, remote, offshore.

---

## 6. Assets (extensions)

### Sitelinks (account or campaign level)
URLs, in order: `/roles/cad-drafter/`, `/roles/bim-modeler/`, `/roles/3d-visualization-artist/`, `/roles/architectural-designer/`, `/#pricing`, `/#how-it-works`, `/#guarantee`, `/roles/construction-admin-support/`.

| Sitelink text (≤25) | Desc line 1 (≤35) | Desc line 2 (≤35) | Chars |
|---|---|---|---|
| CAD Drafters | Dedicated AutoCAD & Revit drafters | FT $2,450/mo or PT $1,500/mo | 12/34/28 |
| Revit / BIM Modelers | Remote Revit modeling staff | Placed in 1-2 weeks | 20/27/19 |
| 3D Visualization Artists | Your own rendering artist | FT $2,450/mo or PT $1,500/mo | 24/25/28 |
| Architectural Designers | Remote design support staff | Fully managed, no contracts | 23/27/27 |
| Pricing | Flat monthly pricing, FT or PT | Up to 70% less than a US hire | 7/30/29 |
| How It Works | From intake to placement | Placed in 1-2 weeks | 12/24/19 |
| Replacement Guarantee | Free replacement if not a fit | No long-term contracts | 21/29/22 |
| Construction Admin | Submittals, RFIs and CA support | FT $2,100/mo or PT $1,300/mo | 18/31/28 |

### Callouts

| Callout (≤25) | Chars |
|---|---|
| Up to 70% Below US Hires | 24 |
| Placed in 1-2 Weeks | 19 |
| Fully Managed Staff | 19 |
| Free Replacements | 17 |
| No Long-Term Contracts | 22 |
| Full-Time or Part-Time | 22 |
| AutoCAD & Revit Talent | 22 |
| Philippines & LATAM Staff | 25 |
| Flat Monthly Pricing | 20 |
| Built for Architecture | 22 |

### Structured snippets
- Header **Services**. Values:

| Value (≤25) | Chars |
|---|---|
| CAD Drafting | 12 |
| Revit/BIM Modeling | 18 |
| 3D Visualization | 16 |
| Architectural Design | 20 |
| Permit Coordination | 19 |
| Construction Admin | 18 |
| Marketing Coordination | 22 |
| Admin Assistance | 16 |

- Header **Types**. Values: Full-Time, Part-Time.

Skip for now: call extension (no phone on site), price assets (optional add later: CAD Drafter "From $1,500/mo", BIM Modeler "From $1,500/mo", Admin Assistant "From $1,300/mo"), image assets (add the blueprint illustration + 1 square logo once approved), lead form asset (keep the conversion on-site so GA4 sees it).

---

## 7. Bidding

| Phase | Strategy | Trigger to move on |
|---|---|---|
| **Phase 1** (launch to ~30 conv) | **Maximize Clicks**, **max CPC cap $12**. Keyword-level caps: AG3 head terms $10, AG4 staffing terms $8 | ≥30 conversions in the last 30 days, **or** ~15 conv + 6 weeks of steady CPL (low-volume fallback) |
| **Phase 2** | **Maximize Conversions** (no target) for 2-3 weeks | Stable volume, 30+ conv/30 days |
| **Phase 3** | Add **Target CPA** at ~1.1x observed CPA | CPA is steady within ±20% week over week |

Notes:
- The $12 cap sits above the KP low-end bid for every core term and below most high-end bids. It keeps Max Clicks from overpaying on $40-80 rendering auctions.
- At $40/day, reaching 30 conv/30 days may take 2-3 months. Do not switch earlier just because Google recommends it.
- Bid-strategy changes reset learning. Make **one change at a time** and wait 7 days between changes.

---

## 8. Geo, language, schedule, devices

| Setting | Value |
|---|---|
| Locations | **United States** |
| Location option | **Presence**: "People in or regularly in your targeted locations" (NOT "interest") |
| Exclusions | None needed. Presence targeting already blocks searches from the Philippines and LATAM (candidates and competitors) |
| Language | English |
| Ad schedule (account time zone **ET**) | **Mon-Fri 7:00 AM-8:00 PM ET** at launch (covers 9-5 Pacific). Weekends off |
| Devices | All. Review after 14 days. If mobile CPL is >1.5x desktop, either fix the mobile form or exclude mobile (-100%). Smart bidding ignores other device adjustments |
| Audiences (observation only) | In-market: *Business Services*, *Staffing & Recruitment*. Custom segment: people who searched "architecture firm software", "revit", "autodesk" and similar. Observation mode only, no targeting restriction |
| Later | Ramp state by state if certain metros (NY, CA, TX, FL) convert better. Add a remarketing list (GA4 site visitors) for observation |

---

## 9. Launch checklist (in order)

**Tracking must be live before any spend.**

- [ ] Role pages `/roles/<slug>/` for all 8 slugs + `/thanks/` are **live and return 200**. Each role page shows the price and has the form above the fold
- [ ] The form posts successfully and **redirects to `/thanks/`**
- [ ] **GA4** property installed site-wide (gtag or GTM). `generate_lead` fires **once** on `/thanks/` (confirm in GA4 **DebugView**)
- [ ] `generate_lead` marked as a **Key event** in GA4
- [ ] **Google Ads ↔ GA4 linked** (GA4 Admin → Product links). Auto-tagging ON
- [ ] Conversion imported in Ads as **"Lead - Form Submit"**, set to **Primary**, Count = One, 90-day window
- [ ] (Recommended) Google Ads tag + Enhanced Conversions via GTM. Only one action set to Primary
- [ ] Hidden form fields capture `gclid`, `utm_source`, `utm_campaign`, `utm_term`
- [ ] Test lead submitted via a real ad-like URL (`?gclid=TEST`). It shows in GA4 Realtime, and the Ads conversion status turns "Recording" within 24-48h
- [ ] Privacy policy page live (Google Ads policy requirement for lead forms) + cookie/consent banner if needed (Consent Mode v2)
- [ ] Billing set up on the Google Ads account. Account time zone = ET
- [ ] Shared negative list created and applied
- [ ] Campaign built **paused**. Review ads for policy/disapprovals. Proofread every RSA headline against the claims rules (**no client counts, reviews, ratings or "trusted by"**)
- [ ] Assets attached (sitelinks, callouts, snippets)
- [ ] Enable AG1 to AG4. Leave AG5 paused. Set a calendar reminder for the day-3 and day-7 checks

---

## 10. Optimization plan

### Week 1 (check days 2, 4, 7)
- [ ] **Search terms report, daily.** Add irrelevant terms to the shared negative list (expect job seekers, homeowners, software learners)
- [ ] Confirm conversions are recording. If 0 conversions after ~60 clicks, test the form end-to-end before touching anything else
- [ ] Look for keywords "Not eligible" or "Low search volume" and replace them with close variants seen in search terms
- [ ] Check impression share: "Lost IS (budget)" vs "Lost IS (rank)". If rank loss is >50% on AG1, raise the cap to $14 on AG1 only
- [ ] Don't pause anything for performance yet. There's too little data

### Weeks 2-4
- [ ] Pause any keyword with **>$60 spend and 0 leads** (≈8-9 clicks). Watch list: bim modeler, revit drafter, revit drafting, 3d rendering services
- [ ] Compare CPL by ad group. If AG3 CPL is >2x AG1, cut AG3 to its 3-4 best exact terms or pause it
- [ ] RSA asset report: replace "Low" rated headlines once each ad has 2,000+ impressions. Test a price-led variant vs a speed-led variant
- [ ] Check landing pages: bounce rate / engaged sessions in GA4 for each `/roles/` page. A low engagement rate means the page needs work, not the ads
- [ ] Device and hour-of-day review. Trim hours with spend and no leads (on Max Clicks the schedule is the main lever)
- [ ] Week 3: if CPL is ≤ $250, **enable AG5** and consider raising budget to $50/day
- [ ] Month-end: tally leads → qualified calls → signed clients. Start uploading **offline conversions** (qualified call) keyed on gclid

### Month 2+
- [ ] At ~30 conv/30 days, switch to **Maximize Conversions**. Later move to tCPA
- [ ] Add a Permit Coordinator ad group if permit terms convert in AG5
- [ ] Test broad match **only** on AG1 with Max Conversions + full negatives (as a separate experiment)
- [ ] Consider a remarketing (RLSA) bid layer and a small Demand Gen/YouTube test after Search is profitable

---

## Appendix: top opportunities at a glance (KP, US)

| Keyword | Vol/mo | Top-of-page bid | Ad group |
|---|---|---|---|
| cad drafting services | 590 | $4.32-$20.46 | AG1 |
| bim services | 590 | $9.41-$28.49 | AG2 |
| architectural drafting services | 480 | $3.76-$18.54 | AG1 |
| bim modeling services | 390 | $8.97-$52.49 | AG2 |
| outsource cad drafting services | 110 | $8.69-$40.68 | AG1 |
| architectural rendering services | 590 | $7.89-$48.23 | AG3 |
| revit drafting services | 50 | $12.31-$33.84 | AG2 |

Considered and rejected:
- Generic Philippines VA terms. *hire virtual assistant philippines* gets 480/mo but bids run $13-66, and *virtual assistant agency philippines* runs up to $107. They aren't architecture-specific, and VA agencies compete heavily.
- Job-seeker terms (*remote drafting jobs* 880, *remote cad drafting jobs* 480).
- Informational/generic terms (*drafting* 12,100, *bim* 22,200).
