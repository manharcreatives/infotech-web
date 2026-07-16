'use client'

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { VideoExpandReveal } from '@/components/motion/VideoExpandReveal'

function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (callback) => {
      const mq = window.matchMedia(query)
      mq.addEventListener('change', callback)
      return () => mq.removeEventListener('change', callback)
    },
    () => window.matchMedia(query).matches,
    () => false,
  )
}

export function VideoPin() {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  const playingRef = useRef(false)
  const hasAutoPlayedFwdRef = useRef(false)
  const mobileContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    playingRef.current = playing
  }, [playing])

  const tryPlay = useCallback(() => {
    const video = videoRef.current
    if (!video) return
    video.play().then(() => {
      setPlaying(true)
      playingRef.current = true
      hasAutoPlayedFwdRef.current = true
    }).catch(() => {})
  }, [])

  const tryPauseAndReset = useCallback(() => {
    const video = videoRef.current
    if (!video) return
    video.pause()
    video.currentTime = 0
    setPlaying(false)
    playingRef.current = false
    hasAutoPlayedFwdRef.current = false
  }, [])

  const handlePlay = useCallback(() => {
    tryPlay()
  }, [tryPlay])

  const handleScrollUpdate = useCallback((progress: number, direction: number) => {
    if (direction > 0 && !hasAutoPlayedFwdRef.current) {
      tryPlay()
    } else if (direction < 0 && progress < 0.05 && hasAutoPlayedFwdRef.current) {
      tryPauseAndReset()
    }
  }, [tryPlay, tryPauseAndReset])

  useEffect(() => {
    if (!isMobile) return
    const el = mobileContainerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !playingRef.current) {
            tryPlay()
          } else if (!entry.isIntersecting && playingRef.current) {
            tryPauseAndReset()
          }
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [isMobile, tryPlay, tryPauseAndReset])

  if (isMobile) {
    return (
      <div ref={mobileContainerRef} className="h-screen w-full overflow-hidden relative">
        <video
          ref={videoRef}
          src="https://res.cloudinary.com/rc8wd02c/video/upload/v1783963445/infotechplacement_t4hkro.mp4"
          playsInline
          muted
          loop
          className="absolute inset-0 size-full object-cover"
        />
        {!playing && <PlayOverlay onPlay={handlePlay} />}
      </div>
    )
  }

  return (
    <VideoExpandReveal
      startSize={6}
      pinDistance="4000px"
      overlay={!playing ? <PlayOverlay onPlay={handlePlay} /> : undefined}
      onScrollUpdate={handleScrollUpdate}
    >
      <video
        ref={videoRef}
        src="https://res.cloudinary.com/rc8wd02c/video/upload/v1783963445/infotechplacement_t4hkro.mp4"
        playsInline
        muted
        loop
        className="absolute inset-0 size-full object-cover"
      />

      {!playing && (
        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
          <div className="spin-circle md:w-[15%] w-[30%]">
            <CircleSvg />
          </div>
        </div>
      )}

      {playing && (
        <>
          <div className="pointer-events-none absolute left-0 top-0 z-10 size-full">
            <div className="flex h-full flex-col items-start justify-center px-5 sm:px-10">
              <h1 className="hero-heading text-white">
                Career<b className="text-gradient-brand">s</b>
              </h1>
              <h2 className="hero-heading text-white/80">
                Built Here
              </h2>
              <p className="mt-6 max-w-64 font-sans text-xs uppercase tracking-[0.2em] text-white/60">
                IT &amp; Non-IT placement &middot; four countries
              </p>
            </div>
          </div>

          <h1 className="pointer-events-none absolute bottom-5 right-5 z-10 text-white/40" style={{fontSize: 'clamp(1rem,4vw,2.5rem)', fontWeight: 900, textTransform: 'uppercase', lineHeight: 0.9, letterSpacing: '-0.04em'}}>
            Infotec<span className="text-gradient-brand">h</span>
          </h1>
        </>
      )}
    </VideoExpandReveal>
  )
}

/* ------------------------------------------------------------------ */
/* Play overlay — click to start video                                */
/* ------------------------------------------------------------------ */
function PlayOverlay({ onPlay }: { onPlay: () => void }) {
  return (
    <button
      type="button"
      onClick={onPlay}
      className="absolute inset-0 z-20 flex cursor-pointer items-center justify-center"
    >
      <div className="flex size-[9vw] items-center justify-center rounded-full bg-white/10 backdrop-blur-xl md:scale-100 scale-200">
        <svg viewBox="0 0 24 24" className="ml-[0.5vw] size-[3vw] fill-white">
          <polygon points="6,4 20,12 6,20" />
        </svg>
      </div>
    </button>
  )
}

/* ------------------------------------------------------------------ */
/* Spinning circle text SVG                                             */
/* ------------------------------------------------------------------ */
function CircleSvg() {
  return (
    <svg viewBox="0 0 200 200" className="size-full animate-spin-slow">
      <defs>
        <path
          id="circle-path"
          d="M 100, 100 m -75, 0 a 75, 75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
        />
      </defs>
      <text
        fill="white"
        fontSize="10"
        fontFamily="sans-serif"
        fontWeight="400"
        letterSpacing="4"
      >
        <textPath href="#circle-path" startOffset="0%">
          INFOTECH PLACEMENT LLC ● FOUR COUNTRIES ● IT AND NON-IT ●
        </textPath>
      </text>
      <circle cx="100" cy="100" r="3" fill="white" className="origin-center" />
    </svg>
  )
}
