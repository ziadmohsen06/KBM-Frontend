import type { ReactNode } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import FloatingAssistantButton from '../components/FloatingAssistantButton'

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-bg-page text-text-primary">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingAssistantButton />
    </div>
  )
}
