import { useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL

export default function Auth({ onLogin }){
  const [mode, setMode] = useState('login')
  const [form, setForm] = useState({ name:'', email:'', password:'' })
  const [error, setError] = useState('')

  async function submit(){
    setError('')
    try{
      const res = await fetch(`${API}/auth/${mode}`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(form) })
      if(!res.ok){
        const msg = await res.json()
        throw new Error(msg.detail || 'Error')
      }
      const data = await res.json()
      onLogin(data)
    }catch(e){ setError(e.message) }
  }

  return (
    <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="p-6 border rounded-xl bg-white/80 backdrop-blur">
        <h1 className="text-xl font-semibold text-slate-900">{mode==='login'?'Welcome back':'Create account'}</h1>
        <p className="text-slate-600 text-sm">{mode==='login'?'Sign in to continue':'Join to track orders and manage your profile'}</p>
        <div className="mt-4 space-y-3">
          {mode==='signup' && (
            <div>
              <label className="block text-sm text-slate-600 mb-1">Name</label>
              <input value={form.name} onChange={e=> setForm(f=>({...f,name:e.target.value}))} className="w-full border rounded-lg px-3 py-2" />
            </div>
          )}
          <div>
            <label className="block text-sm text-slate-600 mb-1">Email</label>
            <input value={form.email} onChange={e=> setForm(f=>({...f,email:e.target.value}))} className="w-full border rounded-lg px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm text-slate-600 mb-1">Password</label>
            <input type="password" value={form.password} onChange={e=> setForm(f=>({...f,password:e.target.value}))} className="w-full border rounded-lg px-3 py-2" />
          </div>
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <button onClick={submit} className="w-full px-5 py-3 rounded-lg bg-slate-900 text-white hover:bg-slate-800">{mode==='login'?'Sign in':'Create account'}</button>
        </div>
        <p className="text-sm text-slate-600 mt-3 text-center">
          {mode==='login'? (
            <>New here? <button className="underline" onClick={()=>setMode('signup')}>Create an account</button></>
          ) : (
            <>Already have an account? <button className="underline" onClick={()=>setMode('login')}>Sign in</button></>
          )}
        </p>
      </div>
    </div>
  )
}
