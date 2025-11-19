import { Link, NavLink } from 'react-router-dom'
import { ShoppingBag, Menu, Shirt, LogIn, User } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function Navbar({ cartCount }) {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/80 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-900 to-slate-700 text-white flex items-center justify-center font-bold">F</div>
            <span className="font-semibold tracking-tight text-slate-900">Finesse</span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm">
          <NavLink to="/shop" className={({isActive})=>`hover:text-slate-900 text-slate-600 transition ${isActive?'text-slate-900':''}`}>Shop</NavLink>
          <NavLink to="/categories" className="hover:text-slate-900 text-slate-600 transition">Categories</NavLink>
          <NavLink to="/about" className="hover:text-slate-900 text-slate-600 transition">About</NavLink>
        </nav>
        <div className="flex items-center gap-4">
          <NavLink to="/auth" className="text-slate-700 hover:text-slate-900 hidden sm:inline-flex" title="Account">
            <User size={20} />
          </NavLink>
          <NavLink to="/cart" className="relative inline-flex items-center text-slate-700 hover:text-slate-900">
            <ShoppingBag size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 text-[10px] px-1.5 py-0.5 bg-slate-900 text-white rounded-full">{cartCount}</span>
            )}
          </NavLink>
          <button onClick={()=>setOpen(!open)} className="md:hidden inline-flex text-slate-700"><Menu /></button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-slate-200 bg-white">
          <div className="px-4 py-3 flex flex-col gap-3 text-sm">
            <NavLink to="/shop" onClick={()=>setOpen(false)} className="text-slate-700">Shop</NavLink>
            <NavLink to="/categories" onClick={()=>setOpen(false)} className="text-slate-700">Categories</NavLink>
            <NavLink to="/about" onClick={()=>setOpen(false)} className="text-slate-700">About</NavLink>
          </div>
        </div>
      )}
    </header>
  )
}
