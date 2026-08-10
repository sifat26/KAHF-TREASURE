function looksMojibake(value: string): boolean {
  return /[ÃÂâ€à¦]/.test(value);
}

export function fixMojibake(value: string): string {
  if (!looksMojibake(value)) return value;

  try {
    const bytes = Uint8Array.from(value, character => character.charCodeAt(0));
    return new TextDecoder('utf-8').decode(bytes);
  } catch {
    return value;
  }
}

export function normalizeText<T>(value: T): T {
  if (typeof value === 'string') {
    return fixMojibake(value) as T;
  }

  if (Array.isArray(value)) {
    return value.map(item => normalizeText(item)) as T;
  }

  if (value && typeof value === 'object') {
    const normalized: Record<string, unknown> = {};
    for (const [key, entry] of Object.entries(value as Record<string, unknown>)) {
      normalized[key] = normalizeText(entry);
    }
    return normalized as T;
  }

  return value;
}