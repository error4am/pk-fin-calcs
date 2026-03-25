# PK FinCalcs — Pakistan Financial Calculator Site

## What This Is

A static SEO-first website offering free Pakistan-focused financial calculators in PKR. Built for organic search traffic targeting high-CPC finance keywords in Pakistan.

## Live Site

- URL: https://error4am.github.io/pk-fin-calcs/
- Sitemap: https://error4am.github.io/pk-fin-calcs/sitemap.xml

## Repo

- GitHub: https://github.com/error4am/pk-fin-calcs
- Deployment: GitHub Pages via GitHub Actions (auto-deploys on push to main)

## Target Keywords

- `free emi calculator`
- `salary tax calculator 2026`
- `compound interest calculator`
- `home loan calculator`
- Pakistan-specific variants of all above

## Current Pages

1. **Homepage** — SEO hub linking to all calculators, FAQ with JSON-LD schema
2. **EMI Calculator** (`/emi-calculator/`) — EMI for any loan in PKR, reducing balance formula
3. **Salary Tax Calculator** (`/salary-tax-calculator/`) — Pakistan FBR salaried slabs FY 2025-2026
4. **Compound Interest Calculator** (`/compound-interest-calculator/`) — monthly/quarterly/half-yearly/yearly compounding
5. **Home Loan Calculator** (`/home-loan-calculator/`) — EMI with down payment breakdown

Each page includes:
- self-canonical
- focused title + meta description
- Open Graph + Twitter meta
- calculator UI with quick-fill presets
- content section (formulas, explanations)
- FAQ section with FAQPage JSON-LD schema
- internal links to related calculators
- footer navigation

## Tech Stack

- Pure HTML + CSS + JavaScript (no framework, no build step)
- Static deployment to GitHub Pages
- GitHub Actions workflow for automated deploys

## File Structure

```
pk-fin-calcs/
├── index.html                          (homepage)
├── robots.txt                          (sitemap pointer)
├── sitemap.xml                         (clean UTF-8, 5 URLs)
├── .gitignore
├── .github/workflows/deploy.yml        (GitHub Pages deploy)
├── assets/
│   ├── css/style.css                   (design system, responsive)
│   └── js/calculators.js               (all calculator logic)
├── emi-calculator/index.html
├── compound-interest-calculator/index.html
├── salary-tax-calculator/index.html
└── home-loan-calculator/index.html
```

## Calculator Logic

- **EMI**: standard reducing balance formula, PKR formatted output
- **Salary Tax**: Pakistan FBR FY 2025-2026 slabs (0% up to 600K, then 5/15/25/30/35%)
- **Compound Interest**: A = P(1 + r/n)^(nt)
- **Home Loan**: combines down payment % with EMI calculation

## SEO Notes

- All URLs use relative paths (not absolute) because site is hosted at `/pk-fin-calcs/` subpath
- Sitemap has no BOM, clean UTF-8, starts at byte 1 with `<?xml`
- canonical URLs point to `https://error4am.github.io/pk-fin-calcs/*`
- robots.txt points to the sitemap

## Known Context

- This project was created after the LAND/ project (land-converter) which was a similar static SEO site for Pakistani land unit conversions
- Domain advice: consider custom domain later if project grows, but not urgent

## Next Steps (When Ready)

1. Submit sitemap in Google Search Console
2. Monitor impressions/clicks in Search Console after 3-10 days
3. Add more calculator pages: car loan, zakat, SIP, loan eligibility, PF, gratuity
4. Add content/blog pages for long-tail keywords
5. Consider custom domain if traffic grows

## Deployment

Every push to `main` auto-deploys via GitHub Actions.

```bash
git add -A && git commit -m "message" && git push origin main
```
