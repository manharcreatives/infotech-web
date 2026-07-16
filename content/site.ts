/**
 * ─────────────────────────────────────────────────────────────────
 * InfoTech Placement — Master site content
 *
 * Single source of truth for all user-facing copy.
 * Ground truth: four countries (US, Canada, UK, New Zealand),
 * founded November 2025.
 *
 * CONTENT HIERARCHY (Phase 3 client direction):
 *  1. Placement and career transformation lead.
 *  2. The Interview Guarantee is proof of process confidence,
 *     a milestone on the path to placement, not the destination.
 *  3. Post-placement support appears in every major section.
 *
 * CLIENT-DIRECTED OVERRIDES (confirmed via Manhar Creatives, July 2026):
 *  - Testimonial candidate names AND positions may be published
 *    (overrides SRS §8.1 for candidate names; staff names still removed).
 *  - Referral bonus "up to $300" may be published (overrides SRS §5.6.2).
 *
 * STILL FLAGGED:
 *  - [STAT] figures pending written verification (SRS B-4).
 *  - Employer names pending written substantiation (SRS B-5);
 *    logo assets pending.
 *  - email / phone placeholders pending client assets (B-7).
 * ─────────────────────────────────────────────────────────────────
 */

export const site = {
  name: 'InfoTech Placement LLC',
  tagline: 'From resume to offer letter.',
  description:
    'Career consulting and placement across the US, Canada, UK and New Zealand: a structured path from resume to full-time role, with support after you start.',
  url: 'https://infotechplacement.com',
  // [PENDING: SRS B-7] business email + phone to be confirmed by client
  email: 'info@infotechplacement.com',
  phone: '+1 240 212 5743',
  linkedin: 'https://www.linkedin.com/company/infotech-placement/',
  address: '30 Gould St STE 300, Sheridan, WY 82801',
  coordinates: { lat: 44.7978, lng: -106.9574 },
}

/**
 * LOCKED (SRS §4.1): exactly five primary destinations —
 * Home (wordmark) + the four links below + one CTA button.
 * Do not add a sixth item. New pages surface via footer or in-page links.
 */
export const navLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Process', href: '/process' },
  { label: 'Services', href: '/services' },
  { label: 'Contact Us', href: '/contact' },
]

/**
 * Rotating words after the "EVERY CANDIDATE" prefix in the hero.
 * "Placed." is deliberately excluded: the written guarantee covers the
 * interview milestone, and this line must stay a true universal claim.
 * Placement leads everywhere else on the page.
 */
export const heroWords = ['Prepared.', 'Marketed.', 'Interviewed.']

export const trustedRoles = [
  'Software Engineers',
  'Data Analysts',
  'Cloud & DevOps',
  'Finance Professionals',
  'Healthcare Administrators',
  'HR Specialists',
  'Sales & Marketing',
  'Project Managers',
  'QA Engineers',
  'Customer Success',
  'Business Analysts',
  'Executive Leadership',
]

export const statement =
  'Most agencies stop at the submission. We enroll you into a structured program: consulting, branding, marketing, preparation. Then we stay through the interview, the offer, and your first months in the role. Placement is the destination. Everything else is the route.'

/** Client-supplied brand lines (July 2026 content pack). */
export const motto =
  'Connecting Talent with Opportunity Across the USA, Canada, UK & New Zealand.'

export const mission =
  'To connect exceptional talent with outstanding career opportunities across the USA, Canada, the UK and New Zealand, empowering professionals through personalized guidance, branding and placement, while helping businesses grow through the power of the right talent.'

export const vision =
  'To become one of the most trusted global recruitment and placement partners: a hiring ecosystem that is efficient, transparent and rewarding for employers and job seekers alike.'

export const promise =
  "We don't just place candidates, we build careers. We don't just fill vacancies, we create opportunities for growth, success, and a brighter future."

export const whatDrivesUs = [
  'Connecting top talent with leading employers',
  'Empowering careers across four countries',
  'Delivering personalized recruitment solutions',
  'Building long-term professional relationships',
  'Creating success stories every day',
]

