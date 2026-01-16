# HomeScope

HomeScope is a product concept for transforming residential home inspection reports into
clear, structured, and actionable insights for buyers, sellers, and agents.

It focuses on surfacing **issues**, **severity**, and **next steps** — not raw PDFs.

This repository is scaffolded from the **Atlas Token System**, which provides the underlying
design system, tokens, and UI primitives.

---

## Product Intent

Home inspection reports are dense, inconsistent, and difficult for non-experts to interpret.

HomeScope aims to:
- Ingest inspection reports (PDFs)
- Identify and group issues by category and severity
- Present a clean, issue-centric summary
- Help users understand *what matters*, *what’s urgent*, and *what it may cost*

This repo represents the **frontend product layer**, not the parsing or AI backend.

---

## What This Repo Is

- A **product scaffold** for HomeScope
- A Vite + React + TypeScript app
- Built on a token-driven design system (Atlas)
- A place to design and validate UX flows before backend integration

---

## What This Repo Is Not

- A finished product
- A backend or AI pipeline
- A general-purpose design system (that lives in Atlas)

---

## Design System Foundation (Atlas)

HomeScope is built on the **Atlas Token System**, which provides:
- Design tokens (color, spacing, typography)
- CSS variables
- Tailwind mappings
- React UI primitives
- Layout and usage guardrails

Atlas is treated as **infrastructure**, not a product.

---

## Local Development

```bash
npm install
npm run dev
