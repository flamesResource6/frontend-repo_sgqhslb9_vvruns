import { useEffect, useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL

export default function Admin(){
  const [form, setForm] = useState({ title:'', description:'', price:'', category:'', images:'', variants:'', tags:'' })
  const [products, setProducts] = useState([])

  async function create(){
    const payload = {
      title: form.title,
      description: form.description,
      price: parseFloat(form.price||'0'),
      category: form.category,
      images: form.images? form.images.split(',').map(s=>s.trim()) : [],
      variants: form.variants? form.variants.split('\n').map(l=>{ const [size,color,stock] = l.split(',').map(s=>s.trim()); return { size, color, stock: parseInt(stock||'0') } }) : [],
      tags: form.tags? form.tags.split(',').map(s=>s.trim()) : []
    }
    const res = await fetch(`${API}/admin/products`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload) })
    const data = await res.json()
    await load()
    setForm({ title:'', description:'', price:'', category:'', images:'', variants:'', tags:'' })
  }

  async function load(){
    const res = await fetch(`${API}/products`)
    const data = await res.json()
    setProducts(data)
  }

  useEffect(()=>{ load() },[])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl font-semibold text-slate-900 mb-6">Admin</h1>
      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-1">
          <div className="p-4 border rounded-xl space-y-3">
            {[
              ['Title','title'],['Description','description'],['Price','price'],['Category','category']
            ].map(([label,key])=> (
              <div key={key}>
                <label className="block text-sm text-slate-600 mb-1">{label}</label>
                <input value={form[key]} onChange={e=> setForm(f=> ({...f, [key]: e.target.value}))} className="w-full border rounded-lg px-3 py-2" />
              </div>
            ))}
            <div>
              <label className="block text-sm text-slate-600 mb-1">Images (comma separated URLs)</label>
              <textarea value={form.images} onChange={e=> setForm(f=> ({...f, images:e.target.value}))} className="w-full border rounded-lg px-3 py-2" rows={2} />
            </div>
            <div>
              <label className="block text-sm text-slate-600 mb-1">Variants (size,color,stock per line)</label>
              <textarea value={form.variants} onChange={e=> setForm(f=> ({...f, variants:e.target.value}))} className="w-full border rounded-lg px-3 py-2" rows={3} />
            </div>
            <div>
              <label className="block text-sm text-slate-600 mb-1">Tags (comma separated)</label>
              <input value={form.tags} onChange={e=> setForm(f=> ({...f, tags:e.target.value}))} className="w-full border rounded-lg px-3 py-2" />
            </div>
            <button onClick={create} className="w-full px-5 py-3 rounded-lg bg-slate-900 text-white hover:bg-slate-800">Add product</button>
          </div>
        </div>
        <div className="lg:col-span-2">
          <div className="grid sm:grid-cols-2 gap-6">
            {products.map(p=> (
              <div key={p.id} className="p-4 border rounded-xl">
                <div className="flex gap-4">
                  <img src={p.images?.[0] || 'https://images.unsplash.com/photo-1520975922131-cad43f71f1e7?q=80&w=400&auto=format&fit=crop'} className="w-24 h-28 object-cover rounded" />
                  <div className="flex-1">
                    <div className="font-medium text-slate-900">{p.title}</div>
                    <div className="text-sm text-slate-600">{p.category}</div>
                    <div className="text-slate-900 mt-1">${p.price}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
