'use client'
import { useCallback, useEffect } from 'react'
import { createPortal } from 'react-dom'

interface LightboxProps {
  images: string[]
  index: number
  alt: string
  onClose: () => void
  onNavigate: (nextIndex: number) => void
}

function CloseIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function ChevronIcon({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg
      aria-hidden="true"
      className={`h-6 w-6 ${direction === 'left' ? 'rotate-180' : ''}`}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="m9 6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function Lightbox({ images, index, alt, onClose, onNavigate }: LightboxProps) {
  const count = images.length
  const hasMany = count > 1

  const goPrev = useCallback(() => onNavigate((index - 1 + count) % count), [index, count, onNavigate])
  const goNext = useCallback(() => onNavigate((index + 1) % count), [index, count, onNavigate])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      else if (event.key === 'ArrowLeft' && hasMany) goPrev()
      else if (event.key === 'ArrowRight' && hasMany) goNext()
    }
    document.addEventListener('keydown', onKey)

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
    }
  }, [onClose, goPrev, goNext, hasMany])

  const buttonClass =
    'flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/20 backdrop-blur-sm transition-colors hover:bg-white/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-white'

  // Portal to <body>: the glass cards use backdrop-filter/transform, which would
  // otherwise trap this position:fixed overlay inside the card.
  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${alt} screenshot ${index + 1} of ${count}`}
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-mdb-blue/80 backdrop-blur-sm p-4 sm:p-8 animate-fade-in"
      onClick={onClose}
    >
      <button type="button" onClick={onClose} aria-label="Close" className={`${buttonClass} absolute right-4 top-4`}>
        <CloseIcon />
      </button>

      {hasMany && (
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation()
            goPrev()
          }}
          aria-label="Previous screenshot"
          className={`${buttonClass} absolute left-3 top-1/2 -translate-y-1/2 sm:left-6`}
        >
          <ChevronIcon direction="left" />
        </button>
      )}

      <figure
        className="flex max-h-full max-w-full flex-col items-center gap-3"
        onClick={(event) => event.stopPropagation()}
      >
        <img
          src={images[index]}
          alt={`${alt} screenshot ${index + 1}`}
          className="max-h-[82vh] max-w-[90vw] rounded-xl object-contain shadow-2xl ring-1 ring-white/20"
        />
        {hasMany && (
          <figcaption className="text-sm text-white/80">
            {index + 1} / {count}
          </figcaption>
        )}
      </figure>

      {hasMany && (
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation()
            goNext()
          }}
          aria-label="Next screenshot"
          className={`${buttonClass} absolute right-3 top-1/2 -translate-y-1/2 sm:right-6`}
        >
          <ChevronIcon direction="right" />
        </button>
      )}
    </div>,
    document.body
  )
}
