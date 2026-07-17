import type { Metadata, Viewport } from 'next'
import '@/styles/globals.css'
import { site } from '@/content/site'
import { SmoothScrollProvider } from '@/providers/SmoothScrollProvider'
import { CustomCursor } from '@/components/global/CustomCursor'
import { PageTransitionProvider } from '@/components/global/PageTransitionProvider'
import { Navbar } from '@/components/navigation/Navbar'
import { Footer } from '@/components/navigation/Footer'
import { WhatsAppFloat } from '@/components/global/WhatsAppFloat'
import { Chatbot } from '@/components/global/Chatbot'
import { ScrollReveal } from '@/components/global/ScrollReveal'

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Career Consulting & Job Placement`,
    template: `%s | ${site.name}`,
  },
  description:
    'InfoTech Placement LLC provides expert career consulting and job placement across the US, Canada, UK and New Zealand. Resume marketing, LinkedIn optimization, interview prep, and a written interview guarantee.',
  keywords: [
    'job placement',
    'career consulting',
    'resume marketing',
    'LinkedIn optimization',
    'interview preparation',
    'IT job placement',
    'job placement USA',
    'recruitment agency',
    'career counseling',
    'job placement Canada',
    'job placement UK',
    'job placement New Zealand',
    'InfoTech Placement',
    'career coaching',
    'resume writing',
    'job search assistance',
    'placement company',
    'tech recruitment',
    'software engineer placement',
    'international job placement',
    'interview guarantee',
    'ATS resume optimization',
    'career transformation',
    'non-IT placement',
    'placement with guarantee',
  ],
  icons: {
    icon: [
      { url: '/icon.png', type: 'image/png', sizes: '500x500' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: { url: '/icon.png', sizes: '500x500', type: 'image/png' },
    shortcut: '/icon.png',
  },
  openGraph: {
    type: 'website',
    siteName: site.name,
    title: `${site.name} | Career Consulting & Job Placement`,
    description:
      'Structured career consulting and job placement across US, Canada, UK & New Zealand — resume marketing, interview prep, and placement with a written interview guarantee.',
    url: site.url,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} | Career Consulting & Job Placement`,
    description:
      'Structured career consulting and job placement across US, Canada, UK & New Zealand — resume marketing, interview prep, and placement with a written interview guarantee.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

/** Organization structured data with logo for Google Knowledge Panel. */
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: site.name,
  url: site.url,
  email: site.email,
  telephone: site.phone,
  description:
    'Career consulting and placement company serving professionals across the US, Canada, UK and New Zealand with resume marketing, LinkedIn optimization, interview preparation and job placement.',
  foundingDate: '2025-11',
  areaServed: ['United States', 'Canada', 'United Kingdom', 'New Zealand'],
  slogan: site.tagline,
  sameAs: [site.linkedin],
  logo: {
    '@type': 'ImageObject',
    url: `${site.url}/images/logo.png`,
    width: '500',
    height: '500',
  },
  image: `${site.url}/opengraph-image`,
  address: {
    '@type': 'PostalAddress',
    streetAddress: '30 Gould St STE 300',
    addressLocality: 'Sheridan',
    addressRegion: 'WY',
    postalCode: '82801',
    addressCountry: 'US',
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: site.phone,
      contactType: 'customer service',
      availableLanguage: ['English'],
      hoursAvailable: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday',
        ],
        opens: '00:00',
        closes: '23:59',
      },
    },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Career Placement Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Resume Optimization & Branding' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'LinkedIn Profile Optimization' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Resume Marketing' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Interview Preparation' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Job Placement with Interview Guarantee' } },
    ],
  },
}

/** WebSite schema for Google sitelinks search. */
const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: site.name,
  url: site.url,
  description: site.description,
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${site.url}/blog?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
}

export const viewport: Viewport = {
  themeColor: '#09060F',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head />
      <body className="bg-ink text-fg">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <PageTransitionProvider>
          <SmoothScrollProvider>
            <CustomCursor />
            <Navbar />
            {children}
            <Footer />
            <WhatsAppFloat />
            <Chatbot />
            <ScrollReveal />
          </SmoothScrollProvider>
        </PageTransitionProvider>
      </body>
    </html>
  )
}
