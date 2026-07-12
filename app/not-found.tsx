import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,black_25%,transparent_75%)]" />
      <div className="orb left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 bg-brand/16" />
      <p className="text-stroke relative font-display text-[10rem] font-bold leading-none md:text-[16rem]">
        404
      </p>
      <p className="relative mt-4 text-fg-2">This page got placed somewhere else.</p>
      <div className="relative mt-8 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/"
          className="rounded-full bg-brand px-7 py-3.5 text-sm font-medium text-white transition-colors duration-300 hover:bg-brand-hover"
        >
          Go home
        </Link>
        <Link
          href="/contact"
          className="rounded-full border border-line px-7 py-3.5 text-sm font-medium text-fg-2 transition-colors duration-300 hover:text-fg"
        >
          Contact us
        </Link>
      </div>
    </main>
  )
}
