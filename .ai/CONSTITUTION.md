# Project Constitution: VantageMP-API (TypeScript + Bun)

This document establishes the strict quality, style, and architectural rules for the migration and development of the system in TypeScript with Bun.

## 1. Code Style

### Structure and Limits

- **Functions:** Must have 4 to 20 lines of logical code. If it exceeds, extract to sub-functions.
- **Files:** Maximum limit of 500 lines. Divide by responsibility if the file grows beyond this point.
- **Single Responsibility Principle (SRP):** A single task per function, a single responsibility per module/file.

### Naming and Typing

- **Specific Names:** Forbidden to use generic terms like "data", "handler", "Manager", "info", or "process".
- **Name Traceability:** Prefer symbol names that generate fewer than 5 results when running a `grep` on the codebase.
- **Strict Typing:** Types must be explicit. Forbidden to use dynamic types (`any`, `unknown` without safe assertion), excessively abstract generics, or omitting types in signatures.

### Logic and Flow

- **No Duplication:** Extract repeated logic to closed-scope utilities.
- **Early Returns:** Prefer early returns to avoid nesting.
- **Indentation:** Maximum limit of 2 indentation levels per function scope.
- **Error Messages:** Must obligatorily contain the value that caused the failure and the expected behavior/format (e.g., `Expected positive integer for persona_id, found -1`).

## 2. Comments and Documentation

- Keep your own comments. Don't strip them on refactor — they carry intent and provenance.
- Write WHY, not WHAT. Skip `// increment counter` above `i++`.
- Docstrings on public functions: intent + one usage example.
- Reference issue numbers / commit SHAs when a line exists because of a specific bug or upstream constraint.

## 3. Automated Tests

- Tests run with a single command: `bun test`.
- Every new function gets a test. Bug fixes get a regression test.
- **I/O Isolation:** Real network, database, or disk access in unit tests is forbidden. Use Interfaces and Mocks/Stubs (fake objects or classes) to inject dependencies. Use Bun's native mock functions (`mock()`, `spyOn()`).
- Tests must be F.I.R.S.T: fast, independent, repeatable, self-validating, timely.

## 4. Dependency Management

- **Dependency Injection:** Always inject via constructors or function parameters. Forbidden to use mutable global states for business logic.
- **Third-Party Abstraction:** Wrap external libraries behind a project-owned `Interface` to facilitate replacement and testing.

## 5. Formatting and Logs

- **Formatting:** Strictly use `bun run lint`. Aesthetic discussions outside the official standard defined in the project tools (Biome) will not be accepted.

## 6. XML Serialization

- **Self-Closing Tags:** The use of self-closing XML tags (e.g., `<Tag/>`) in responses is allowed, only when the content inside the tag is empty

## 7. Development Philosophy

1. **Does this need to exist?** → No: skip it (YAGNI)
2. **Already in this codebase?** → Reuse it, don't rewrite
3. **Stdlib does it?** → Use it
4. **Native platform feature?** → Use it
5. **Installed dependency?** → Use it
6. **One line?** → One line
7. **Only then:** The minimum that works