/** The client's eight core values (July 2026 content pack). */
export const coreValues = [
  { title: 'Integrity', description: 'Every interaction handled with honesty, transparency and professionalism.' },
  { title: 'Excellence', description: 'High-quality recruitment solutions and exceptional service, every time.' },
  { title: 'People First', description: 'The goals of our candidates and clients come before our own metrics.' },
  { title: 'Commitment', description: 'Dedicated through every stage of the journey: until placement, and after it.' },
  { title: 'Innovation', description: 'Modern recruitment strategy and technology, applied to improve real hiring outcomes.' },
  { title: 'Collaboration', description: 'Strong relationships with candidates, clients and partners. Success is shared.' },
  { title: 'Diversity & Inclusion', description: 'Diverse workplaces foster innovation, creativity and long-term success.' },
  { title: 'Continuous Growth', description: 'Learning, development and advancement for every individual we support.' },
]

/** Home-page bento preview (the deep-dive lives on /services). */
export const services = [
  {
    id: '01',
    title: 'Resume Marketing & Placement',
    description:
      'Your profile, actively marketed to employers in four countries: followed through past the interview, to the offer.',
    tags: ['Candidates', 'Interview Guarantee'],
    featured: true,
  },
  {
    id: '02',
    title: 'Resume & LinkedIn Branding',
    description:
      'Recruiter-grade rewrites of your resume and LinkedIn profile, built around the roles you actually want.',
    tags: ['Resume', 'LinkedIn'],
  },
  {
    id: '03',
    title: 'Interview Preparation',
    description:
      'Technical and mock interview sessions with structured feedback: walk in knowing the format, not guessing it.',
    tags: ['Mock rounds', 'Technical'],
  },
  {
    id: '04',
    title: 'Career Counseling',
    description:
      'One-on-one guidance on role, market and trajectory, before a single application goes out.',
    tags: ['Strategy', '1-on-1'],
  },
  {
    id: '05',
    title: 'Placement & Onboarding Support',
    description:
      'Offer evaluation, negotiation guidance and joining logistics: supported through your start date and beyond.',
    tags: ['Offers', 'Onboarding'],
  },
]

/**
 * Home-page method: the complete arc in seven steps, from assessment
 * to placement and post-placement support (client-directed structure).
 */
export const processSteps = [
  {
    number: '01',
    title: 'Profile Assessment',
    description:
      'We evaluate your resume, skills and career goals to build your professional profile: the foundation everything else stands on.',
  },
  {
    number: '02',
    title: 'Resume & LinkedIn Optimization',
    description:
      'Our specialists craft an ATS-ready resume and a LinkedIn presence recruiters actually respond to.',
  },
  {
    number: '03',
    title: 'Strategic Job Marketing',
    description:
      'We actively promote your profile to hiring managers across our employer network in four countries.',
  },
  {
    number: '04',
    title: 'Interview Guarantee',
    description:
      'A written commitment: you reach the interview stage with a relevant employer. Proof the process works, not the end of it.',
  },
  {
    number: '05',
    title: 'Full Interview Preparation',
    description:
      'Mock sessions, technical coaching and behavioral training to maximize your success rate in the room.',
  },
  {
    number: '06',
    title: 'Offer & Negotiation Support',
    description:
      'We guide you through the offer stage: evaluating, comparing and negotiating to your advantage.',
  },
  {
    number: '07',
    title: 'Placement & Career Success',
    description:
      'Confirmed placement on a full-time payroll position, followed by post-placement support for long-term career growth.',
  },
]

/** Full 11-step candidate journey — rendered on /process. */
export const candidateJourney = [
  { title: 'Registration & Profile Submission', description: 'You share your background, documents and goals: the raw material for everything that follows.' },
  { title: 'Career Consultation', description: 'A one-on-one session to define target roles, industries, countries and a realistic timeline.' },
  { title: 'Resume Review & Optimization', description: 'Your resume is rebuilt to recruiter standards: structure, keywords, evidence and clarity.' },
  { title: 'LinkedIn Profile Enhancement', description: 'Your public profile is aligned with your resume so recruiters find one consistent story.' },
  { title: 'Opportunity Matching', description: 'Open roles are matched against your skills, goals and preferred markets, not blasted at random.' },
  { title: 'Resume Marketing & Employer Outreach', description: 'We present your profile directly to employers and follow up on every submission.' },
  { title: 'Interview Preparation', description: 'Technical and mock interview sessions, tailored to the roles you are actually pursuing.' },
  { title: 'Interview Process', description: 'The milestone we put in writing. We coordinate scheduling, formats and feedback for every round.' },
  { title: 'Offer & Negotiation Support', description: 'Compensation context and negotiation guidance before you sign anything.' },
  { title: 'Placement & Joining Support', description: 'Paperwork, payroll setup and start-date logistics, handled with your new employer.' },
  { title: 'Post-Placement Career Support', description: 'We stay in touch after joining day: through onboarding and into what comes next.' },
]

