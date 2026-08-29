export type CategoryColor = 'blue' | 'orange' | 'green'

export interface Attachment {
  name: string
  size: string
  type: string
}

export interface QuickLink {
  label: string
}

export interface Lesson {
  id: string
  title: string
  projectName: string
  department: string
  functionName: string
  industry: string
  categoryLabel: string
  categoryColor: CategoryColor
  caption: string
  authorName: string
  authorInitials: string
  authorAvatarColor: 'orange' | 'green' | 'blue' | 'purple'
  rating: number
  reviewCount: number
  valueProposition: string
  description: string
  personToContact: string
  attachments: Attachment[]
  quickLinks: QuickLink[]
  keywords: string[]
}
