import { Sparkles } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function FloatingAssistantButton() {
  const navigate = useNavigate()

  return (
    <button
      aria-label="Open AI Assistant"
      onClick={() => navigate('/chatbot')}
      className="fixed bottom-6 right-6 z-50 flex h-13 w-13 items-center justify-center rounded-full bg-accent text-white shadow-lg shadow-accent/30 transition-transform hover:scale-105 cursor-pointer"
      style={{ height: 52, width: 52 }}
    >
      <Sparkles size={22} />
    </button>
  )
}
