import { Link, useNavigate } from 'react-router-dom'
import { useMemo } from 'react'

export default function Cart({ cart, onUpdate, onCheckout }){
  const nav = useNavigate()
  const subtotal = useMemo(()=> cart.reduce((s,i)=> s + i.price * i.quantity, 0), [cart])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl font-semibold text-slate-900 mb-6">Your Cart</h1>
      {cart.length === 0 ? (
        <div className="text-slate-600">Cart is empty. <Link to="/shop" className="text-slate-900 underline">Shop now</Link></div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item,idx)=> (
              <div key={idx} className="flex gap-4 items-center p-4 border rounded-xl">
                <img src={item.image || 'https://images.unsplash.com/photo-1520975922131-cad43f71f1e7?q=80&w=400&auto=format&fit=crop'} className="w-20 h-24 object-cover rounded-lg" />
                <div className="flex-1">
                  <div className="font-medium text-slate-900">{item.title}</div>
                  {item.variant && (item.variant.size || item.variant.color) && (
                    <div className="text-sm text-slate-600">{item.variant.size} {item.variant.color}</div>
                  )}
                  <div className="text-slate-900 mt-1">${item.price.toFixed(2)}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={()=>onUpdate(idx, Math.max(1,item.quantity-1))} className="px-2 py-1 border rounded">-</button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button onClick={()=>onUpdate(idx, item.quantity+1)} className="px-2 py-1 border rounded">+</button>
                </div>
                <button onClick={()=>onUpdate(idx, 0)} className="text-slate-500 hover:text-red-600">Remove</button>
              </div>
            ))}
          </div>
          <div>
            <div className="p-4 border rounded-xl">
              <div className="flex justify-between mb-2"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between mb-2 text-slate-600"><span>Shipping</span><span>Free</span></div>
              <div className="flex justify-between font-semibold text-slate-900 mb-4"><span>Total</span><span>${subtotal.toFixed(2)}</span></div>
              <button onClick={()=> nav('/checkout')} className="w-full px-5 py-3 rounded-lg bg-slate-900 text-white hover:bg-slate-800">Checkout</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
