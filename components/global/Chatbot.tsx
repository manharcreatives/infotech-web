'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { X, Send, ChevronRight } from 'lucide-react'
import { site } from '@/content/site'

interface Message {
  id: number
  text: string
  sender: 'bot' | 'user'
  timestamp: Date
  topics?: Topic[]
  action?: { label: string; href: string }
}

interface Topic {
  id: string
  label: string
  keywords: string[]
  answer: string
  action?: { label: string; href: string }
}

/**
 * Rule-based chatbot for InfoTech Placement.
 * Knowledge base with keyword scoring, topic chips, CTA actions,
 * and a contextual bubble that surfaces beside whichever section the
 * visitor is currently reading — never a permanently fixed corner icon.
 */

const topics: Topic[] = [
  {
    id: 'services',
    label: 'Our Services',
    keywords: ['service', 'offer', 'provide', 'what do you do', 'help'],
    answer: `We offer 7 core services:\n\n• Resume Optimization & Branding\n• LinkedIn Profile Enhancement\n• Resume Marketing to employers\n• Interview Preparation\n• Job Search Assistance\n• Career Counseling\n• Placement & Onboarding Support\n\nAll available across US, Canada, UK & New Zealand.`,
    action: { label: 'See all services', href: '/services' },
  },
  {
    id: 'guarantee',
    label: 'Guarantees',
    keywords: ['guarantee', 'money back', 'refund', 'job guarantee', 'safe', 'risk'],
    answer: `Yes! We offer:\n\n• 120 Working Days Job Guarantee\n• Flat 60% Refund on Upfront Amount\n• All terms in writing before you enroll\n\nWe're confident enough in our process to put it in writing.`,
    action: { label: 'See plan details', href: '/usplan' },
  },
  {
    id: 'process',
    label: 'How It Works',
    keywords: ['process', 'how', 'work', 'step', 'journey', 'method', 'what happens'],
    answer: `Our 11-step journey:\n\n1. Registration & Profile Submission\n2. Career Consultation\n3. Resume Review & Optimization\n4. LinkedIn Profile Enhancement\n5. Opportunity Matching\n6. Resume Marketing & Employer Outreach\n7. Interview Preparation\n8. Interview Process\n9. Offer & Negotiation Support\n10. Placement & Joining Support\n11. Post-Placement Career Support\n\nEvery step is transparent and tracked.`,
    action: { label: 'See the full process', href: '/process' },
  },
  {
    id: 'countries',
    label: 'Countries We Serve',
    keywords: ['country', 'countries', 'where', 'location', 'us', 'canada', 'uk', 'united states', 'new zealand', 'international'],
    answer: `We serve 4 countries:\n\n🇺🇸 United States\n🇨🇦 Canada\n🇬🇧 United Kingdom\n🇳🇿 New Zealand\n\nPlacements are made on full-time payroll structures appropriate to each country.`,
  },
  {
    id: 'interview',
    label: 'Interview Prep',
    keywords: ['interview', 'mock', 'prepare', 'preparation', 'coaching', 'technical'],
    answer: `Our interview preparation includes:\n\n• Mock interviews\n• Technical interview preparation\n• Behavioral coaching\n• HR round preparation\n• Confidence-building sessions\n\nTailored to the exact roles you're pursuing.`,
    action: { label: 'Learn about our process', href: '/process' },
  },
  {
    id: 'resume',
    label: 'Resume & LinkedIn',
    keywords: ['resume', 'cv', 'profile', 'linkedin', 'branding', 'rewrite'],
    answer: `We offer comprehensive resume and LinkedIn services:\n\n• Resume rebuild to recruiter standards\n• ATS-friendly formatting\n• Keyword optimization\n• LinkedIn profile alignment\n• Achievement-based content\n\nYour resume is often your first impression — we make it count.`,
    action: { label: 'See our services', href: '/services' },
  },
  {
    id: 'contact',
    label: 'Contact Us',
    keywords: ['contact', 'reach', 'email', 'phone', 'call', 'talk', 'speak', 'consult', 'book', 'appointment'],
    answer: `You can reach us:\n\n📧 Email: ${site.email}\n📱 Phone: ${site.phone}\n💬 WhatsApp us anytime\n\nWe operate 24/7 across all 4 countries.`,
    action: { label: 'Book a free consultation', href: '/contact' },
  },
  {
    id: 'about',
    label: 'About InfoTech LLC',
    keywords: ['who', 'about', 'company', 'infotech', 'info tech', 'founded', 'what is'],
    answer: `InfoTech Placement LLC is a career consulting and placement company founded in November 2025.\n\nWe help professionals across US, Canada, UK & New Zealand with:\n\n• Career transformation\n• Resume & LinkedIn branding\n• Active employer marketing\n• Interview preparation\n• Full placement support\n\nWe don't just place candidates — we build careers.`,
    action: { label: 'Read our story', href: '/about' },
  },
  {
    id: 'sectors',
    label: 'IT & Non-IT',
    keywords: ['it', 'non-it', 'both', 'sector', 'industry', 'tech', 'non tech', 'software', 'finance', 'healthcare'],
    answer: `Yes! We serve both IT and Non-IT sectors:\n\n💻 IT: Software, Data, Cloud, QA, Cybersecurity, DevOps\n📊 Non-IT: Finance, Healthcare, HR, Sales, Marketing, Engineering, Customer Service\n\nSame program, same commitment, same results across all fields.`,
  },
  {
    id: 'refer',
    label: 'Refer & Earn',
    keywords: ['refer', 'referral', 'earn', 'bonus', 'recommend'],
    answer: `Earn up to $300 for every referral!\n\n• Refer someone you know\n• If they enroll, you earn a bonus\n• Simple process, real rewards\n\nGood careers travel by word of mouth.`,
    action: { label: 'Refer now', href: '/refer' },
  },
]

