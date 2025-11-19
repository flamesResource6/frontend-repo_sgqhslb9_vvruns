import { Link } from 'react-router-dom'

const cats = [
  { key:'women', title:'Women', img:'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop' },
  { key:'men', title:'Men', img:'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=1200&auto=format&fit=crop' },
  { key:'kids', title:'Kids', img:'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=1200&auto=format&fit=crop' },
]

export default function Categories(){
  return (
    <section className="py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900 mb-6">Shop by Category</h2>
        <div className="grid sm:grid-cols-3 gap-6">
          {cats.map(c => (
            <Link key={c.key} to={`/shop?category=${c.key}`} className="group rounded-2xl overflow-hidden ring-1 ring-black/5">
              <div className="aspect-[4/3] bg-slate-100">
                <img src={c.img} className="w-full h-full object-cover group-hover:scale-105 transition" />
              </div>
              <div className="p-4 bg-white">
                <h3 className="font-semibold text-slate-900">{c.title}</h3>
                <p className="text-slate-600 text-sm">Explore {c.title} collection</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
