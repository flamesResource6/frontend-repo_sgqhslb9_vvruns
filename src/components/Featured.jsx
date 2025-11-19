import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const API = import.meta.env.VITE_BACKEND_URL

export default function Featured(){
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    async function load(){
      try{
        const res = await fetch(`${API}/products`)
        const data = await res.json()
        setProducts(data.slice(0,8))
      }catch(e){
        console.error(e)
      }finally{
        setLoading(false)
      }
    }
    load()
  },[])

  return (
    <section className="py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-6">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Featured</h2>
          <Link to="/shop" className="text-slate-700 hover:text-slate-900">View all</Link>
        </div>
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({length:8}).map((_,i)=> (
              <div key={i} className="aspect-[4/5] rounded-xl bg-slate-100 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map(p => (
              <Link key={p.id} to={`/product/${p.id}`} className="group">
                <div className="aspect-[4/5] rounded-xl bg-slate-100 overflow-hidden">
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
      </div>
    </section>
  )
}
