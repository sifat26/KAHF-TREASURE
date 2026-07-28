# Debug Session: hero-banner-missing
- **Status**: [OPEN]
- **Issue**: Homepage hero banner slider renders controls/content, but the banner image itself is not visible.
- **Debug Server**: Unavailable locally (`python` not installed), so browser runtime inspection was used for evidence collection.
- **Log File**: .dbg/trae-debug-log-hero-banner-missing.ndjson

## Reproduction Steps
1. Start the local Next.js app.
2. Open the homepage.
3. Inspect the hero section banner area.
4. Observe that slider controls appear but the banner image does not.

## Hypotheses & Verification
| ID | Hypothesis | Likelihood | Effort | Evidence |
|----|------------|------------|--------|----------|
| A | Hero banner image requests are failing due to invalid/external image URLs or hotlinking restrictions. | High | Low | Rejected |
| B | The banner element is rendering, but CSS layering/overlay opacity is hiding it behind another element. | High | Low | Confirmed |
| C | The current hero component structure places the image in a zero-height or clipped container on the page. | Medium | Medium | Rejected |
| D | The homepage is not rendering the latest HeroSection code due to build/runtime error or stale dev server state. | Medium | Low | Rejected |
| E | The browser is blocking or not loading the banner source, leaving the slide area visually empty. | Medium | Low | Rejected |

## Log Evidence
- Browser inspection showed the hero container rendering at roughly `839px` height, so the banner area was not collapsed.
- All three banner images were present in the DOM with `naturalWidth=1920` and `naturalHeight=1080`, confirming the assets loaded.
- The active banner image had `opacity: 0.4`.
- A full-cover overlay was rendered above the slide media with a near-solid black gradient that included `0.95` alpha at the midpoint.
- Browser screenshots showed the hero slider controls and content rendering while the banner itself was visually drowned by the dark treatment.
- After the fix, the homepage browser snapshot showed visible hero slide images plus slide text such as `Royal Attar Display` and `Crafted For Daily Elegance`.

## Verification Conclusion
- Root cause: the original hero used a background-style slider with low image opacity and an almost opaque dark gradient, so the banner technically rendered but was not visually readable.
- Fix applied: replaced the faint background-only treatment with a visible slider card in the hero, kept the premium gold/dark visual language, and switched the hero slides to stable generated banner images.
- Local verification: homepage reloaded successfully in the browser, slide images were visible, controls remained functional, and lint reported no errors from the updated hero.
