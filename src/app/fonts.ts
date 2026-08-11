import localFont from 'next/font/local';

/**
 * Li Ador Noirrit — the Bengali face for the whole site, self-hosted.
 *
 * Only Regular (400) and Bold (700) are wired up. `next/font/local` emits one
 * `<link rel="preload">` per entry in `src`, and the `preload` flag is
 * all-or-nothing per call, so every extra weight listed here is ~82 KB added to
 * the critical path of every route. These two cover the full range the app uses
 * via normal CSS weight matching, and because both are real cut weights nothing
 * is ever faux-bolded by the browser:
 *
 *   font-light (300)    → Regular
 *   font-normal (400)   → Regular
 *   font-medium (500)   → Regular
 *   font-semibold (600) → Bold
 *   font-bold (700)     → Bold
 *   font-extrabold (800)→ Bold
 *
 * The other eight files stay on disk in ./fonts. Add one to `src` only if a
 * design genuinely needs it, and expect the extra preload. The five italics are
 * deliberately unused: Bengali has no italic tradition and nothing in the app
 * sets `font-style: italic`.
 */
export const bengali = localFont({
  src: [
    { path: './fonts/Li Ador Noirrit Regular.ttf', weight: '400', style: 'normal' },
    { path: './fonts/Li Ador Noirrit Bold.ttf', weight: '700', style: 'normal' },
  ],
  variable: '--font-bn-sans',
  display: 'swap',
  // Bengali codepoints are not in Arial, so they fall through to whatever the OS
  // ships. Name those explicitly rather than letting `sans-serif` decide.
  fallback: ['Nirmala UI', 'Noto Sans Bengali', 'system-ui', 'sans-serif'],
});
