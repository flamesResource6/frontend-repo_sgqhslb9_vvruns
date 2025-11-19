import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,#dbeafe,transparent_40%),radial-gradient(circle_at_80%_0%,#fce7f3,transparent_40%),radial-gradient(circle_at_50%_100%,#e0e7ff,transparent_40%)]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-28 relative">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <motion.h1 initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6}} className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900">
              Wear the Moment
            </motion.h1>
            <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.1,duration:0.6}} className="mt-4 text-slate-600 text-lg">
              Premium essentials crafted for modern life. Soft fabrics, tailored fits, effortless style.
            </motion.p>
            <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.2,duration:0.6}} className="mt-8 flex items-center gap-3">
              <Link to="/shop" className="px-5 py-3 rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition">Shop New Arrivals</Link>
              <Link to="/categories" className="px-5 py-3 rounded-lg bg-white text-slate-900 border border-slate-300 hover:bg-slate-50 transition">Browse Categories</Link>
            </motion.div>
          </div>
          <motion.div initial={{opacity:0,scale:0.98}} animate={{opacity:1,scale:1}} transition={{duration:0.6}} className="relative">
            <div className="aspect-[4/5] rounded-3xl bg-[url('https://images.unsplash.com/photo-1629380321590-3b3f75d66dec?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxjZXJhbWljJTIwcG90dGVyeSUyMGhhbmRtYWRlfGVufDB8MHx8fDE3NjM1MTI1ODN8MA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80')] bg-cover bg-center shadow-xl ring-1 ring-black/5" />
            <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-white rounded-2xl shadow-xl ring-1 ring-black/5 p-4">
              <p className="text-sm text-slate-600">Hand‑finished stitching</p>
              <p className="text-slate-900 font-semibold mt-1">100% organic cotton</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
