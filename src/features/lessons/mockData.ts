import type { Lesson } from './types'

export const lessons: Lesson[] = [
  {
    id: '1',
    title: 'Optimizing PLC Logic for High-Speed Packaging',
    projectName: 'Line 7 Packaging Upgrade',
    department: 'Automation',
    functionName: 'Controls Engineering',
    industry: 'Consumer Goods',
    categoryLabel: 'AUTOMATION',
    categoryColor: 'blue',
    caption: 'High-speed packaging line',
    authorName: 'Hossam Shaaban',
    authorInitials: 'HS',
    authorAvatarColor: 'orange',
    rating: 4,
    reviewCount: 13,
    valueProposition:
      'Reduced cycle time by 18% and eliminated intermittent faults on the high-speed packaging line by restructuring PLC scan logic.',
    description:
      'The packaging line was experiencing intermittent faults and missed cycle targets during peak throughput. After profiling the PLC scan cycle, we identified that redundant polling of sensor states was consuming excessive scan time. We restructured the ladder logic into modular routines triggered by event interrupts rather than continuous polling, which reduced average scan time significantly.\n\nAs a result, the line achieved an 18% reduction in cycle time and fault frequency dropped to near zero over a two-week validation period. This approach has since been documented as the standard pattern for future high-speed packaging retrofits.',
    personToContact: 'Hossam Shaaban',
    attachments: [{ name: 'PLC_Logic_Specs.pdf', size: '2.4 MB', type: 'PDF' }],
    quickLinks: [{ label: 'Internal Wiki - Automation' }],
    keywords: ['Automation', 'PLC', 'Packaging'],
  },
  {
    id: '2',
    title: 'Standardizing Wiring Diagrams for Global Clients',
    projectName: 'Global Electrical Standards Rollout',
    department: 'Quality Assurance',
    functionName: 'Electrical Engineering',
    industry: 'Industrial Equipment',
    categoryLabel: 'ELECTRICAL',
    categoryColor: 'orange',
    caption: 'Wiring standardization',
    authorName: 'Yousef Hany',
    authorInitials: 'YH',
    authorAvatarColor: 'orange',
    rating: 5,
    reviewCount: 24,
    valueProposition:
      'Unified wiring diagram templates across regional teams, cutting review cycles for international clients by more than half.',
    description:
      'Regional teams were each producing wiring diagrams in slightly different formats, which slowed down reviews and caused confusion for clients operating across multiple countries. We introduced a single standardized template library covering symbol sets, labeling conventions, and revision tracking.\n\nAfter rollout, review cycles for international clients dropped from an average of 6 days to under 3 days, and rework requests fell sharply since diagrams now met every regional client expectation on the first submission.',
    personToContact: 'Yousef Hany',
    attachments: [{ name: 'Wiring_Standard_Templates.pdf', size: '3.1 MB', type: 'PDF' }],
    quickLinks: [{ label: 'Internal Wiki - Electrical' }],
    keywords: ['Electrical', 'Standards', 'Wiring'],
  },
  {
    id: '3',
    title: 'Improving Operator UX in Challenging Environments',
    projectName: 'HMI Console Redesign',
    department: 'Software Engineering',
    functionName: 'UX Engineering',
    industry: 'Heavy Manufacturing',
    categoryLabel: 'MEP DESIGN',
    categoryColor: 'green',
    caption: 'Operator console UX',
    authorName: 'Sarah Ahmed',
    authorInitials: 'SA',
    authorAvatarColor: 'green',
    rating: 4.5,
    reviewCount: 8,
    valueProposition:
      'Redesigned the operator console interface for high-glare, high-noise environments, cutting mis-taps and operator training time.',
    description:
      'Operators on the shop floor reported frequent mis-taps and slow task completion on the existing HMI console, especially under bright ambient lighting and while wearing gloves. We conducted on-site observation sessions and redesigned the interface with larger touch targets, higher-contrast color states, and simplified navigation depth.\n\nFollowing deployment, mis-tap incidents dropped noticeably and new operator training time was reduced, since the simplified flow required less memorization of menu structures.',
    personToContact: 'Sarah Ahmed',
    attachments: [{ name: 'HMI_Redesign_Guidelines.pdf', size: '1.8 MB', type: 'PDF' }],
    quickLinks: [{ label: 'Internal Wiki - Software Engineering' }],
    keywords: ['UX', 'HMI', 'Operators'],
  },
]

export const departments = ['Automation', 'Quality Assurance', 'Software Engineering', 'Electrical']
export const functions = ['Controls Engineering', 'Electrical Engineering', 'UX Engineering']
export const keywordsList = ['Automation', 'PLC', 'Packaging', 'Electrical', 'Standards', 'Wiring', 'UX', 'HMI']
export const industries = [
  'Consumer Goods',
  'Industrial Equipment',
  'Heavy Manufacturing',
  'Automotive',
  'Pharmaceuticals',
  'Energy',
]

export function getLessonById(id: string) {
  return lessons.find((lesson) => lesson.id === id)
}
