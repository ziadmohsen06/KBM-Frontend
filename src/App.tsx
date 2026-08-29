import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './shared/theme/ThemeContext'
import AppLayout from './shared/layout/AppLayout'
import HomePage from './shared/pages/HomePage'
import PlaceholderPage from './shared/pages/PlaceholderPage'
import LessonsListPage from './features/lessons/pages/LessonsListPage'
import LessonDetailPage from './features/lessons/pages/LessonDetailPage'
import CreateLessonPage from './features/lessons/pages/CreateLessonPage'
import ChatbotPage from './features/chatbot/pages/ChatbotPage'

export default function App() {
  return (
    <ThemeProvider>
      <AppLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/lessons" element={<LessonsListPage />} />
          <Route path="/lessons/create" element={<CreateLessonPage />} />
          <Route path="/lessons/:id" element={<LessonDetailPage />} />
          <Route path="/chatbot" element={<ChatbotPage />} />
          <Route path="/processes" element={<PlaceholderPage title="Processes" />} />
          <Route path="/projects" element={<PlaceholderPage title="Projects and Libraries" />} />
        </Routes>
      </AppLayout>
    </ThemeProvider>
  )
}
