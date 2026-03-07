import React, { useEffect, useRef, useState } from 'react'
import './ChatWidget.css'

type Msg = { id: number; from: 'user' | 'bot'; text: string }

const canned = {
  skills:
    'Skills: Python, Machine Learning, Data Science, NLP, Scikit-learn, Pandas, NumPy, SQL, JavaScript, and Linux.',

  projects:
    'Projects: Text-to-Speech Generator using HuggingFace, AI Scholarship Predictor, AI Study Planner, Weather Forecasting System, News Classifier, Movie Recommendation System (SVD & ALS), and News Sentiment Analyzer.',

  experience:
    'Experience: Building machine learning models, developing NLP systems, working on data preprocessing, model evaluation, and creating AI-driven applications to solve real-world problems.'
}

function getReply(message: string) {
  const m = message.toLowerCase()
  if (m.includes('skill')) return canned.skills
  if (m.includes('project')) return canned.projects
  if (m.includes('experience') || m.includes('work')) return canned.experience
  return 'I can answer about my skills, projects, and experience — try asking about one of those.'
}

let idCounter = 1

export const ChatWidget: React.FC = () => {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Msg[]>([
    { id: idCounter++, from: 'bot', text: 'Hi — ask me about my skills, projects, or experience.' }
  ])
  const [input, setInput] = useState('')
  const [botTyping, setBotTyping] = useState(false)
  const scrollerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (open && scrollerRef.current) scrollerRef.current.scrollTop = scrollerRef.current.scrollHeight
  }, [messages, open])

  function pushMessage(from: 'user' | 'bot', text: string) {
    setMessages(m => [...m, { id: idCounter++, from, text }])
  }

  function send() {
    const trimmed = input.trim()
    if (!trimmed) return
    pushMessage('user', trimmed)
    setInput('')
    // simulate AI typing
    setBotTyping(true)
    const reply = getReply(trimmed)
    // set a small delay then type the reply char-by-char
    const baseDelay = 400
    setTimeout(() => {
      // add an empty bot message which we will fill
      const botId = idCounter++
      setMessages(m => [...m, { id: botId, from: 'bot', text: '' }])
      let i = 0
      const speed = 25
      const t = setInterval(() => {
        i++
        setMessages(m => m.map(msg => (msg.id === botId ? { ...msg, text: reply.slice(0, i) } : msg)))
        if (i >= reply.length) {
          clearInterval(t)
          setBotTyping(false)
        }
      }, speed)
    }, baseDelay)
  }

  function handleKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') send()
  }

  return (
    <div className={`chat-widget ${open ? 'open' : ''}`}>
      <button
        className="chat-toggle"
        aria-label={open ? 'Close chat' : 'Open chat'}
        onClick={() => setOpen(s => !s)}
      >
        <span className="dot" />
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      </button>

      <div className="chat-panel" role="dialog" aria-hidden={!open}>
        <div className="chat-header">AI Assistant</div>
        <div className="chat-body" ref={scrollerRef}>
          {messages.map(m => (
            <div key={m.id} className={`bubble ${m.from === 'user' ? 'user' : 'bot'}`}>
              <span>{m.text}</span>
              {m.from === 'bot' && botTyping && m.text === '' && (
                <span className="typing-dots" aria-hidden />
              )}
            </div>
          ))}
        </div>
        <div className="chat-input">
          <input
            placeholder="Ask about skills, projects, experience..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            aria-label="Message"
          />
          <button onClick={send} aria-label="Send">Send</button>
        </div>
      </div>
    </div>
  )
}

export default ChatWidget
