import { redirect } from 'next/navigation'

/**
 * Employer-facing content removed site-wide at client direction
 * (July 2026). This route redirects to Services to preserve any
 * existing links. The 8-step client engagement process and employer
 * service descriptions are archived in docs/ project history if the
 * client reinstates an employer offering later.
 */
export default function EmployersRedirect() {
  redirect('/services')
}
