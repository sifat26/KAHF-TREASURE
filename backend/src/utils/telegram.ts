import config from '../config';

const TELEGRAM_API = 'https://api.telegram.org';
const REQUEST_TIMEOUT_MS = 10_000;

/**
 * Escape a string for use inside Telegram's HTML `parse_mode`.
 * Only `&`, `<` and `>` are special there.
 */
export function escapeHtml(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/**
 * Send an HTML-formatted message to the configured Telegram chat(s).
 *
 * Designed to be called fire-and-forget: it NEVER throws. If the bot token or
 * chat id are not configured it logs a warning and no-ops, so order creation
 * keeps working locally without Telegram set up. `TELEGRAM_CHAT_ID` may be a
 * comma-separated list to notify several admins.
 */
export async function sendTelegramMessage(html: string): Promise<void> {
  const token = config.telegram.bot_token;
  const chatIds = config.telegram.chat_id
    .split(',')
    .map((id) => id.trim())
    .filter(Boolean);

  if (!token || chatIds.length === 0) {
    console.warn('[telegram] TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID not set — skipping notification.');
    return;
  }

  await Promise.all(
    chatIds.map(async (chatId) => {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
      try {
        const res = await fetch(`${TELEGRAM_API}/bot${token}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text: html,
            parse_mode: 'HTML',
            disable_web_page_preview: true,
          }),
          signal: controller.signal,
        });
        if (!res.ok) {
          const detail = await res.text().catch(() => '');
          console.error(`[telegram] sendMessage failed (${res.status}) for chat ${chatId}: ${detail}`);
        }
      } catch (err) {
        console.error(`[telegram] sendMessage error for chat ${chatId}:`, err);
      } finally {
        clearTimeout(timeout);
      }
    }),
  );
}
