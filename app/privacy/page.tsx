import { redirect } from 'next/navigation'

/**
 * The Privacy Policy moved to /privacy-policy (Phase 3 §4.10 URL spec).
 * This route exists only to preserve any links to the old path.
 */
export default function PrivacyRedirect() {
  redirect('/privacy-policy')
}
