# ADR-000: Record architecture decisions

## Date
2023-10-01

## Status
ACCEPTED

## Context
This project needs to keep track of various decisions regarding architecture, organization, code style, testing and so on.

## Decision
We will use Architectural Decision Records (ADR), as [described by described by Michael Nygard][adr-description]. Recorded decisions must be respected as long as their status is `ACCEPTED.`

## Consequences
Introduces an additional burden on reviewers to ensure each ADR is respected. In some cases, this can be offset by developing tooling that automatically validates the respect of ADRs.

## Appendix

[ADR template][template]

[adr-description]: https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions
[template]: ./ADR-NNN-template.md
