// Persist the customer's delivery addresses in localStorage so they can save
// several and reuse them on the next order. Client-only (guards `window`).
//
// Mirrors the localStorage conventions used elsewhere in the app: a versioned
// key and defensive try/catch around every JSON read/write.

export interface SavedAddress {
  id: string;
  /** Optional nickname, e.g. "বাসা" / "অফিস". */
  label?: string;
  customerName: string;
  phone: string;
  email?: string;
  district: string;
  upazila: string;
  addressLine: string;
  postalCode?: string;
}

const KEY = 'kahf-addresses-v1';
const MAX_ADDRESSES = 6;

/** Fields that make two addresses "the same" for de-duplication. */
type AddressInput = Omit<SavedAddress, 'id'>;

function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

function sameAddress(a: AddressInput, b: AddressInput): boolean {
  return (
    a.phone.trim() === b.phone.trim() &&
    a.district === b.district &&
    a.upazila === b.upazila &&
    a.addressLine.trim() === b.addressLine.trim()
  );
}

function makeId(): string {
  try {
    if (isBrowser() && typeof crypto !== 'undefined' && crypto.randomUUID) {
      return crypto.randomUUID();
    }
  } catch {
    // fall through
  }
  return `addr-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

/** Read all saved addresses (newest first). Never throws. */
export function getSavedAddresses(): SavedAddress[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (a): a is SavedAddress =>
        !!a && typeof a.id === 'string' && typeof a.district === 'string' && typeof a.addressLine === 'string',
    );
  } catch {
    return [];
  }
}

function write(list: SavedAddress[]): SavedAddress[] {
  if (!isBrowser()) return list;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(list));
  } catch {
    // ignore quota / serialization errors — persistence is best-effort
  }
  return list;
}

/**
 * Save an address for reuse. If an equivalent address already exists it is
 * moved to the front (deduped) rather than duplicated. Returns the new list.
 */
export function saveAddress(input: AddressInput): SavedAddress[] {
  const existing = getSavedAddresses();
  const withoutDup = existing.filter((a) => !sameAddress(a, input));
  const entry: SavedAddress = { ...input, id: makeId() };
  return write([entry, ...withoutDup].slice(0, MAX_ADDRESSES));
}

/** Remove a saved address by id. Returns the new list. */
export function deleteAddress(id: string): SavedAddress[] {
  return write(getSavedAddresses().filter((a) => a.id !== id));
}

/** True if an equivalent address is already saved. */
export function isAddressSaved(input: AddressInput): boolean {
  return getSavedAddresses().some((a) => sameAddress(a, input));
}
