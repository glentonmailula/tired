import { useState } from 'react'
import type { MenuItem } from './types'

const INITIAL_ITEMS: MenuItem[] = [
  { id: '1', name: 'Bouillabaisse Provençale', category: 'Starters', price: 18.5, description: 'Classic Provençal fish stew with saffron broth, rouille, and grilled sourdough.', available: true, preparationTime: 20 },
  { id: '2', name: 'Duck Confit', category: 'Mains', price: 34.0, description: 'Slow-cooked duck leg, lentil du Puy, cherry jus, and wilted greens.', available: true, preparationTime: 35 },
  { id: '3', name: 'Tarte Tatin', category: 'Desserts', price: 12.5, description: 'Caramelised Granny Smith apple tart with crème fraîche and salted caramel drizzle.', available: true, preparationTime: 15 },
  { id: '4', name: 'Burrata & Heritage Tomato', category: 'Starters', price: 16.0, description: 'Creamy burrata, heirloom tomatoes, aged balsamic, Ligurian olive oil, micro basil.', available: true, preparationTime: 10 },
  { id: '5', name: 'Pan-Seared Salmon', category: 'Mains', price: 29.0, description: 'Atlantic salmon, celeriac purée, samphire, lemon-caper beurre blanc.', available: false, preparationTime: 25 },
  { id: '6', name: 'Elderflower Panna Cotta', category: 'Desserts', price: 10.0, description: 'Set cream with elderflower cordial, fresh gooseberry compote, and tuile.', available: true, preparationTime: 5 },
  { id: '7', name: 'Château Reserve Rouge', category: 'Drinks', price: 14.0, description: 'Full-bodied Bordeaux blend, notes of dark cherry, cedar, and tobacco.', available: true, preparationTime: 2 },
  { id: '8', name: 'House Digestif', category: 'Drinks', price: 9.0, description: 'Rotating artisanal spirit selection, served neat or on ice.', available: true, preparationTime: 2 },
]

type MenuFormProps = {
  item?: MenuItem
  onSave: (item: MenuItem) => void
  onBack: () => void
}

type MenuListProps = {
  items: MenuItem[]
  filterCategory: string
  setFilterCategory: (category: string) => void
  onView: (item: MenuItem) => void
  onAdd: () => void
  onToggleAvailable: (id: string) => void
}

function MenuList({ items, filterCategory, setFilterCategory, onView, onAdd, onToggleAvailable }: MenuListProps) {
  const categories = ['All', 'Starters', 'Mains', 'Desserts', 'Drinks']
  const visibleItems = filterCategory === 'All'
    ? items
    : items.filter(item => item.category === filterCategory)

  return (
    <section style={{ padding: 24 }}>
      <h1>Menu</h1>
      <button type="button" onClick={onAdd}>Add menu item</button>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', margin: '16px 0' }}>
        {categories.map(category => (
          <button key={category} type="button" onClick={() => setFilterCategory(category)}>
            {category}
          </button>
        ))}
      </div>
      {visibleItems.map(item => (
        <article key={item.id} style={{ borderTop: '1px solid #ddd', padding: '16px 0' }}>
          <button type="button" onClick={() => onView(item)}>
            <strong>{item.name}</strong> — £{item.price.toFixed(2)}
          </button>
          <p>{item.description}</p>
          <button type="button" onClick={() => onToggleAvailable(item.id)}>
            {item.available ? 'Mark unavailable' : 'Mark available'}
          </button>
        </article>
      ))}
    </section>
  )
}

type MenuDetailProps = {
  item: MenuItem
  onBack: () => void
  onEdit: () => void
  onDelete: (id: string) => void
  onToggleAvailable: (id: string) => void
}

function MenuDetail({ item, onBack, onEdit, onDelete, onToggleAvailable }: MenuDetailProps) {
  return (
    <section style={{ padding: 24 }}>
      <button type="button" onClick={onBack}>Back</button>
      <h1>{item.name}</h1>
      <p>{item.description}</p>
      <p>{item.category} · £{item.price.toFixed(2)} · {item.preparationTime} min</p>
      <p>{item.available ? 'Available' : 'Unavailable'}</p>
      <button type="button" onClick={() => onToggleAvailable(item.id)}>
        {item.available ? 'Mark unavailable' : 'Mark available'}
      </button>{' '}
      <button type="button" onClick={onEdit}>Edit</button>{' '}
      <button type="button" onClick={() => onDelete(item.id)}>Delete</button>
    </section>
  )
}

function WireframeGallery() {
  return (
    <div style={{ padding: 24 }}>
      <h1>Screen Designs</h1>
      <p>Wireframe previews are unavailable.</p>
    </div>
  )
}

