import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './shared/theme/ThemeContext'
import { AuthProvider } from './shared/auth/AuthContext'
import AppLayout from './shared/layout/AppLayout'
import HomePage from './shared/pages/HomePage'
import PlaceholderPage from './shared/pages/PlaceholderPage'
import LoginPage from './shared/pages/LoginPage'
import LessonsListPage from './features/lessons/pages/LessonsListPage'
import LessonDetailPage from './features/lessons/pages/LessonDetailPage'
import CreateLessonPage from './features/lessons/pages/CreateLessonPage'
import ChatbotPage from './features/chatbot/pages/ChatbotPage'

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/lessons" element={<LessonsListPage />} />
            <Route path="/lessons/create" element={<CreateLessonPage />} />
            <Route path="/lessons/:id" element={<LessonDetailPage />} />
            <Route path="/chatbot" element={<ChatbotPage />} />
            <Route path="/processes" element={<PlaceholderPage title="Processes" />} />
            <Route path="/projects" element={<PlaceholderPage title="Projects and Libraries" />} />
          </Routes>
        </AppLayout>
      </AuthProvider>
    </ThemeProvider>
  )
}
