import { useState } from 'react'
import type { MenuItem } from './types'
import { CATEGORIES } from './types'

interface Props {
  item?: MenuItem
  onSave: (item: MenuItem) => void
  onBack: () => void
}

export default function MenuForm({ item, onSave, onBack }: Props) {
  const isEdit = !!item
  const [name, setName] = useState(item?.name ?? '')
  const [category, setCategory] = useState(item?.category ?? 'Starters')
  const [price, setPrice] = useState(item ? String(item.price) : '')
  const [description, setDescription] = useState(item?.description ?? '')
  const [prepTime, setPrepTime] = useState(item ? String(item.preparationTime) : '')
  const [available, setAvailable] = useState(item?.available ?? true)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const e: Record<string, string> = {}
    if (!name.trim()) e.name = 'Dish name is required.'
    if (!description.trim()) e.description = 'Description is required.'
    if (!price || isNaN(Number(price)) || Number(price) <= 0) e.price = 'Enter a valid price.'
    if (!prepTime || isNaN(Number(prepTime)) || Number(prepTime) <= 0) e.prepTime = 'Enter a valid prep time.'
    return e
  }

  const handleSubmit = () => {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    onSave({
      id: item?.id ?? String(Date.now()),
      name: name.trim(),
      category,
      price: parseFloat(price),
      description: description.trim(),
      preparationTime: parseInt(prepTime),
      available,
    })
  }

  return (
    <div className="flex flex-col" style={{ minHeight: '100vh' }}>
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 pt-14 pb-4" style={{ background: 'var(--color-surface)' }}>
        <button
          onClick={onBack}
          style={{ background: 'none', border: 'none', color: 'var(--color-amber)', fontFamily: 'var(--font-body)', fontSize: 14, cursor: 'pointer' }}
        >
          ← Cancel
        </button>
        <h2 style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 18, color: 'var(--color-cream)' }}>
          {isEdit ? 'Edit Dish' : 'New Dish'}
        </h2>
        <button
          onClick={handleSubmit}
          style={{ background: 'var(--color-amber)', border: 'none', color: '#1a1410', fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 700, cursor: 'pointer', borderRadius: 8, padding: '6px 14px' }}
        >
          {isEdit ? 'Update' : 'Add'}
        </button>
      </div>

      {/* Form */}
      <div className="flex-1 overflow-y-auto px-6 py-6" style={{ background: 'var(--color-canvas)' }}>
        <Field label="Dish Name" error={errors.name}>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="e.g. Bouillabaisse Provençale"
            style={inputStyle}
          />
        </Field>

        <Field label="Category">
          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.map((cat: MenuItem['category']) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 13,
                  fontWeight: 600,
                  padding: '6px 14px',
                  borderRadius: 20,
                  border: 'none',
                  cursor: 'pointer',
                  background: category === cat ? 'var(--color-amber)' : 'var(--color-surface-raised)',
                  color: category === cat ? '#1a1410' : 'var(--color-cream-dim)',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </Field>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Price (R)" error={errors.price}>
            <input
              type="number"
              value={price}
              onChange={e => setPrice(e.target.value)}
              placeholder="0.00"
              min="0"
              step="0.50"
              style={inputStyle}
            />
          </Field>
          <Field label="Prep Time (min)" error={errors.prepTime}>
            <input
              type="number"
              value={prepTime}
              onChange={e => setPrepTime(e.target.value)}
              placeholder="15"
              min="1"
              style={inputStyle}
            />
          </Field>
        </div>

        <Field label="Description" error={errors.description}>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Describe the dish — ingredients, preparation style, serving notes…"
            rows={4}
            style={{ ...inputStyle, resize: 'none', lineHeight: 1.6 }}
          />
        </Field>

        <Field label="Status">
          <button
            onClick={() => setAvailable((a: boolean) => !a)}
            className="flex items-center gap-3 px-4 py-3 rounded-xl w-full"
            style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              cursor: 'pointer',
              textAlign: 'left',
            }}
          >
            <div
              style={{
                width: 40,
                height: 22,
                borderRadius: 11,
                background: available ? 'var(--color-green)' : 'var(--color-surface-raised)',
                position: 'relative',
                transition: 'background 0.2s',
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: 9,
                  background: '#fff',
                  position: 'absolute',
                  top: 2,
                  left: available ? 20 : 2,
                  transition: 'left 0.2s',
                }}
              />
            </div>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: available ? 'var(--color-green)' : 'var(--color-cream-dim)' }}>
              {available ? 'Available on menu' : 'Hidden from menu'}
            </span>
          </button>
        </Field>

        <div style={{ height: 32 }} />

        <button
          onClick={handleSubmit}
          className="w-full py-4 rounded-xl font-bold text-base"
          style={{
            fontFamily: 'var(--font-body)',
            background: 'var(--color-amber)',
            color: '#1a1410',
            border: 'none',
            cursor: 'pointer',
            fontSize: 16,
            letterSpacing: '0.02em',
          }}
        >
          {isEdit ? 'Update Dish' : 'Add to Menu'}
        </button>
      </div>
    </div>
  )
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: 'var(--color-surface)',
  border: '1px solid var(--color-border)',
  borderRadius: 12,
  padding: '12px 14px',
  color: 'var(--color-cream)',
  fontFamily: 'var(--font-body)',
  fontSize: 14,
  outline: 'none',
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <label style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 700, color: 'var(--color-cream-dim)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>
        {label}
      </label>
      {children}
      {error && <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--color-red)', marginTop: 4 }}>{error}</p>}
    </div>
  )
}
