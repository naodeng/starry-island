# Starry Island UI review

## Scope and direction

- Product: a local-first learning app for children in grades 1–6, opened on phones and desktop; recurring jobs are choosing a lesson, answering a short activity, reviewing progress, and managing local data.
- Direction sheet: `accent-ladder`, seed `672929999` (2026-11-02), app kind `community`; it fits the child-facing product and its repeated progress data. The project already fixes its palette and typeface, so the sheet was dealt with `--keep palette,type`.
- Kept face: Starry Island's course map and its green progress ladder. The primary green stays on actions and progress; pale green areas group related learning content. Existing subject colours remain only where they encode a real subject or illustration.
- Product element: the student's selected grade + term + subject becomes one course route, and completed units become visible lights on the learning map.

## Screen questions

| Screen | First question |
| --- | --- |
| Home | What lesson can I continue now? |
| Course catalog | Which grade, term and subject should I open? |
| Unit overview | Which task or session should I start? |
| Learning session | What is this question asking me to do? |
| Growth overview | What progress has this device saved? |
| Learning star map | Which units have lit up for this grade and term? |
| Challenge growth | How many challenges, passed tasks and badges are recorded for this grade and term? |
| Challenge center | Which registered challenge route should I try? |
| Challenge group | Which of the five tasks should I start? |
| Challenge task intro | What should I know before beginning this challenge? |
| Challenge runner/result | How am I doing, and what should I review next? |
| Wrong questions | Which missed question should I review? |
| Settings | Which local preference or learning start should I change? |
| Backup and recovery | How can I export, preview, restore or clear local challenge data? |

## Baseline review notes (current worktree, before this pass)

- Course catalog: the hero carries three informational chips and a companion panel; each unit repeats an uppercase padded number, a status badge, a subject description and a full-width action. On a phone, the filters and first unit consume most of the first screen.
- Unit detail: the task route repeats the selected task title in both the hero and session card. On a phone, the companion card, progress ring, session card and fixed start bar push content down and crowd the viewport.
- Challenge center: four page-local navigation buttons take two rows on a phone, while three stacked filters push the first route below the fold. Two destinations overlap the global menu.
- Challenge growth: an introductory heading and description repeat the section title and another explanatory block; the route summary appears late on desktop and requires three stacked controls on narrow screens.
- Learning session: title/goal, companion, progress, question number and activity icon occupy several stacked surfaces before the answer options. The current question should take visual priority sooner.
- Settings and backup: both remain readable on mobile; settings has a clear control hierarchy. Backup's export, file selection, preview and destructive data actions need their separation and warnings preserved.
- Wrong questions: search, state filters, count and empty state are legible, though the first screen can be shortened without hiding the review action.

## Baseline evidence and limits

- Read-only screenshots and accessibility trees were captured in the local browser for `/`, `/courses`, `/growth` (all three tabs), `/settings`, `/settings/backup`, `/challenges`, one challenge group, a challenge intro, `/challenges/wrong-questions`, one unit, one learning-task page, and one learning session. No answer was submitted and no progress/settings/backup data was changed.
- The Taste Skill static scan ran on `src` in app mode: 31 FAIL and 425 WARN. Many findings come from non-UI curriculum/test files and internal zero-padded identifiers; those are not treated as visual defects. UI-source findings will be rerun against app code after the visual changes.
- `inspect.mjs --app` could not launch the installed Chrome on this host: Chrome exited with `SIGABRT` and no stderr. The screenshots above are from the real in-app browser. Final production inspection will be attempted again; if Chrome continues to abort, that limit will be reported rather than presenting an inspector score.
- Browser inspection of a completed challenge result was intentionally avoided because opening the runner and submitting answers would create a local attempt and alter user data. The result screen is reviewed from its component and responsive styles.

## Review and changes delivered

- Course catalog: removed the duplicate Settings action because Settings is already in the app menu; reduced repeated labels and metadata in unit cards, made cards align consistently, and tightened the hero and filters so the first learning choices are easier to scan.
- Unit overview and task route: removed the repeated selected-task title, reduced metadata noise, simplified session entry, and kept the fixed action usable on narrow screens.
- Learning session: brought the current question and answer choices higher in the page, clarified question position, and reduced decorative content competing with the activity.
- Growth: added grade 1–6 and term 1–2 tabs that show one scope at a time; moved the scope selector before the selected-term summary, and placed all-grade cumulative ranks after the focused content. Grade and term tabs support arrow keys plus Home/End.
- Challenge center, group, task intro and wrong questions: reduced duplicate navigation and repeated intro copy, tightened filters and cards, and shortened the empty state. Challenge result was reviewed in source because submitting an attempt would mutate local progress.
- Home, shared shell, themes and supporting surfaces: removed repeated course/session title fragments, aligned spacing, card edges and status hierarchy, and retained the existing green identity, light/dark theme support, focus indicators and reduced-motion CSS.

## Final review evidence and limits

- Real-browser review covered `/`, `/courses`, `/growth` (all three views), `/settings`, `/settings/backup`, `/challenges`, one challenge group, one challenge task intro, `/challenges/wrong-questions`, one unit overview, one task route, one learning session, and an unknown-route screen. Desktop and narrow layouts were checked; the theme was also viewed in dark mode and restored to system preference. Grade/term keyboard navigation and visible focus were checked. Reduced-motion styles were confirmed in source; browser preference emulation was not separately recorded.
- The focused Taste Skill scan over app/UI source finished with **0 FAIL, 66 WARN**. The warnings are the existing eyebrow/kicker pattern and a zero-padded sound-clock value. The broader `src` scan also reports unrelated content/test-fixture findings, so it is not used as an app UI score.
- `inspect.mjs --app` remains unavailable on this host because its Chrome process exits with `SIGABRT` and no stderr; visual review used screenshots and accessibility trees from the in-app browser instead.
- No challenge answer was submitted. Opening the fresh preview on port `5176` ran the app's existing textbook migration on that origin and reset legacy Grade 2 Term 1 Math progress there; the app displayed its migration notice. The user's existing tab on port `5175` uses a separate origin and was left untouched. No learning start, settings, backup or challenge attempt was changed by this review.
- Final verification passed: `npm run build` (TypeScript and Vite production build, 893 modules) and `git diff --check`. The focused Taste Skill scan reported 0 FAIL, 66 WARN. Tests were not run.
