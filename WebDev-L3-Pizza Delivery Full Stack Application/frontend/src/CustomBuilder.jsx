import { useState } from 'react'

const BASES = [
  { name: "Thin Crust", price: 99 },
  { name: "Thick Crust", price: 119 },
  { name: "Cheese Burst", price: 179 },
  { name: "Whole Wheat", price: 129 },
  { name: "Gluten Free", price: 159 },
]

const SAUCES = [
  { name: "Tomato", price: 0 },
  { name: "BBQ", price: 20 },
  { name: "Pesto", price: 30 },
  { name: "Peri Peri", price: 20 },
]

export default function CustomBuilder() {
  const [base, setBase] = useState(null)
  const [sauce, setSauce] = useState(null)
  return (
    <div style={{ background: "white", padding: 20, borderRadius: 20 }}>
      <h2>🍕 Build Your Own Pizza</h2>
      <h3>Step 1: Choose Base</h3>

      {BASES.map(b => (
        <div key={b.name}
          onClick={() => setBase(b)}
          style={{
            padding: 12, marginBottom: 8, borderRadius: 12, cursor: "pointer",
            background: base?.name === b.name ? "#FFF1F1" : "white",
            border: base?.name === b.name ? "2px solid #ff0844" : "1px solid #ddd"
          }}>
          <b>{b.name}</b> - ₹{b.price}
        </div>
      ))}

      {base && <p>You selected: <b>{base.name}</b></p>}
    </div>
  )
}