/**
 * Services page deep-dive: candidate track (7 services, from the
 * client's "What's Included" lists) and employer track (5 services).
 */
export const candidateServices = [
  {
    title: 'Resume Optimization & Professional Branding',
    description:
      'Your resume is often your first impression. We rebuild it to highlight skills, achievements and experience in a recruiter-friendly, ATS-ready format.',
    includes: ['Resume review & analysis', 'ATS-friendly formatting', 'Keyword optimization', 'Achievement-based content'],
    outcome: 'Higher recruiter visibility and more interview calls.',
  },
  {
    title: 'LinkedIn Profile Optimization',
    description:
      'Recruiters search LinkedIn first. We align your profile with your resume so they find one consistent, compelling story.',
    includes: ['Professional headline creation', 'About section enhancement', 'Skills & endorsements', 'Profile branding recommendations'],
    outcome: 'Stronger online presence and recruiter engagement.',
  },
  {
    title: 'Resume Marketing',
    description:
      'We actively promote your profile to recruiters, hiring managers and organizations across our network: outreach, not waiting.',
    includes: ['Submission to relevant opportunities', 'Recruiter outreach', 'Strategic marketing campaigns', 'Opportunity matching'],
    outcome: 'Real exposure to quality opportunities.',
  },
  {
    title: 'Interview Preparation',
    description:
      'Interviews are won in preparation. Mock rounds and coaching tailored to the exact roles you are pursuing.',
    includes: ['Mock interviews', 'Technical interview preparation', 'Behavioral coaching', 'Confidence-building sessions'],
    outcome: 'Stronger performance when it counts.',
  },
  {
    title: 'Job Search Assistance',
    description:
      'A focused search strategy instead of scattershot applications: matching, application support and market insight.',
    includes: ['Skill-based job matching', 'Application support', 'Market insights & guidance', 'Career roadmap planning'],
    outcome: 'A faster, more effective search.',
  },
  {
    title: 'Career Counseling & Guidance',
    description:
      'Informed decisions about your professional future, before a single application goes out.',
    includes: ['Career path planning', 'Industry guidance', 'Skill development recommendations', 'Growth strategy'],
    outcome: 'Clear direction and long-term momentum.',
  },
  {
    title: 'Placement & Onboarding Support',
    description:
      'The destination: from offer evaluation through joining day, and the support that continues after it.',
    includes: ['Offer evaluation assistance', 'Salary negotiation guidance', 'Documentation support', 'Onboarding coordination'],
    outcome: 'A smooth start, and a team still behind you.',
  },
]

/**
 * [STAT: pending client verification, SRS B-4]
 * First three figures are client-supplied placeholders.
 * "Countries served" is verified fact.
 */
export const stats = [
  { value: 70, suffix: '+', label: 'Successful placements' },
  { value: 150, suffix: '+', label: 'Profiles marketed' },
  { value: 94, suffix: '%', label: 'Client satisfaction' },
  { value: 4, suffix: '', label: 'Countries served' },
]

/**
 * [PENDING: SRS B-5] Client-supplied employer list, spelling-corrected
 * and de-duplicated. Placement claims require the client's written
 * substantiation before launch; logo assets pending.
 */
export const employers = [
  'Amazon',
  'Meta',
  'JPMorgan Chase',
  'IBM',
  'Oracle',
  'Toyota Motor',
  'UnitedHealth Group',
  'CVS Health',
  'Berkshire Hathaway',
  'McKesson',
  'Costco Wholesale',
  'The Cigna Group',
  'Elevance Health',
  'The Home Depot',
  'Fannie Mae',
  'The Walt Disney Company',
  'Wells Fargo',
  'Morgan Stanley',
  'UPS',
  'FedEx',
  'Red Bull',
]

