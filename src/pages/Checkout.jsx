import { useMemo, useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL

export default function Checkout({ cart, onClear }){
  const subtotal = useMemo(()=> cart.reduce((s,i)=> s + i.price * i.quantity, 0), [cart])
  const [form, setForm] = useState({ full_name:'', line1:'', city:'', state:'', postal_code:'', country:'US', email:'', payment_method:'cod' })
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  async function submit(){
    setLoading(true)
    try{
      const payload = {
        items: cart.map(i=> ({ product_id: i.id, quantity: i.quantity, price: i.price, title: i.title, variant: i.variant, image: i.image })),
        email: form.email,
        shipping_address: { full_name: form.full_name, line1: form.line1, line2: '', city: form.city, state: form.state, postal_code: form.postal_code, country: form.country },
        payment_method: form.payment_method,
      }
      const res = await fetch(`${API}/checkout`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload) })
      const data = await res.json()
      setResult(data)
      onClear()
    }catch(e){ console.error(e)}
    setLoading(false)
  }

  if(cart.length === 0 && !result){
    return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">Your cart is empty.</div>
  }

  if(result){
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-2xl font-semibold text-slate-900 mb-2">Order placed</h1>
        <p className="text-slate-600">Your order ID is {result.order_id}. Payment status: {result.payment?.status}.</p>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <h1 className="text-2xl font-semibold text-slate-900 mb-4">Checkout</h1>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              ['Full name','full_name'],
              ['Address line','line1'],
              ['City','city'],
              ['State','state'],
              ['Postal code','postal_code'],
              ['Country','country'],
              ['Email','email'],
            ].map(([label,key])=> (
              <div key={key} className="sm:col-span-1">
                <label className="block text-sm text-slate-600 mb-1">{label}</label>
                <input value={form[key]} onChange={e=> setForm(f=> ({...f, [key]: e.target.value}))} className="w-full border rounded-lg px-3 py-2" />
              </div>
            ))}
          </div>
          <div className="mt-4">
            <label className="block text-sm text-slate-600 mb-1">Payment</label>
            <div className="flex gap-3">
              <label className={`px-4 py-2 rounded-lg border cursor-pointer ${form.payment_method==='cod'?'bg-slate-900 text-white border-slate-900':'border-slate-300'}`}>
                <input type="radio" name="pay" className="hidden" checked={form.payment_method==='cod'} onChange={()=> setForm(f=>({...f,payment_method:'cod'}))} />
                Cash on Delivery
              </label>
              <label className={`px-4 py-2 rounded-lg border cursor-pointer ${form.payment_method==='stripe'?'bg-slate-900 text-white border-slate-900':'border-slate-300'}`}>
                <input type="radio" name="pay" className="hidden" checked={form.payment_method==='stripe'} onChange={()=> setForm(f=>({...f,payment_method:'stripe'}))} />
                Card (Stripe)
              </label>
            </div>
          </div>
          <button disabled={loading} onClick={submit} className="mt-6 px-5 py-3 rounded-lg bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-60">{loading?'Processing...':'Place order'}</button>
        </div>
        <div>
          <div className="p-4 border rounded-xl">
            <h3 className="font-medium mb-3">Order summary</h3>
            <div className="space-y-2 max-h-64 overflow-auto">
              {cart.map((i,idx)=> (
                <div key={idx} className="flex justify-between text-sm">
                  <span className="text-slate-600">{i.title} × {i.quantity}</span>
                  <span>${(i.price*i.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t my-3"></div>
            <div className="flex justify-between"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between text-slate-600"><span>Shipping</span><span>Free</span></div>
            <div className="flex justify-between font-semibold text-slate-900"><span>Total</span><span>${subtotal.toFixed(2)}</span></div>
          </div>
        </div>
      </div>
    </div>
  )
}
