import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Featured from './components/Featured'
import Categories from './components/Categories'
import Shop from './pages/Shop'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Auth from './pages/Auth'
import Admin from './pages/Admin'

function Home(){
  return (
    <>
      <Hero />
      <Featured />
      <Categories />
    </>
  )
}

function App() {
  const [cart, setCart] = useState([])
  const [session, setSession] = useState(null)

  useEffect(()=>{
    const saved = localStorage.getItem('cart')
    if(saved) setCart(JSON.parse(saved))
  },[])
  useEffect(()=>{
    localStorage.setItem('cart', JSON.stringify(cart))
  },[cart])

  function addToCart(item){
    setCart(c => {
      // try merge same product+variant
      const idx = c.findIndex(x => x.id===item.id && JSON.stringify(x.variant||{})===JSON.stringify(item.variant||{}))
      if(idx>=0){
        const copy = [...c]
        copy[idx].quantity += item.quantity || 1
        return copy
      }
      return [...c, {...item, quantity: item.quantity||1}]
    })
  }

  function updateCart(index, quantity){
    setCart(c => {
      const copy = [...c]
      if(quantity<=0){ copy.splice(index,1); return copy }
      copy[index].quantity = quantity
      return copy
    })
  }

  return (
    <BrowserRouter>
      <Navbar cartCount={cart.reduce((s,i)=>s+i.quantity,0)} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetail onAdd={addToCart} />} />
        <Route path="/cart" element={<Cart cart={cart} onUpdate={updateCart} />} />
        <Route path="/checkout" element={<Checkout cart={cart} onClear={()=> setCart([])} />} />
        <Route path="/auth" element={<Auth onLogin={setSession} />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      <footer className="py-10 text-center text-slate-500">© {new Date().getFullYear()} Finesse</footer>
    </BrowserRouter>
  )
}

export default App
