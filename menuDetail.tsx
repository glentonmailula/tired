import type { MenuItem } from './types'

interface Props {
  item: MenuItem
  onBack: () => void
  onEdit: () => void
  onDelete: (id: string) => void
  onToggleAvailable: (id: string) => void
}

const CATEGORY_EMOJI: Record<string, string> = {
  Starters: '🥗',
  Mains: '🍽',
  Desserts: '🍮',
  Drinks: '🍷',
}

export default function MenuDetail({ item, onBack, onEdit, onDelete, onToggleAvailable }: Props) {
  const handleDelete = () => {
    if (window.confirm(`Remove "${item.name}" from the menu?`)) {
      onDelete(item.id)
    }
  }

  return (
    <div className="flex flex-col" style={{ minHeight: '100vh' }}>
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 pt-14 pb-4" style={{ background: 'var(--color-surface)' }}>
        <button
          onClick={onBack}
          style={{ background: 'none', border: 'none', color: 'var(--color-amber)', fontFamily: 'var(--font-body)', fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}
        >
          ← Back
        </button>
        <button
          onClick={onEdit}
          style={{ background: 'var(--color-surface-raised)', border: '1px solid var(--color-border)', color: 'var(--color-cream)', fontFamily: 'var(--font-body)', fontSize: 13, cursor: 'pointer', borderRadius: 8, padding: '6px 14px' }}
        >
          Edit
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-6" style={{ background: 'var(--color-canvas)' }}>
        {/* Category badge */}
        <div className="flex items-center gap-2 mb-4">
          <span
            className="px-3 py-1 rounded-full text-xs font-semibold"
            style={{ fontFamily: 'var(--font-body)', background: 'rgba(212,136,58,0.15)', color: 'var(--color-amber)', border: '1px solid rgba(212,136,58,0.3)' }}
          >
            {CATEGORY_EMOJI[item.category]} {item.category}
          </span>
          <span
            className="px-3 py-1 rounded-full text-xs font-semibold"
            style={{
              fontFamily: 'var(--font-body)',
              background: item.available ? 'rgba(74,124,89,0.15)' : 'rgba(192,64,42,0.15)',
              color: item.available ? 'var(--color-green)' : 'var(--color-red)',
              border: `1px solid ${item.available ? 'rgba(74,124,89,0.4)' : 'rgba(192,64,42,0.4)'}`,
            }}
          >
            {item.available ? '● Available' : '● Off Menu'}
          </span>
        </div>

        {/* Title & price */}
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 700, color: 'var(--color-cream)', lineHeight: 1.2, marginBottom: 4 }}>
          {item.name}
        </h2>
        <p style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 600, color: 'var(--color-amber)', marginBottom: 20 }}>
          R{item.price.toFixed(2)}
        </p>

        {/* Divider */}
        <div style={{ height: 1, background: 'var(--color-border)', marginBottom: 20 }} />

        {/* Description */}
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--color-cream-dim)', lineHeight: 1.65, marginBottom: 24 }}>
          {item.description}
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          <StatTile label="Prep Time" value={`${item.preparationTime} min`} />
          <StatTile label="Category" value={item.category} />
        </div>

        {/* Toggle availability */}
        <button
          onClick={() => onToggleAvailable(item.id)}
          className="w-full py-3 rounded-xl text-sm font-semibold transition-all mb-3"
          style={{
            fontFamily: 'var(--font-body)',
            background: item.available ? 'rgba(192,64,42,0.12)' : 'rgba(74,124,89,0.12)',
            color: item.available ? 'var(--color-red)' : 'var(--color-green)',
            border: `1px solid ${item.available ? 'rgba(192,64,42,0.4)' : 'rgba(74,124,89,0.4)'}`,
            cursor: 'pointer',
          }}
        >
          {item.available ? 'Remove from Menu' : 'Add Back to Menu'}
        </button>

        {/* Delete */}
        <button
          onClick={handleDelete}
          className="w-full py-3 rounded-xl text-sm font-semibold"
          style={{
            fontFamily: 'var(--font-body)',
            background: 'transparent',
            color: 'var(--color-cream-dim)',
            border: '1px solid var(--color-border)',
            cursor: 'pointer',
          }}
        >
          Delete Dish
        </button>
      </div>
    </div>
  )
}

function StatTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl px-4 py-3" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
      <p style={{ fontSize: 11, color: 'var(--color-cream-dim)', fontFamily: 'var(--font-body)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>
        {label}
      </p>
      <p style={{ fontSize: 15, color: 'var(--color-cream)', fontFamily: 'var(--font-display)', fontWeight: 600 }}>
        {value}
      </p>
    </div>
  )
}
