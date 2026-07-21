import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function cleanPhoneNumber(phone: string): string {
  if (!phone) return ''

  const cleaned = phone.replace(/[^\d+]/g, '')

  if (cleaned.startsWith('+')) return cleaned

  if (/^[6-9]\d{9}$/.test(cleaned)) return `+91${cleaned}`

  return cleaned
}
