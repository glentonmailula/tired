import type { MenuItem } from './types'
import { CATEGORIES } from './types'

const CATEGORY_EMOJI: Record<string, string> = {
  Starters: '🥗',
  Mains: '🍽',
  Desserts: '🍮',
  Drinks: '🍷',
  All: '📋',
}

interface Props {
  items: MenuItem[]
  filterCategory: string
  setFilterCategory: (c: string) => void
  onView: (item: MenuItem) => void
  onAdd: () => void
  onToggleAvailable: (id: string) => void
}

export default function MenuList({ items, filterCategory, setFilterCategory, onView, onAdd, onToggleAvailable }: Props) {
  const filtered = filterCategory === 'All' ? items : items.filter(i => i.category === filterCategory)
  const grouped = CATEGORIES.reduce<Record<string, MenuItem[]>>((acc: Record<string, MenuItem[]>, cat: string) => {
    const catItems = filtered.filter(i => i.category === cat)
    if (catItems.length) acc[cat] = catItems
    return acc
  }, {})

  const available = items.filter(i => i.available).length

  return (
    <div className="flex flex-col" style={{ minHeight: '100vh' }}>
      {/* Header */}
      <div className="px-6 pt-14 pb-6" style={{ background: 'var(--color-surface)' }}>
        <div className="flex items-start justify-between mb-1">
          <div>
            <p className="text-xs uppercase tracking-widest mb-1" style={{ color: 'var(--color-amber)', fontFamily: 'var(--font-body)', fontWeight: 600, letterSpacing: '0.15em' }}>
              An Evening in Provence
            </p>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 700, color: 'var(--color-cream)', lineHeight: 1.15 }}>
              Menu<br /><em style={{ fontWeight: 400 }}>Manager</em>
            </h1>
          </div>
          <div className="text-right">
            <div style={{ fontSize: 28, fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--color-amber)' }}>{items.length}</div>
            <div style={{ fontSize: 11, color: 'var(--color-cream-dim)', fontFamily: 'var(--font-body)' }}>dishes total</div>
            <div style={{ fontSize: 11, color: 'var(--color-green)', fontFamily: 'var(--font-body)', marginTop: 2 }}>{available} available</div>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 mt-5 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
          {['All', ...CATEGORIES].map(cat => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
              style={{
                fontFamily: 'var(--font-body)',
                background: filterCategory === cat ? 'var(--color-amber)' : 'var(--color-surface-raised)',
                color: filterCategory === cat ? '#1a1410' : 'var(--color-cream-dim)',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              {CATEGORY_EMOJI[cat]} {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Items */}
      <div className="flex-1 overflow-y-auto px-4 py-4" style={{ background: 'var(--color-canvas)' }}>
        {Object.keys(grouped).length === 0 && (
          <div className="text-center py-16" style={{ color: 'var(--color-cream-dim)', fontFamily: 'var(--font-body)' }}>
            No items in this category.
          </div>
        )}
        {(Object.entries(grouped) as [string, MenuItem[]][]).map(([cat, catItems]) => (
          <div key={cat} className="mb-6">
            {filterCategory === 'All' && (
              <div className="flex items-center gap-2 mb-3">
                <span style={{ fontSize: 13, color: 'var(--color-amber)', fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 600 }}>
                  {CATEGORY_EMOJI[cat]} {cat}
                </span>
                <div className="flex-1" style={{ height: 1, background: 'var(--color-border)' }} />
                <span style={{ fontSize: 11, color: 'var(--color-cream-dim)', fontFamily: 'var(--font-body)' }}>{catItems.length}</span>
              </div>
            )}
            <div className="flex flex-col gap-2">
              {catItems.map(item => (
                <MenuCard key={item.id} item={item} onView={onView} onToggleAvailable={onToggleAvailable} />
              ))}
            </div>
          </div>
        ))}
        <div style={{ height: 96 }} />
      </div>

      {/* FAB */}
      <div className="fixed" style={{ bottom: 28, right: 0, left: 0, maxWidth: 430, margin: '0 auto', display: 'flex', justifyContent: 'flex-end', paddingRight: 24, pointerEvents: 'none' }}>
        <button
          onClick={onAdd}
          style={{
            pointerEvents: 'all',
            width: 56,
            height: 56,
            borderRadius: '50%',
            background: 'var(--color-amber)',
            color: '#1a1410',
            border: 'none',
            fontSize: 26,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 4px 24px rgba(212,136,58,0.4)',
          }}
        >
          +
        </button>
      </div>
    </div>
  )
}

function MenuCard({ item, onView, onToggleAvailable }: { item: MenuItem; onView: (i: MenuItem) => void; onToggleAvailable: (id: string) => void }) {
  return (
    <div
      className="flex items-center gap-3 px-4 py-3 rounded-xl"
      style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', cursor: 'pointer' }}
      onClick={() => onView(item)}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p
            className="truncate"
            style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 600, color: item.available ? 'var(--color-cream)' : 'var(--color-cream-dim)' }}
          >
            {item.name}
          </p>
        </div>
        <p className="text-xs mt-0.5 truncate" style={{ color: 'var(--color-cream-dim)', fontFamily: 'var(--font-body)' }}>
          {item.preparationTime} min · {item.description.slice(0, 52)}{item.description.length > 52 ? '…' : ''}
        </p>
      </div>
      <div className="flex flex-col items-end gap-2 flex-shrink-0">
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, color: 'var(--color-amber)' }}>
          R{item.price.toFixed(2)}
        </span>
        <button
          onClick={e => { e.stopPropagation(); onToggleAvailable(item.id) }}
          className="px-2 py-0.5 rounded-full text-xs font-semibold"
          style={{
            fontFamily: 'var(--font-body)',
            background: item.available ? 'rgba(74,124,89,0.2)' : 'rgba(192,64,42,0.2)',
            color: item.available ? 'var(--color-green)' : 'var(--color-red)',
            border: `1px solid ${item.available ? 'var(--color-green)' : 'var(--color-red)'}`,
            cursor: 'pointer',
          }}
        >
          {item.available ? 'On' : 'Off'}
        </button>
      </div>
    </div>
  )
}