const greetings = ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 'howdy', 'sup']
const thanks = ['thank', 'thanks', 'thx', 'appreciate', 'great', 'awesome']

function findBestTopic(input: string): Topic | null {
  const lower = input.toLowerCase().trim()
  let best: Topic | null = null
  let bestScore = 0

  for (const topic of topics) {
    const score = topic.keywords.reduce((acc, kw) => {
      return acc + (lower.includes(kw) ? 1 : 0)
    }, 0)
    if (score > bestScore) {
      bestScore = score
      best = topic
    }
  }

  return bestScore > 0 ? best : null
}

function getResponse(input: string): { text: string; topics?: Topic[]; action?: { label: string; href: string } } {
  const lower = input.toLowerCase().trim()

  if (greetings.some((g) => lower.includes(g)) && lower.length < 20) {
    return {
      text: `Hi there! 👋 Welcome to InfoTech Placement LLC.\n\nTap a topic below or type your question:`,
      topics: topics.slice(0, 6),
    }
  }

  if (thanks.some((t) => lower.includes(t))) {
    return {
      text: `You're welcome! 😊 Anything else I can help with?\n\nYou can also reach us directly:\n📧 ${site.email}\n📱 ${site.phone}`,
      topics: topics.slice(0, 4),
    }
  }

  const pricingKeywords = ['price', 'pricing', 'cost', 'fee', 'plan', 'how much', 'charge', 'affordable']
  if (pricingKeywords.some((kw) => lower.includes(kw))) {
    return {
      text: `We have plans starting from $1,500:\n\n🇺🇸 US Plans:\n• Basic — $1,500\n• Advance — Custom (Most Popular)\n• Premium — Custom\n\n🇨🇦 Canada Plans:\n• Professional — $1,499\n• Elite — $2,499\n\nAll plans include a 120 Working Days Job Guarantee and 60% refund policy.`,
    }
  }

  const topic = findBestTopic(input)
  if (topic) {
    return { text: topic.answer, action: topic.action }
  }

  return {
    text: `I can help you with:\n\n• Services & programs\n• The 11-step process\n• Countries served\n• Interview preparation\n• Contact information\n\nTap a topic below or type your question:`,
    topics: topics.slice(0, 6),
  }
}

