import { useEffect, useMemo, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'

const API = import.meta.env.VITE_BACKEND_URL

export default function Shop(){
  const [params] = useSearchParams()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  const [filters, setFilters] = useState({ size:'', color:'', min:'', max:'' })

  useEffect(()=>{
    async function load(){
      setLoading(true)
      try{
        const qs = new URLSearchParams()
        const cat = params.get('category')
        if(cat) qs.set('category', cat)
        if(filters.size) qs.set('size', filters.size)
        if(filters.color) qs.set('color', filters.color)
        if(filters.min) qs.set('min_price', filters.min)
        if(filters.max) qs.set('max_price', filters.max)
        const res = await fetch(`${API}/products?${qs.toString()}`)
        const data = await res.json()
        setProducts(data)
      }catch(e){ console.error(e)}
      setLoading(false)
    }
    load()
  },[params, filters])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl font-semibold text-slate-900 mb-6">Discover</h1>
      <div className="grid lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1 space-y-6">
          <div className="p-4 rounded-xl border border-slate-200">
            <h3 className="font-medium mb-3">Filters</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <label className="block text-slate-600 mb-1">Size</label>
                <select value={filters.size} onChange={e=>setFilters(f=>({...f,size:e.target.value}))} className="w-full border rounded-lg px-3 py-2">
                  <option value="">All</option>
                  {['XS','S','M','L','XL'].map(s=> <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-slate-600 mb-1">Color</label>
                <select value={filters.color} onChange={e=>setFilters(f=>({...f,color:e.target.value}))} className="w-full border rounded-lg px-3 py-2">
                  <option value="">All</option>
                  {['Black','White','Blue','Beige','Green'].map(c=> <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-slate-600 mb-1">Min</label>
                <input value={filters.min} onChange={e=>setFilters(f=>({...f,min:e.target.value}))} className="w-full border rounded-lg px-3 py-2" placeholder="0" />
              </div>
              <div>
                <label className="block text-slate-600 mb-1">Max</label>
                <input value={filters.max} onChange={e=>setFilters(f=>({...f,max:e.target.value}))} className="w-full border rounded-lg px-3 py-2" placeholder="200" />
              </div>
            </div>
          </div>
        </aside>
        <main className="lg:col-span-3">
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              {Array.from({length:9}).map((_,i)=> <div key={i} className="aspect-[4/5] bg-slate-100 rounded-xl animate-pulse" />)}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              {products.map(p => (
                <Link key={p.id} to={`/product/${p.id}`} className="group">
                  <div className="aspect-[4/5] rounded-xl overflow-hidden bg-slate-100">
                    <img src={p.images?.[0] || 'https://images.unsplash.com/photo-1520975922131-cad43f71f1e7?q=80&w=800&auto=format&fit=crop'} className="w-full h-full object-cover group-hover:scale-105 transition" />
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-slate-600">{p.category}</p>
                    <h3 className="font-medium text-slate-900">{p.title}</h3>
                    <p className="text-slate-900">${p.price?.toFixed?.(2) || p.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
