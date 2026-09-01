import { apiRequest } from '../../shared/api/client'

interface ChatResponse {
  reply: string
}

export async function sendChatMessage(message: string): Promise<string> {
  const response = await apiRequest<ChatResponse>('/chat', {
    method: 'POST',
    body: { message },
  })
  return response.reply
}
