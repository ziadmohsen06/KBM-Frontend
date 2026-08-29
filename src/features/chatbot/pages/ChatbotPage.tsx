import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Sparkles, Send, Plus } from 'lucide-react'
import Breadcrumb from '../../../shared/components/Breadcrumb'
import Button from '../../../shared/components/Button'

export default function ChatbotPage() {
  const navigate = useNavigate()
  const [message, setMessage] = useState('')

  return (
    <div className="mx-auto flex max-w-7xl flex-col px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Chatbot' }]} />

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-4" style={{ minHeight: '65vh' }}>
        <aside className="flex flex-col rounded-xl border border-border bg-bg-card p-4 lg:col-span-1">
          <h2 className="text-xs font-bold uppercase tracking-wide text-text-muted">History</h2>
          <p className="mt-2 flex-1 text-sm text-text-muted">All your chats are saved in here</p>
          <Button variant="primary" className="w-full">
            <Plus size={15} /> New Conversation
          </Button>
        </aside>

        <section className="flex flex-col rounded-xl border border-border bg-bg-card lg:col-span-3">
          <div className="flex items-center gap-3 border-b border-border p-4">
            <button
              aria-label="Back"
              onClick={() => navigate(-1)}
              className="text-text-muted transition-colors hover:text-text-primary cursor-pointer"
            >
              <ArrowLeft size={18} />
            </button>
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent/10 text-accent">
              <Sparkles size={15} />
            </span>
            <h1 className="text-base font-bold text-text-primary">AI Assistant</h1>
          </div>

          <div className="flex-1 space-y-4 p-4">
            <div className="flex items-start gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                <Sparkles size={15} />
              </span>
              <div className="max-w-md rounded-2xl rounded-tl-sm bg-bg-card-alt px-4 py-2.5 text-sm text-text-primary">
                Hello, How can I help you today?
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 border-t border-border p-4">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask me anything about your knowledge base..."
              className="flex-1 rounded-lg border border-border bg-bg-card px-3 py-2.5 text-sm text-text-primary placeholder:text-text-muted outline-none transition-colors focus:border-accent"
            />
            <button
              aria-label="Send message"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-white transition-transform hover:scale-105 cursor-pointer"
            >
              <Send size={16} />
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}
