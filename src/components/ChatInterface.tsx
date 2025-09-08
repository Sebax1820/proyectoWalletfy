import { useState, useRef, useEffect } from 'react'
import { LLMWebLLMManager } from '@/managers/LLMWebManager'
import { CONFIG } from '@/config/llmconfig'

interface Message {
  id: string
  content: string
  isUser: boolean
  timestamp: Date
}

interface Params {
  temperature: number
  top_p?: number
  top_k?: number
  reasoning_effort?: 'high' | 'medium' | 'low' | 'minimal'
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Array<Message>>([])
  const [inputValue, setInputValue] = useState('')
  const [isOverflowing, setIsOverflowing] = useState(false)
  const [showConfig, setShowConfig] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [llmManager, setLlmManager] = useState<LLMWebLLMManager | null>(null)

  // 📌 Parámetros configurables
  const [params, setParams] = useState<Params>({
    temperature: CONFIG.webLLM.temperature,
    top_p: CONFIG.webLLM.topP,
    top_k: CONFIG.webLLM.topK,
    reasoning_effort: 'medium',
  })

  // 📌 Referencia al textarea
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

  const lineHeight = 20
  const maxLines = 6
  const maxHeight = lineHeight * maxLines

  // 📌 Auto-ajuste con límite
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      const newHeight = Math.min(textareaRef.current.scrollHeight, maxHeight)
      textareaRef.current.style.height = newHeight + 'px'
      setIsOverflowing(textareaRef.current.scrollHeight > maxHeight)
    }
  }, [inputValue])

  // 📌 Carga y liberación automática del modelo
  useEffect(() => {
    const manager = new LLMWebLLMManager(CONFIG.webLLM)
    setLlmManager(manager)
    manager.loadModel()

    return () => {
      manager.unloadModel()
    }
  }, [])

  // 📌 Enviar mensaje con streaming
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim() || !llmManager) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isUser: true,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    const userText = inputValue
    setInputValue('')
    setIsLoading(true)

    try {
      let partial = ''
      const tempId = 'temp-' + Date.now()

      for await (const chunk of llmManager.stream(userText)) {
        partial += chunk
        setMessages((prev) => [
          ...prev.filter((m) => m.id !== tempId),
          {
            id: tempId,
            content: partial,
            isUser: false,
            timestamp: new Date(),
          },
        ])
      }

      // Reemplazar el temporal por definitivo
      setMessages((prev) => [
        ...prev.filter((m) => m.id !== tempId),
        {
          id: Date.now().toString(),
          content: partial,
          isUser: false,
          timestamp: new Date(),
        },
      ])
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          content: `❌ Error: ${err.message}`,
          isUser: false,
          timestamp: new Date(),
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const clearChat = () => {
    setMessages([])
  }

  // 📌 Manejo de cambios en config
  const handleParamChange = (field: keyof Params, value: any) => {
    setParams((prev) => {
      const newParams = { ...prev }
      if (field === 'temperature') {
        newParams.temperature = Math.max(0, Math.min(2, Number(value)))
      } else if (field === 'top_p') {
        const v = Number(value)
        newParams.top_p = v >= 0 && v <= 1 ? v : undefined
        newParams.top_k = undefined
      } else if (field === 'top_k') {
        const v = Number(value)
        newParams.top_k = v >= 0 && v <= 20 ? v : undefined
        newParams.top_p = undefined
      } else if (field === 'reasoning_effort') {
        newParams.reasoning_effort = value
      }
      return newParams
    })
  }

  return (
    <div className="flex flex-col h-[520px] w-xl bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🤖</span>
          <h1 className="text-xl font-semibold text-gray-800">Chat Assistant</h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowConfig((prev) => !prev)}
            className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors flex items-center gap-1"
          >
            ⚙️
          </button>
          <button
            onClick={clearChat}
            className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors flex items-center gap-1"
          >
            🗑️
          </button>
        </div>
      </div>

      {/* Configuración */}
      {showConfig && (
        <div className="bg-white border-b border-gray-200 p-4 text-sm space-y-3">
          <div>
            <label className="block text-gray-600">Temperature (0 - 2)</label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="2"
              value={params.temperature}
              onChange={(e) => handleParamChange('temperature', e.target.value)}
              className="w-full border rounded px-2 py-1"
            />
          </div>

          <div>
            <label className="block text-gray-600">Top-p (0 - 1)</label>
            <input
              type="number"
              step="0.05"
              min="0"
              max="1"
              value={params.top_p ?? ''}
              onChange={(e) => handleParamChange('top_p', e.target.value)}
              className="w-full border rounded px-2 py-1"
              disabled={params.top_k !== undefined}
            />
          </div>

          <div>
            <label className="block text-gray-600">Top-k (0 - 20)</label>
            <input
              type="number"
              min="0"
              max="20"
              value={params.top_k ?? ''}
              onChange={(e) => handleParamChange('top_k', e.target.value)}
              className="w-full border rounded px-2 py-1"
              disabled={params.top_p !== undefined}
            />
          </div>

          <div>
            <label className="block text-gray-600">Reasoning Effort</label>
            <select
              value={params.reasoning_effort}
              onChange={(e) => handleParamChange('reasoning_effort', e.target.value)}
              className="w-full border rounded px-2 py-1"
            >
              <option value="minimal">Minimal</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>
      )}

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 mt-20">
            <span className="text-4xl block mb-2">💬</span>
            <p>¡Hola! Escribe un mensaje para comenzar.</p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div className="flex items-start gap-2 max-w-xs md:max-w-md lg:max-w-lg">
                {!message.isUser && (
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    🤖
                  </div>
                )}
                <div
                  className={`px-4 py-2 rounded-lg ${
                    message.isUser
                      ? 'bg-violet-500 text-white rounded-br-sm'
                      : 'bg-white border border-gray-200 rounded-bl-sm'
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">
                    {message.content}
                  </p>
                  <p className={`text-xs mt-1 ${message.isUser ? 'text-blue-100' : 'text-gray-500'}`}>
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
                {message.isUser && (
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    👤
                  </div>
                )}
              </div>
            </div>
          ))
        )}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex items-start gap-2">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">🤖</div>
              <div className="bg-white border border-gray-200 rounded-lg rounded-bl-sm px-4 py-2">
                <div className="flex items-center gap-1">
                  <span className="text-sm text-gray-500">Escribiendo</span>
                  <div className="flex gap-1">
                    <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 p-4">
        <form onSubmit={handleSubmit} className="flex gap-2 items-end">
          <textarea
            ref={textareaRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Escribe tu mensaje..."
            disabled={isLoading}
            rows={1}
            className={`flex-1 resize-none px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent disabled:bg-gray-100 ${isOverflowing ? 'overflow-y-auto' : 'overflow-hidden'}`}
            style={{ maxHeight: `${maxHeight}px`, lineHeight: `${lineHeight}px` }}
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isLoading}
            className="px-4 py-2 bg-violet-500 text-white rounded-lg hover:bg-violet-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors justify-center w-20 h-9.5 flex items-center gap-1"
          >
            📤
          </button>
        </form>
      </div>
    </div>
  )
}
