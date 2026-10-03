/**
 * VIP Access Control System & Whitelist Database
 * 100 Preset Authorized VIP Gmail accounts + Admin Management
 */

const STORAGE_KEY = 'omni_vip_whitelist_db';

// Generate default 100 VIP Gmail accounts: omni.vip001@gmail.com to omni.vip100@gmail.com
export const DEFAULT_VIP_ACCOUNTS: string[] = [
  // User's own registered account
  'seyhasolo200815@gmail.com',
  // 100 preset VIP accounts
  ...Array.from({ length: 100 }, (_, i) => {
    const num = String(i + 1).padStart(3, '0');
    return `omni.vip${num}@gmail.com`;
  }),
];

/**
 * Retrieve current authorized VIP Gmail whitelist from localStorage or defaults
 */
export function getVipWhitelist(): string[] {
  if (typeof window === 'undefined') return DEFAULT_VIP_ACCOUNTS;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map((e) => String(e).trim().toLowerCase());
      }
    }
  } catch (err) {
    console.error('Error reading VIP whitelist:', err);
  }
  return DEFAULT_VIP_ACCOUNTS;
}

/**
 * Save updated VIP whitelist to localStorage
 */
export function saveVipWhitelist(list: string[]): void {
  if (typeof window === 'undefined') return;
  try {
    const cleaned = Array.from(
      new Set(list.map((e) => String(e).trim().toLowerCase()).filter(Boolean))
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cleaned));
  } catch (err) {
    console.error('Error saving VIP whitelist:', err);
  }
}

/**
 * Reset VIP whitelist back to default 100 accounts
 */
export function resetVipWhitelist(): string[] {
  saveVipWhitelist(DEFAULT_VIP_ACCOUNTS);
  return DEFAULT_VIP_ACCOUNTS;
}

/**
 * Check if a given email is authorized in the VIP whitelist (Case-Insensitive)
 */
export function isEmailAuthorizedVip(email: string): boolean {
  if (!email) return false;
  const normalized = email.trim().toLowerCase();
  const currentList = getVipWhitelist();
  return currentList.some((item) => item.toLowerCase() === normalized);
}

/**
 * Add a new email to the VIP whitelist
 */
export function addEmailToVipWhitelist(email: string): { success: boolean; message: string; updatedList: string[] } {
  const normalized = email.trim().toLowerCase();
  if (!normalized || !normalized.includes('@') || !normalized.includes('.')) {
    return { success: false, message: 'ទម្រង់ Gmail មិនត្រឹមត្រូវ', updatedList: getVipWhitelist() };
  }
  const current = getVipWhitelist();
  if (current.includes(normalized)) {
    return { success: false, message: 'Gmail នេះមានក្នុងបញ្ជីរួចរាល់ហើយ', updatedList: current };
  }
  const updated = [normalized, ...current];
  saveVipWhitelist(updated);
  return { success: true, message: 'បានបញ្ចូលជោគជ័យ', updatedList: updated };
}

/**
 * Remove an email from the VIP whitelist
 */
export function removeEmailFromVipWhitelist(email: string): string[] {
  const normalized = email.trim().toLowerCase();
  const current = getVipWhitelist();
  const updated = current.filter((e) => e !== normalized);
  saveVipWhitelist(updated);
  return updated;
}
