import { MAX_CONTACTS, STORAGE_KEYS } from "../constants";

export type Contact = { name: string; phone: string };

/** localStorage may be blocked (private mode, kiosk). Every access is guarded. */
export function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw === null ? fallback : (JSON.parse(raw) as T);
  } catch {
    return fallback;
  }
}
export function persist(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable */
  }
}

export const getContacts = () => load<Contact[]>(STORAGE_KEYS.CONTACTS, []);
export const saveContacts = (contacts: Contact[]) => persist(STORAGE_KEYS.CONTACTS, contacts.slice(0, MAX_CONTACTS));
export const getMyName = () => load(STORAGE_KEYS.MY_NAME, "");
export const saveMyName = (name: string) => persist(STORAGE_KEYS.MY_NAME, name);

export const cleanPhone = (phone: string) => phone.replace(/\D/g, "");
export const telLink = (phone: string) => `tel:+${cleanPhone(phone)}`;
export const waLink = (phone: string, text: string) =>
  `https://wa.me/${cleanPhone(phone)}?text=${encodeURIComponent(text)}`;