/**
 * Client-supplied testimonials (July 2026 content pack).
 * CLIENT OVERRIDE (July 2026, via Manhar Creatives): candidate names
 * and positions may be published. Staff names remain removed.
 * Quotes tightened to 25–45 words; meaning unchanged.
 */
export const testimonials = [
  {
    quote:
      'My experience was great from the beginning. The team took time to understand my career goals and shared opportunities that suited me. Their constant support and industry knowledge helped me land a role that truly feels right.',
    name: 'Apoorva K.',
    role: 'IT Professional',
  },
  {
    quote:
      'They made my job search much easier and less stressful: honest guidance, regular contact, and support throughout. Because of their efforts, I got a job that matches my skills and future plans.',
    name: 'Akhila G.',
    role: 'Career Transition',
  },
  {
    quote:
      'I secured a Senior Financial Analyst position within just 15 days. The support and career coaching were outstanding: my consultant managed my profile, prepared me for interviews, and encouraged me at every step.',
    name: 'Nishitha',
    role: 'Senior Financial Analyst',
  },
  {
    quote:
      'I had been looking for a job for a long time, but InfoTech Placement LLC made everything simple. Their regular follow-ups and support really boosted my confidence.',
    name: 'Namrtha B.',
    role: 'Professional',
  },
  {
    quote:
      'They did not just help me get a job, they helped me find the right one. I am truly thankful for their guidance, support and encouragement throughout the journey.',
    name: 'Pratham Patel',
    role: 'Professional',
  },
  {
    quote:
      'Thanks to InfoTech Placement LLC, I found an opportunity that suits my skills perfectly. The team was friendly, professional, and always willing to help whenever I needed it.',
    name: 'Raghu P.',
    role: 'IT Specialist',
  },
  {
    quote:
      'They helped me exactly when I needed it the most. They understood what I was looking for and supported me until I finally got the job I wanted.',
    name: 'Krutheek Reddy',
    role: 'Job Seeker',
  },
]

export type FaqCategory =
  | 'About Our Services'
  | 'For Candidates'
  | 'Process & Timeline'
  | 'Fees & Guarantees'

export const faqCategories: FaqCategory[] = [
  'Fees & Guarantees',
  'About Our Services',
  'For Candidates',
  'Process & Timeline',
]

/**
 * All 15 client-supplied FAQs (condensed, NZ-corrected per SRS §2.4)
 * + two program-specific additions, grouped for the two-column layout.
 */