function MenuForm({ item, onSave, onBack }: MenuFormProps) {
  const [form, setForm] = useState<MenuItem>(item ?? {
    id: Date.now().toString(), name: '', category: 'Starters', price: 0,
    description: '', available: true, preparationTime: 0,
  })
  const update = <K extends keyof MenuItem>(key: K, value: MenuItem[K]) =>
    setForm(prev => ({ ...prev, [key]: value }))

  return (
    <form onSubmit={event => { event.preventDefault(); onSave(form) }} style={{ padding: 24 }}>
      <button type="button" onClick={onBack}>Back</button>
      <h1>{item ? 'Edit menu item' : 'Add menu item'}</h1>
      <input required placeholder="Name" value={form.name} onChange={e => update('name', e.target.value)} />
      <select value={form.category} onChange={e => update('category', e.target.value as MenuItem['category'])}>
        {['Starters', 'Mains', 'Desserts', 'Drinks'].map(category => <option key={category}>{category}</option>)}
      </select>
      <input required type="number" min="0" step="0.01" placeholder="Price" value={form.price} onChange={e => update('price', Number(e.target.value))} />
      <textarea required placeholder="Description" value={form.description} onChange={e => update('description', e.target.value)} />
      <input required type="number" min="0" placeholder="Preparation time" value={form.preparationTime} onChange={e => update('preparationTime', Number(e.target.value))} />
      <label><input type="checkbox" checked={form.available} onChange={e => update('available', e.target.checked)} /> Available</label>
      <button type="submit">Save</button>
    </form>
  )
}

export type Screen = 'list' | 'detail' | 'add' | 'edit'

export default function App() {
  const [mode, setMode] = useState<'wireframes' | 'app'>('wireframes')
  const [items, setItems] = useState<MenuItem[]>(INITIAL_ITEMS)
  const [screen, setScreen] = useState<Screen>('list')
  const [selected, setSelected] = useState<MenuItem | null>(null)
  const [filterCategory, setFilterCategory] = useState<string>('All')

  const handleAdd = (item: MenuItem) => { setItems(prev => [...prev, item]); setScreen('list') }
  const handleUpdate = (item: MenuItem) => { setItems(prev => prev.map(i => i.id === item.id ? item : i)); setSelected(item); setScreen('detail') }
  const handleDelete = (id: string) => { setItems(prev => prev.filter(i => i.id !== id)); setScreen('list') }
  const handleToggleAvailable = (id: string) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, available: !i.available } : i))
    if (selected?.id === id) setSelected(prev => prev ? { ...prev, available: !prev.available } : null)
  }
  const handleView = (item: MenuItem) => { setSelected(item); setScreen('detail') }
  const handleBack = () => {
    if (screen === 'detail' || screen === 'add') setScreen('list')
    else if (screen === 'edit') setScreen('detail')
  }

  return (
    <div style={{ fontFamily: 'var(--font-body)' }}>
      {/* Mode toggle bar */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, display: 'flex', justifyContent: 'center', padding: '10px 16px', background: mode === 'wireframes' ? '#ede8e0' : '#1a1410', borderBottom: `1px solid ${mode === 'wireframes' ? '#d5c9b5' : '#2d2620'}` }}>
        <div style={{ display: 'flex', background: mode === 'wireframes' ? '#d5c9b5' : '#2d2620', borderRadius: 24, padding: 3, gap: 2 }}>
          {(['wireframes', 'app'] as const).map(m => (
            <button
              key={m}
              onClick={() => setMode(m)}
              style={{
                padding: '5px 16px',
                borderRadius: 20,
                border: 'none',
                cursor: 'pointer',
                fontSize: 12,
                fontWeight: 700,
                fontFamily: 'var(--font-body)',
                background: mode === m ? (m === 'wireframes' ? '#2a1f12' : '#c87d30') : 'transparent',
                color: mode === m ? (m === 'wireframes' ? '#f0e6d0' : '#1a1410') : '#7a6a55',
              }}
            >
              {m === 'wireframes' ? '📐 Screen Designs' : '📱 Live App'}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ paddingTop: 50 }}>
        {mode === 'wireframes' ? (
          <WireframeGallery />
        ) : (
          <div className="min-h-screen flex items-start justify-center" style={{ background: 'var(--color-canvas)' }}>
            <div className="relative w-full overflow-hidden" style={{ maxWidth: 430, minHeight: '100vh', background: 'var(--color-canvas)', boxShadow: '0 0 80px rgba(0,0,0,0.6)' }}>
              {screen === 'list' && (
                <MenuList items={items} filterCategory={filterCategory} setFilterCategory={setFilterCategory} onView={handleView} onAdd={() => setScreen('add')} onToggleAvailable={handleToggleAvailable} />
              )}
              {screen === 'detail' && selected && (
                <MenuDetail item={items.find(i => i.id === selected.id) ?? selected} onBack={handleBack} onEdit={() => setScreen('edit')} onDelete={handleDelete} onToggleAvailable={handleToggleAvailable} />
              )}
              {screen === 'add' && <MenuForm onSave={handleAdd} onBack={handleBack} />}
              {screen === 'edit' && selected && (
                <MenuForm item={items.find(i => i.id === selected.id) ?? selected} onSave={handleUpdate} onBack={handleBack} />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
