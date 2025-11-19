import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const API = import.meta.env.VITE_BACKEND_URL

export default function ProductDetail({ onAdd }){
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [size, setSize] = useState('')
  const [color, setColor] = useState('')

  useEffect(()=>{
    async function load(){
      const res = await fetch(`${API}/products/${id}`)
      const data = await res.json()
      setProduct(data)
    }
    load()
  },[id])

  if(!product) return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">Loading...</div>

  const sizes = [...new Set(product.variants?.map(v=>v.size).filter(Boolean))]
  const colors = [...new Set(product.variants?.map(v=>v.color).filter(Boolean))]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid lg:grid-cols-2 gap-10">
        <div>
          <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-slate-100">
            <img src={product.images?.[0] || 'https://images.unsplash.com/photo-1520975922131-cad43f71f1e7?q=80&w=1200&auto=format&fit=crop'} className="w-full h-full object-cover" />
          </div>
          {product.images?.length > 1 && (
            <div className="mt-3 grid grid-cols-5 gap-2">
              {product.images.slice(0,5).map((img,i)=> (
                <img key={i} src={img} className="aspect-square rounded-lg object-cover" />
              ))}
            </div>
          )}
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">{product.title}</h1>
          <p className="text-slate-600 mt-2">{product.description}</p>
          <p className="text-2xl font-semibold text-slate-900 mt-4">${product.price?.toFixed?.(2) || product.price}</p>

          {sizes.length > 0 && (
            <div className="mt-6">
              <label className="block text-sm text-slate-600 mb-1">Size</label>
              <div className="flex gap-2">
                {sizes.map(s => (
                  <button key={s} onClick={()=>setSize(s)} className={`px-3 py-2 rounded-lg border ${size===s?'bg-slate-900 text-white border-slate-900':'border-slate-300 text-slate-700'}`}>{s}</button>
                ))}
              </div>
            </div>
          )}

          {colors.length > 0 && (
            <div className="mt-4">
              <label className="block text-sm text-slate-600 mb-1">Color</label>
              <div className="flex gap-2">
                {colors.map(c => (
                  <button key={c} onClick={()=>setColor(c)} className={`px-3 py-2 rounded-lg border ${color===c?'bg-slate-900 text-white border-slate-900':'border-slate-300 text-slate-700'}`}>{c}</button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6">
            <button onClick={()=> onAdd({ id: product.id, title: product.title, price: product.price, image: product.images?.[0], quantity: 1, variant: { size, color } })} className="px-5 py-3 rounded-lg bg-slate-900 text-white hover:bg-slate-800">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  )
}
