import { MAX_CONTACTS, STORAGE_KEYS } from "../constants";

export type Contact = { name: string; phone: string };
const MAX_NAME = 80;
const MIN_INTERNATIONAL_DIGITS = 10;
const MAX_INTERNATIONAL_DIGITS = 15;
const INDIAN_MOBILE = /^[6-9]\d{9}$/;
const INTERNATIONAL = /^[1-9]\d+$/;

export function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw === null ? fallback : (JSON.parse(raw) as T);
  } catch {
    return fallback;
  }
}
export function persist(key: string, value: unknown): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}
export const cleanPhone = (phone: string) => phone.replace(/\D/g, "");
export function normalizePhone(value: string): string | null {
  if (!/^\+?[\d\s()-]+$/.test(value.trim())) return null;
  let digits = cleanPhone(value);
  if (!value.trim().startsWith("+") && INDIAN_MOBILE.test(digits)) digits = `91${digits}`;
  if (
    digits.length < MIN_INTERNATIONAL_DIGITS ||
    digits.length > MAX_INTERNATIONAL_DIGITS ||
    !INTERNATIONAL.test(digits)
  )
    return null;
  return digits;
}
export function validContacts(value: unknown): Contact[] {
  if (!Array.isArray(value)) return [];
  const seen = new Set<string>();
  const result: Contact[] = [];
  for (const item of value) {
    if (!item || typeof item !== "object" || typeof item.name !== "string" || typeof item.phone !== "string") continue;
    const name = item.name.trim().slice(0, MAX_NAME);
    const phone = normalizePhone(item.phone);
    if (name && phone && !seen.has(phone)) {
      seen.add(phone);
      result.push({ name, phone });
    }
  }
  return result.slice(0, MAX_CONTACTS);
}
export const getContacts = () => validContacts(load<unknown>(STORAGE_KEYS.CONTACTS, []));
export const saveContacts = (contacts: Contact[]) => persist(STORAGE_KEYS.CONTACTS, validContacts(contacts));
export const getMyName = () => {
  const value = load<unknown>(STORAGE_KEYS.MY_NAME, "");
  return typeof value === "string" ? value.slice(0, MAX_NAME) : "";
};
export const saveMyName = (name: string) => persist(STORAGE_KEYS.MY_NAME, name.slice(0, MAX_NAME));
export const telLink = (phone: string) => `tel:+${cleanPhone(phone)}`;
export const waLink = (phone: string, text: string) =>
  `https://wa.me/${cleanPhone(phone)}?text=${encodeURIComponent(text)}`;
