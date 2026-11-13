# Vector87 Local Agent Crew & Daily Operating System

This directory houses the instructions, operational cadences, and daily execution plans for the autonomous team governing [Vector87.com](https://vector87.com) and [ai_data_jobs](file:///Users/antonin.kucera/Projects/personal/ai_data_jobs).

---

## 1. Operating Principle: Human-in-the-Loop Cockpit

Rather than running unchecked background processes that risk silent hallucination or unwanted git state:
1. **Interactive Local Execution**: Everything executes locally within the Antigravity environment.
2. **Daily Plan & Approval Gate**: Every morning, the Product Manager formulates a concise **Daily Plan** in `agents/plans/YYYY-MM-DD.md`.
3. **Founder Confirmation**: The founder reviews the plan in chat, adjusts priorities if needed, and approves execution.
4. **Surgical Execution**: Agents execute approved tickets, run automated verification tests, and report back.
5. **No Blind Deployments**: Remote `git push` or production releases always require explicit human confirmation.

---

## 2. The Specialist Crew

The team consists of 5 dedicated roles:

| Role | Specification File | Primary Focus |
|---|---|---|
| **Product Manager** | [product_manager.md](file:///Users/antonin.kucera/.gemini/antigravity/worktrees/vector87_com/ai_agents_daily_routine/agents/roles/product_manager.md) | Vision steward, roadmap backlog, methodology integrity, founder alignment. |
| **Growth Specialist** | [growth_specialist.md](file:///Users/antonin.kucera/.gemini/antigravity/worktrees/vector87_com/ai_agents_daily_routine/agents/roles/growth_specialist.md) | Content tandem with PM, Substack pulses, social carousels/threads, affiliate funnels. |
| **SEO & QA Specialist** | [seo_specialist.md](file:///Users/antonin.kucera/.gemini/antigravity/worktrees/vector87_com/ai_agents_daily_routine/agents/roles/seo_specialist.md) | Technical SEO, Googlebot <2MB limit, Schema.org, Search Console, browser UI QA. |
| **Developer** | [developer.md](file:///Users/antonin.kucera/.gemini/antigravity/worktrees/vector87_com/ai_agents_daily_routine/agents/roles/developer.md) | Astro frontend, Tailwind styling, typed i18n dictionaries, static builds, git hygiene. |
| **Data Engineer** | [data_engineer.md](file:///Users/antonin.kucera/.gemini/antigravity/worktrees/vector87_com/ai_agents_daily_routine/agents/roles/data_engineer.md) | DuckDB, 2,500+ enterprise career portals, ATS healing, unmapped roles, data parity. |

---

## 3. Directory Structure

```
agents/
├── README.md               # This operating guide
├── roles/                  # Specialized instructions for each persona
│   ├── product_manager.md  # Vision, Backlog, Methodology, Content Ideation
│   ├── growth_specialist.md# Substack Pulses, Social Motion, Affiliates, Distribution
│   ├── seo_specialist.md   # Technical SEO, <2MB Crawler Limits, Schema.org, Browser QA
│   ├── developer.md        # Astro/Tailwind Frontend, i18n, Static Builds, Git Hygiene
│   └── data_engineer.md    # DuckDB, Top 100 Portals, ATS Healing, Taxonomy Normalization
└── plans/                  # Daily execution logs and active sprints
    ├── daily_template.md   # Standard daily plan format
    └── YYYY-MM-DD.md       # Dated daily plan files
```

---

## 4. Daily Operating Rituals

### Morning: Standup & Daily Plan Generation
- **Trigger**: Ask Antigravity `"Pojďme na ranní standup"` or `"Připrav dnešní daily plan"`.
- **Workflow**:
  1. Data Engineer checks pipeline freshness (`scripts/pipeline_status.py`).
  2. SEO Specialist checks build output and payload health.
  3. Product Manager inspects `docs/internal/roadmap.md` and generates `agents/plans/YYYY-MM-DD.md` with:
     - 🎯 **Primary Focus of the Day** (1 main milestone).
     - 👥 **Assigned Action Tickets** for each specialist.
     - 🛑 **Decisions Requiring Founder Approval** (new routes, schema changes, git push).

### Mid-Day: Execution & Verification
- The founder gives the green light: *"Schvaluji plán"* or adjusts tickets.
- Antigravity activates the relevant agent roles and executes surgically.
- Automated tests run before completing any code changes:
  - `pytest tests/test_data_consistency.py`
  - `npm run build`

### Evening: Wrap-up & Status Update
- Update the checklist in `agents/plans/YYYY-MM-DD.md` (`[x]` completed).
- Report diff and summary to the founder.
- Stage atomic git commits; wait for founder approval before running remote `git push`.