interface ActiveBubble {
  key: string
  side: 'left' | 'right'
  top: number
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeBubble, setActiveBubble] = useState<ActiveBubble | null>(null)
  const [isDismissed, setIsDismissed] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      text: `Hi! 👋 I'm the InfoTech Placement LLC assistant.\n\nHow can I help you today?`,
      sender: 'bot',
      timestamp: new Date(),
      topics: topics.slice(0, 6),
    },
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const bubbleTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const scrollStopTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const lastShownRef = useRef(0)
  const shownCountRef = useRef(0)
  const lastSectionKeyRef = useRef<string | null>(null)

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  const clearBubbleTimeout = useCallback(() => {
    if (bubbleTimeoutRef.current) {
      clearTimeout(bubbleTimeoutRef.current)
      bubbleTimeoutRef.current = null
    }
  }, [])

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300)
      clearBubbleTimeout()
    }
  }, [isOpen, clearBubbleTimeout])

  const effectiveActiveBubble = isOpen ? null : activeBubble

  /* Rather than sitting fixed in one corner forever, the bot surfaces as a
     small dismissible bubble next to whichever content section the visitor
     is currently reading — alternating sides down the page — and only once
     scrolling has genuinely paused (never mid-scroll). Capped per visit so
     it never nags. Hero is skipped so it doesn't cover hero CTAs. */
  useEffect(() => {
    if (isOpen) return

    const getCurrentSection = (): ActiveBubble | null => {
      const sections = Array.from(
        document.querySelectorAll<HTMLElement>('main > section')
      ).filter((el) => el.id !== 'site-hero')

      for (let i = 0; i < sections.length; i++) {
        const rect = sections[i].getBoundingClientRect()
        if (rect.top < window.innerHeight * 0.55 && rect.bottom > 140) {
          return {
            key: sections[i].id || `section-${i}`,
            side: i % 2 === 0 ? 'right' : 'left',
            top: 30 + ((i * 17) % 40),
          }
        }
      }
      return null
    }

    const onScroll = () => {
      const currentKey = getCurrentSection()?.key ?? null
      if (currentKey !== lastSectionKeyRef.current) {
        lastSectionKeyRef.current = currentKey
        if (!currentKey) {
          clearBubbleTimeout()
          setActiveBubble(null)
        }
      }

      if (scrollStopTimerRef.current) clearTimeout(scrollStopTimerRef.current)
      scrollStopTimerRef.current = setTimeout(() => {
        if (isOpen) return
        if (shownCountRef.current >= 3) return
        if (Date.now() - lastShownRef.current < 25000) return

        const section = getCurrentSection()
        if (!section) return

        shownCountRef.current++
        lastShownRef.current = Date.now()
        setIsDismissed(false)
        setActiveBubble(section)

        clearBubbleTimeout()
        bubbleTimeoutRef.current = setTimeout(() => setActiveBubble(null), 7000)
      }, 650)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (scrollStopTimerRef.current) clearTimeout(scrollStopTimerRef.current)
      clearBubbleTimeout()
    }
  }, [isOpen, clearBubbleTimeout])

  const handleSend = useCallback((text?: string) => {
    const msg = text || input.trim()
    if (!msg) return

    const userMsg: Message = {
      id: Date.now(),
      text: msg,
      sender: 'user',
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setIsTyping(true)

    setTimeout(() => {
      const response = getResponse(msg)
      const botMsg: Message = {
        id: Date.now() + 1,
        text: response.text,
        sender: 'bot',
        timestamp: new Date(),
        topics: response.topics,
        action: response.action,
      }
      setMessages((prev) => [...prev, botMsg])
      setIsTyping(false)
    }, 550 + Math.random() * 300)
  }, [input])

  return (
    <>
      {/* Contextual bubble — surfaces next to whichever section the visitor
          is currently reading instead of sitting fixed in one corner. */}
      {effectiveActiveBubble && !isOpen && !isDismissed && (
        <div
          key={effectiveActiveBubble.key}
          style={{ top: `${effectiveActiveBubble.top}%` }}
          className={`chat-bubble-in fixed z-[100] flex items-center gap-3 ${
            effectiveActiveBubble.side === 'left' ? 'left-4 sm:left-6' : 'right-4 flex-row-reverse sm:right-6'
          }`}
        >
          <div className="flex items-center gap-2 rounded-2xl border border-line bg-surface px-4 py-3.5 shadow-lg shadow-black/30">
            <span className="text-[0.95rem] text-fg-2">
              Need help? <span className="text-fg">👋</span>
            </span>
            <button
              onClick={() => {
                clearBubbleTimeout()
                setIsDismissed(true)
              }}
              aria-label="Dismiss"
              className="grid size-5 shrink-0 place-items-center rounded-full text-fg-3 transition-colors hover:text-fg"
            >
              <X className="size-3" />
            </button>
          </div>
          <button
            onClick={() => {
              clearBubbleTimeout()
              setIsOpen(true)
            }}
            aria-label="Open chat"
            className="flex size-16 shrink-0 items-center justify-center rounded-full bg-brand shadow-lg shadow-black/30 transition-all duration-300 hover:scale-110 hover:shadow-xl active:scale-95"
          >
            <Image src="/images/infotech-bot.png" alt="InfoTech Bot" width={56} height={56} className="size-14 rounded-full object-cover" />
          </button>
        </div>
      )}

      {/* Chat window */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="InfoTech Placement LLC chat"
          className="floating-safe-bottom fixed right-4 z-[10001] flex flex-col overflow-hidden rounded-2xl border border-line bg-ink-2 shadow-2xl shadow-black/50 sm:right-6"
          style={{ width: 'min(440px, calc(100vw - 2rem))', height: 'min(660px, calc(100dvh - 4rem))' }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 bg-surface px-5 py-4 shrink-0">
            <div className="grid size-11 shrink-0 place-items-center overflow-hidden rounded-full bg-brand/20">
              <Image src="/images/infotech-bot.png" alt="InfoTech Bot" width={44} height={44} className="size-11 rounded-full object-cover" />
            </div>
            <div className="flex-1">
              <p className="text-base font-semibold text-fg">InfoTech LLC Assistant</p>
              <p className="text-xs text-success">● Online now</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
              className="grid size-8 place-items-center rounded-full text-fg-3 transition-colors hover:bg-line hover:text-fg"
            >
              <X className="size-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 space-y-4 overflow-y-auto px-5 py-4" aria-live="polite">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] whitespace-pre-line rounded-2xl px-4 py-3 text-[0.925rem] leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-brand text-white rounded-br-md'
                      : 'bg-surface text-fg-2 rounded-bl-md border border-line'
                  }`}
                >
                  {msg.text}

                  {/* CTA action button */}
                  {msg.action && (
                    <a
                      href={msg.action.href}
                      className="mt-3 flex items-center gap-1.5 rounded-lg border border-brand/30 bg-brand/10 px-3 py-2 text-xs font-medium text-brand transition-colors hover:bg-brand/20"
                    >
                      {msg.action.label}
                      <ChevronRight className="size-3" />
                    </a>
                  )}

                  {/* Topic chips */}
                  {msg.topics && msg.topics.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {msg.topics.map((topic) => (
                        <button
                          key={topic.id}
                          onClick={() => handleSend(topic.label)}
                          className="rounded-full border border-line bg-ink/50 px-3 py-1.5 text-xs text-fg-2 transition-colors hover:border-brand hover:text-fg"
                        >
                          {topic.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="rounded-2xl rounded-bl-md bg-surface border border-line px-4 py-3">
                  <div className="flex gap-1">
                    <span className="size-2 animate-bounce rounded-full bg-fg-3 [animation-delay:-0.3s]" />
                    <span className="size-2 animate-bounce rounded-full bg-fg-3 [animation-delay:-0.15s]" />
                    <span className="size-2 animate-bounce rounded-full bg-fg-3" />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="flex items-center gap-2 border-t border-line px-4 py-3 shrink-0">
            <div className="flex-1 rounded-xl border border-line bg-surface/60 px-3.5 py-2.5 transition-colors focus-within:border-brand/60">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type a message..."
                className="chat-input w-full bg-transparent text-[0.925rem] text-fg outline-none placeholder:text-fg-3"
              />
            </div>
            <button
              onClick={() => handleSend()}
              disabled={!input.trim()}
              aria-label="Send message"
              className="grid size-10 shrink-0 place-items-center rounded-full bg-brand text-white transition-all duration-300 hover:bg-brand-hover disabled:opacity-40 disabled:hover:bg-brand"
            >
              <Send className="size-4" />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
