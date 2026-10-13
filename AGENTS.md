# AGENTS.md

Guidance for AI coding agents working in this repository.
Read `.ai/CONSTITUTION.md` first. It is mandatory and takes precedence over any habit or default.

## Project

VantageMP-API: a from-scratch rewrite, in TypeScript, of the server API of an open-source Need For Speed World server emulator (originally written in Java). Goals: portfolio project and a robust API to benchmark against the legacy one.

Stack: Bun, Elysia, Drizzle ORM (`1.0.0-rc.3`, relations v2 via `defineRelations`), MySQL, Biome, TypeBox (via `elysia`'s `t`).

## Branches

- `develop` is the integration branch and the source of truth. `main` is outdated: never branch from it, never target it.
- Create task branches from `develop` (`feat/...`, `fix/...`, `chore/...`) and open PRs against `develop`.
- Small commits, one concern each. Do not push, merge, or rewrite history without being asked.

## Commands

```bash
bun run dev          # dev server on :3000 (watch)
bun test             # tests (single command, must pass)
bun run lint         # biome check --write
bun typecheck			   # typecheck (add a "typecheck" script if missing)
bunx drizzle-kit generate   # generate migration after schema change
```

Before declaring a task done: `bun run lint`, typecheck, and `bun test` must all pass.

## Architecture

```
routes -> controllers -> services -> database
```

- `src/routes/*.routes.ts`: Elysia routes + validation schemas. No logic.
- `src/controllers/*.controller.ts`: adapt request/response (XML vs JSON). No DB access.
- `src/services/*.service.ts`: business logic and DB queries via `db` (Drizzle).
- `src/models/schema/*.schema.ts`: request/response types and TypeBox schemas.
- `src/middleware/`: auth, error handler, logger.
- `src/utils/`, `src/constants/`: pure helpers and constants.
- Path alias: `@/*` -> `src/*`.
- Errors: services throw `Error("CODE")`; `errorHandler.middleware.ts` maps codes to HTTP responses. Add new codes there.

## Protocol constraints (do not "improve")

The game client is fixed and expects exact formats. These are contracts, not style choices:

- All routes live under the `/Engine.svc` prefix.
- Legacy endpoints answer in XML via `XML.stringify` from `bun`. `Content-Type: application/xml` / `text/xml` bodies are parsed in `src/index.ts`.
- Java-style numbers: use `formatJavaDouble` for doubles (`1` -> `1.0`).
- Header names `userid` and `securitytoken` are lowercase and required on authenticated routes.
- XML self-closing tags only when the element is empty (Constitution §6).
- The database schema (`src/database/schema.ts`) mirrors the legacy MySQL schema so existing databases keep working. Do not rename tables or columns. Schema changes need a Drizzle migration and an explicit request from the maintainer.

When unsure about the exact response shape of an endpoint, ask the maintainer for a captured request/response. Do not guess.

## Clean-room rule (important)

This is a rewrite, not a port. The legacy project is open source and may be consulted **only to understand observable behavior** (what an endpoint receives and returns, game rules). Therefore:

- Do not copy code, structure, comments, class names, package names, or identifiers from the legacy project. Re-implement idiomatically in TypeScript following this repo's architecture.
- Do not introduce the legacy project's branding in code: no `sbrw`, `soapbox`, `SoapBox`, or similar in identifiers, file names, comments, log messages, constants, or error messages.
  - Exception: `.env` / DB name already in use and the legacy-compatible database schema. Do not spread them elsewhere.
- Credits to the original authors belong only in `README.md` (and `NOTICE`/license files if applicable). Do not add attribution comments in source files.
- If you notice the legacy license imposes obligations on derived work, flag it to the maintainer instead of deciding yourself.

## Code rules (summary of the Constitution)

- Functions: 4-20 lines of logic, max 2 indentation levels, early returns, single responsibility.
- Files: max 500 lines.
- Names: no `data`, `handler`, `Manager`, `info`, `process`. Prefer names with fewer than 5 `grep` hits.
- Explicit types in all signatures. No `any`; no `unknown` without safe narrowing.
- Error messages must include the offending value and the expected format, e.g. `Expected positive integer for persona_id, found -1`.
- Dependency injection via parameters/constructors. No new mutable global state. Wrap external libraries behind a project-owned interface.
- Comments explain WHY, never WHAT. Keep existing comments when refactoring.
- Logs: structured JSON. No stray `console.log` debug statements.
- Biome style: tabs, double quotes, semicolons, trailing commas, line width 100.

## Tests

- Every new function gets a test; every bug fix gets a regression test.
- No real network, database, or disk in unit tests. Inject dependencies and use `mock()` / `spyOn()` from `bun:test`.
- Tests must be fast, independent, repeatable, and self-validating.
- Write the test first when practical.

## Workflow for each task

1. Restate the task and list the files you will touch. For tasks touching more than 2 files, present a short plan and wait for approval.
2. Work in one vertical slice: route + controller + service + schema + test.
3. Reuse existing utilities (`hashPassword`, `verifyPassword`, `formatJavaDouble`, `parameter-parsers`) before writing new ones.
4. Run lint, typecheck, and tests. Fix what you broke.
5. Summarize: what changed, what was not verified, open questions. Do not claim success on anything you did not run.

## Boundaries

- Do not add dependencies without asking.
- Do not edit generated files under `drizzle/` by hand.
- Do not touch `.env`, and never print or commit secrets.
- Do not refactor unrelated code in the same change.
- YAGNI: do not build features nobody asked for.

## Known technical debt (good first tasks)

- `modernAuthenticateUser` builds `whid` instead of `hwid`.
- Debug `console.log` calls in `auth.controller.ts` and `auth.middleware.ts`.
- `session.store.ts` and `parameter.service.ts` use module-level mutable state; extract behind an injectable interface.
- Services import `db` globally; inject it to make unit testing possible.
- No tests and no typecheck script yet.
- Error messages lack the offending value (Constitution §1).

## Legacy Project

There are 2 folders you can read to get everything you need to create what you need.

- `~/projects/world/sbrw_reloaded-core` is the source code, almost everything is there.
- `~/projects/world/legacy-api` is the investigation resume made by AI on the source code, you can check how routes work and the development order there.