export const faqs: { question: string; answer: string; category: FaqCategory }[] = [
  {
    question: 'Is the interview guarantee real?',
    category: 'Fees & Guarantees',
    answer:
      'Yes. Every enrolled candidate is guaranteed an interview opportunity: we are confident enough in our structured process to put that milestone in writing. But the interview is a checkpoint, not the goal. The program is built to carry you through the offer, the placement and your first months in the role, backed by a conditional 90 to 120 day money-back guarantee with terms shared before you enroll.',
  },
  {
    question: 'Is there a fee for job seekers?',
    category: 'Fees & Guarantees',
    answer:
      'Fees depend on the specific services you enroll for, and we explain them clearly during your free consultation, before you commit to anything. Every enrollment is covered by our conditional money-back guarantee, and all terms are put in writing. Complete transparency is the rule.',
  },
  {
    question: 'What is InfoTech Placement LLC?',
    category: 'About Our Services',
    answer:
      'A career consulting and placement company for professionals targeting the United States, Canada, the United Kingdom and New Zealand. We take you through one structured program: career counseling, resume optimization, LinkedIn branding, active resume marketing to our employer network, interview preparation, and support through the offer, the placement and your first months in the role, in IT and Non-IT industries alike.',
  },
  {
    question: 'What services do you offer?',
    category: 'About Our Services',
    answer:
      'Seven services that cover the whole journey: career counseling, resume optimization, LinkedIn profile enhancement, resume marketing to our employer network, job search assistance, interview preparation, and placement with onboarding support. Every service is available across all four countries we serve, and they work best as one continuous program.',
  },
  {
    question: 'Do you provide opportunities in IT and Non-IT sectors?',
    category: 'About Our Services',
    answer:
      'Yes. IT is our deepest bench: software, data, cloud, QA, cybersecurity. But we place Non-IT professionals too: finance, healthcare, HR, sales and marketing, engineering, customer service and administration. Whatever your field, you get the same program, the same commitment and the same eleven-step journey.',
  },
  {
    question: 'Why choose InfoTech Placement LLC?',
    category: 'About Our Services',
    answer:
      'Because the structure is different: personalized career support, IT and Non-IT expertise, active resume marketing rather than passive job boards, dedicated interview preparation, 24/7 availability and full visibility into your applications, across the US, Canada, UK and New Zealand. And we stay past your start date, because placement is the beginning of the outcome, not the end of it.',
  },
  {
    question: 'Do you help freshers and entry-level candidates?',
    category: 'For Candidates',
    answer:
      'Yes, fresh graduates, entry-level, mid-level and senior professionals all enroll with us. The program adapts to where you are: an early-career candidate may need more profile-building and interview practice, a senior candidate more market positioning and negotiation support. Personalized guidance is the point, whatever the level.',
  },
  {
    question: 'How can I submit my resume?',
    category: 'For Candidates',
    answer:
      'Four ways: through the form on our Contact page, through our LinkedIn company page, by email, or through a referral from someone already working with us. Once your resume arrives, our team reviews it and reaches out to discuss relevant opportunities and next steps.',
  },
  {
    question: 'Do you provide resume writing and optimization services?',
    category: 'For Candidates',
    answer:
      'Yes. Our specialists rebuild your resume to be ATS-friendly and recruiter-ready: structure, formatting, keyword optimization and achievement-based content. The goal is practical: better visibility with recruiters, better compatibility with screening software, and more interview calls from the same experience you already have.',
  },
  {
    question: 'Do you offer LinkedIn profile optimization?',
    category: 'For Candidates',
    answer:
      'Yes. We optimize your professional headline, about section, skills and endorsements, and experience descriptions so your LinkedIn profile tells the same story as your resume. Recruiters search LinkedIn first. A profile aligned with your target role measurably improves how often you are found and contacted.',
  },
  {
    question: 'How do you help candidates prepare for interviews?',
    category: 'For Candidates',
    answer:
      'Through a structured program: mock interviews, technical interview preparation, HR and behavioral coaching, communication skills development and confidence-building sessions. Preparation is tailored to the roles you are actually pursuing, so you walk into the real interview knowing the format, not guessing it.',
  },
  {
    question: 'Can you help with salary negotiations?',
    category: 'For Candidates',
    answer:
      'Yes. We advise on market salary trends, help you evaluate and compare offers, and guide the negotiation itself, including benefits assessment. You make the final call on every offer; our job is to make sure you make it with full information.',
  },
  {
    question: 'How does your recruitment process work?',
    category: 'Process & Timeline',
    answer:
      'You move through a structured 11-step journey: career consultation, resume and LinkedIn optimization, opportunity matching, resume marketing, interview preparation, the interviews themselves, then offer negotiation, joining support and post-placement career support. Each step is published on our Process page. You always know where you are.',
  },
  {
    question: 'Which countries do you serve?',
    category: 'Process & Timeline',
    answer:
      'The United States, Canada, the United Kingdom and New Zealand. Placements are made on full-time payroll structures appropriate to each country: W2 employment in the United States, and the equivalent full-time arrangements in Canada, the UK and New Zealand.',
  },
  {
    question: 'How long does it take to get placed?',
    category: 'Process & Timeline',
    answer:
      'Timelines vary with industry demand, your experience and skill set, market conditions and each employer’s own hiring pace. Some candidates secure offers within weeks; others take longer. What stays constant: your profile keeps being marketed, you can see its status at any time, and we keep working until you are placed.',
  },
  {
    question: 'How will I know what is happening with my applications?',
    category: 'Process & Timeline',
    answer:
      'You can see the status of every application we make on your behalf: which employers received your profile, where each submission stands, and what happens next. And because we operate 24/7, you can ask a real person about any of it at any hour.',
  },
]

export const footerLinks = {
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Process', href: '/process' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'Blog', href: '/blog' },
  ],
  services: [
    { label: 'Services', href: '/services' },
    { label: 'For Talent', href: '/talent' },
    { label: 'Refer & Earn', href: '/refer' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
}
