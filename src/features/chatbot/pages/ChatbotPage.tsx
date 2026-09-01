import { useState, type KeyboardEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Sparkles, Send, Plus } from 'lucide-react'
import Breadcrumb from '../../../shared/components/Breadcrumb'
import Button from '../../../shared/components/Button'
import { sendChatMessage } from '../chatbot.service'
import { ApiError } from '../../../shared/api/client'

type ChatRole = 'user' | 'assistant' | 'error'

interface ChatMessage {
  id: string
  role: ChatRole
  text: string
}

function TypingIndicator() {
  return (
    <div className="flex items-start gap-3">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
        <Sparkles size={15} />
      </span>
      <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm bg-bg-card-alt px-4 py-3">
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-text-muted" style={{ animationDelay: '0ms' }} />
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-text-muted" style={{ animationDelay: '150ms' }} />
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-text-muted" style={{ animationDelay: '300ms' }} />
      </div>
    </div>
  )
}

function ChatBubble({ message }: { message: ChatMessage }) {
  if (message.role === 'user') {
    return (
      <div className="flex justify-end">
        <div className="max-w-md rounded-2xl rounded-tr-sm bg-accent px-4 py-2.5 text-sm text-white">
          {message.text}
        </div>
      </div>
    )
  }

  const isError = message.role === 'error'

  return (
    <div className="flex items-start gap-3">
      <span
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
          isError ? 'bg-red-500/10 text-red-500' : 'bg-accent/10 text-accent'
        }`}
      >
        <Sparkles size={15} />
      </span>
      <div
        className={`max-w-md rounded-2xl rounded-tl-sm px-4 py-2.5 text-sm ${
          isError ? 'bg-red-500/10 text-red-400' : 'bg-bg-card-alt text-text-primary'
        }`}
      >
        {message.text}
      </div>
    </div>
  )
}

let nextId = 0
function makeId() {
  nextId += 1
  return `msg-${nextId}`
}

export default function ChatbotPage() {
  const navigate = useNavigate()
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: makeId(), role: 'assistant', text: 'Hello, How can I help you today?' },
  ])
  const [isSending, setIsSending] = useState(false)

  async function handleSend() {
    const trimmed = message.trim()
    if (!trimmed || isSending) return

    setMessages((prev) => [...prev, { id: makeId(), role: 'user', text: trimmed }])
    setMessage('')
    setIsSending(true)

    try {
      const reply = await sendChatMessage(trimmed)
      setMessages((prev) => [...prev, { id: makeId(), role: 'assistant', text: reply }])
    } catch (err) {
      const text = err instanceof ApiError ? err.message : 'Something went wrong sending your message. Please try again.'
      setMessages((prev) => [...prev, { id: makeId(), role: 'error', text }])
    } finally {
      setIsSending(false)
    }
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSend()
    }
  }

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
            {messages.map((msg) => (
              <ChatBubble key={msg.id} message={msg} />
            ))}
            {isSending && <TypingIndicator />}
          </div>

          <div className="flex items-center gap-3 border-t border-border p-4">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything about your knowledge base..."
              className="flex-1 rounded-lg border border-border bg-bg-card px-3 py-2.5 text-sm text-text-primary placeholder:text-text-muted outline-none transition-colors focus:border-accent"
            />
            <button
              aria-label="Send message"
              onClick={handleSend}
              disabled={!message.trim() || isSending}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-white transition-transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 cursor-pointer disabled:cursor-not-allowed"
            >
              <Send size={16} />
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}
