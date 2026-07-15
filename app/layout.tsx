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

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: 'website',
    siteName: site.name,
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
    url: site.url,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary',
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
  },
}

/** Organization structured data — kept in sync with content/site.ts. */
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: site.name,
  url: site.url,
  email: site.email,
  description: site.description,
  foundingDate: '2025-11',
  areaServed: ['United States', 'Canada', 'United Kingdom', 'New Zealand'],
  slogan: site.tagline,
  sameAs: [site.linkedin],
}

export const viewport: Viewport = {
  themeColor: '#09060F',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="bg-ink text-fg">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <PageTransitionProvider>
          <SmoothScrollProvider>
            <CustomCursor />
            <Navbar />
            {children}
            <Footer />
            <WhatsAppFloat />
            <Chatbot />
          </SmoothScrollProvider>
        </PageTransitionProvider>
      </body>
    </html>
  )
}
