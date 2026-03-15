import { useState } from 'react'

function App() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSend = async () => {
    if (!input.trim() || isLoading) return
    
    const userMsg = { role: 'user', content: input }
    setMessages(prev => [...prev, userMsg])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch('http://127.0.0.1:8000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      })
      const data = await response.json()
      if (response.ok) {
        setMessages(prev => [...prev, { role: 'ai', content: data.reply }])
      } else {
        setMessages(prev => [...prev, { role: 'error', content: data.detail }])
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: 'error', content: "Backend is not responding." }])
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center p-4 md:p-8">
      <header className="w-full max-w-2xl mb-8 text-center">
        <h1 className="text-5xl font-black bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent tracking-tight">
          UTKARSH AI
        </h1>
        <p className="text-slate-500 text-sm mt-2 font-mono uppercase tracking-widest">v4.6 Neural Engine</p>
      </header>

      {/* Chat History */}
      <div className="flex-1 w-full max-w-2xl bg-slate-900/40 border border-slate-800 rounded-3xl p-6 overflow-y-auto mb-6 shadow-2xl backdrop-blur-sm">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-slate-600 gap-4">
            <div className="w-12 h-12 rounded-full border-2 border-slate-800 animate-pulse flex items-center justify-center">✨</div>
            <p className="italic">Ready for Hack & Forge 2026. Ask me anything.</p>
          </div>
        )}
        <div className="space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] px-5 py-3 rounded-2xl shadow-lg leading-relaxed ${
                msg.role === 'user' ? 'bg-blue-600 text-white font-medium' : 
                msg.role === 'error' ? 'bg-red-900/30 border border-red-500/50 text-red-200 text-xs' : 
                'bg-slate-800 border border-slate-700 text-slate-200'
              }`}>
                {msg.content}
              </div>
            </div>
          ))}
          {isLoading && <div className="text-blue-400 animate-pulse text-xs font-mono ml-2">THINKING...</div>}
        </div>
      </div>

      {/* Modern Input Bar */}
      <div className="w-full max-w-2xl flex gap-3 bg-slate-900 border border-slate-800 p-3 rounded-2xl shadow-2xl focus-within:border-blue-500/50 transition-all">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && !isLoading && handleSend()}
          placeholder="Type your prompt..."
          className="flex-1 bg-transparent px-4 py-2 outline-none text-slate-100 text-lg placeholder:text-slate-700"
          disabled={isLoading}
        />
        <button 
          onClick={handleSend}
          disabled={isLoading || !input.trim()}
          className="bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-800 text-slate-950 font-black px-8 py-2 rounded-xl transition-all active:scale-95 uppercase text-sm tracking-tighter"
        >
          {isLoading ? 'Wait' : 'Send'}
        </button>
      </div>
    </div>
  )
}

export default App