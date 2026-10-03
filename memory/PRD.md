# Fortu — PRD

## Original problem statement
Build **Fortu**, an Estonian-language, mobile-first financial-literacy learning app (iOS/Android, Expo React Native). Source of truth: `fortu_arendusjuhis.md` (DECIDED vs PROPOSAL), `fortu_disainijuhis.md` (design system), `fortu_sisu.json` (canonical Estonian copy), `fortu_prototuup.html` (executable spec). Copies in `/app/src_docs/`. No streaks, XP, lives, badges, praise, pressure notifications or financial promises. Do not invent lesson content.

## User choices
- Mock/demo sign-in (Google/Apple buttons), isolated for later real OAuth
- Local device persistence behind a replaceable repository
- Inter + Fraunces bundled via expo-font
- "Päevi koos Fortuga" = hard-coded 14, isolated in config

## Architecture (frontend only; backend unused)
- `src/content/` — `fortu_sisu.json` (canonical), typed content layer with stable IDs, Estonian alphabet sort, `ui.ts` (strings from design guide), `systemCopy.ts` (PLACEHOLDER error/empty copy — not approved)
- `src/state/` — FortuProvider store, selectors (DECIDED unlock logic, resume target), types
- `src/services/` — `persistence.ts` (ProgressRepository, local), `auth.ts` (AuthService, mock)
- `src/navigation/` — routes + rule-based back (all moves `replace`), `steps.ts` lesson registry (empty — content missing)
- `src/config.ts` — unresolved product decisions (days counter, topic numbering, topics counter)
- `src/components/` — ScreenShell (header/progress/CTA/nav, dark/light), BottomNav, OptionCard, FortuSay/Mascot, StepPips, Buttons, Toast, StatusMessage, Icon (prototype SVGs), DeepBackground (radial gradient)
- Routes: login, home, why, self/{intro,instructions,q/[i],hint/[i],result}, abc/{intro,pack/[p],q/[i],done}, journey, topic/[id], dictionary, profile

## Implemented (2026-06)
- Full first-time journey: opening → Home → Why → self-awareness (5 Q + hints + result) → ABC (3 packs, 15 concepts, Kontrolli/verdict, score) → topic plan
- Returning Home with continue card resuming actual unfinished step
- Journey with completed/in-progress/not-started/locked states, lock reasons, ring for current step
- Dictionary (Estonian alphabet, returns to exact source screen), Profile placeholder message
- Persistence across reloads, accessibility (radio roles, verdict SR text, focus on new screen, step labels), Android hardware back
- Tested end-to-end by testing agent: all flows pass

## Teema 1 "Raha psühholoogia" lessons (2026-06)
- Lesson engine: `src/content/lessons/` (typed data per lesson, registry, helpers), `src/components/lesson/` (Blocks, Inputs, Sections), routes `app/lesson/[step]/index.tsx` (dark opening) + `app/lesson/[step]/[s].tsx` (section flow)
- Steps 1.1–1.5 built from the supplied .docx files: Raha ja mina, Raha ja tunded, Raha ja uskumused, Raha ja valikud, Eesmärkide ABC
- Section kinds: text, profile (no right answer → peegeldus by dominant a–d), quiz (right/wrong like ABC), sort (tap-to-sort chips instead of drag & drop), write (free text, device-local), pick (500 € choice → value feedback), generator (SMART sentence), summary (dark + teaser)
- Progress: `state.lessons[stepId]` {sectionIdx, choices, texts, revealed, completedAt}; topic step count derives from completed lessons; `state.topics` removed
- Praise lines from the source ("Väga tubli!", "Tubli!") rewritten to descriptive copy; "Homme" → "Järgmises sammus" (no daily scheduling in app)
- Keyboard: ScreenShell gained `keyboard` prop (KeyboardAwareScrollView) for write/generator sections

## Backlog
- P0: Lesson content for Teema 1 steps 6–7 ("Minu miks ja tulevikupilt", "Kokkuvõte") and topics 2–5
- P1: Real Google/Apple OAuth; server-backed ProgressRepository; approved error/offline copy
- P1: Product decisions: days-with-Fortu meaning (Q1), redo self-awareness (Q2), is "Rahatarkuse algus" a topic (Q8)
- P2: Real mascot illustration (raccoon in green hoodie); Profile content
