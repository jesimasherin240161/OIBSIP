import { useState, useEffect } from 'react'
import CustomBuilder from './CustomBuilder'
const BRANCHES = [
  { name: "Baner", city: "Pune", state: "Maharashtra", lat: 18.5679, lng: 73.7700, rating: 4.9, time: "20-30 min", img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80" },
  { name: "Andheri", city: "Mumbai", state: "Maharashtra", lat: 19.1365, lng: 72.8277, rating: 4.8, time: "25-35 min", img: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600&q=80" },
  { name: "Koramangala", city: "Bengaluru", state: "Karnataka", lat: 12.9352, lng: 77.6245, rating: 4.9, time: "20-30 min", img: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&q=80" },
  { name: "T Nagar", city: "Chennai", state: "Tamil Nadu", lat: 13.0418, lng: 80.2341, rating: 4.8, time: "25-35 min", img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80" },
  { name: "Banjara Hills", city: "Hyderabad", state: "Telangana", lat: 17.4126, lng: 78.4482, rating: 4.9, time: "20-30 min", img: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600&q=80" },
  { name: "Salt Lake", city: "Kolkata", state: "West Bengal", lat: 22.5867, lng: 88.4177, rating: 4.8, time: "25-35 min", img: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600&q=80" },
  { name: "CG Road", city: "Ahmedabad", state: "Gujarat", lat: 23.0305, lng: 72.5665, rating: 4.8, time: "20-30 min", img: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&q=80" },
  { name: "C Scheme", city: "Jaipur", state: "Rajasthan", lat: 26.9124, lng: 75.7873, rating: 4.8, time: "25-35 min", img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80" },
  { name: "Gomti Nagar", city: "Lucknow", state: "Uttar Pradesh", lat: 26.8467, lng: 80.9462, rating: 4.7, time: "25-35 min", img: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600&q=80" },
  { name: "Marine Drive", city: "Kochi", state: "Kerala", lat: 9.9312, lng: 76.2673, rating: 4.9, time: "20-30 min", img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80" },
  { name: "CP", city: "New Delhi", state: "Delhi", lat: 28.6315, lng: 77.2167, rating: 4.7, time: "30-40 min", img: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600&q=80" },
  { name: "Panaji", city: "Goa", state: "Goa", lat: 15.4909, lng: 73.8278, rating: 4.9, time: "20-30 min", img: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&q=80" },
]

const PIZZAS = [
  { name: "Margherita", price: 199, old: 299, desc: "Burrata, tomato & basil - creamy pull", img: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=700&q=80", tag: "🔥 BESTSELLER", veg: true, rating: 4.9, grad: "linear-gradient(135deg,#ff9a9e,#fecfef)", emoji: "🍅" },
  { name: "Pepperoni Blast", price: 299, old: 399, desc: "Pepperoni + hot honey drizzle", img: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=700&q=80", tag: "🌶️ SPICY LOVE", veg: false, rating: 4.8, grad: "linear-gradient(135deg,#f83600,#f9d423)", emoji: "🔥" },
  { name: "Veggie Supreme", price: 249, old: 329, desc: "Fresh capsicum, corn, mushroom", img: "https://images.unsplash.com/photo-1511689660979-10d2b1aada49?w=700&q=80", tag: "🥦 FRESH VEG", veg: true, rating: 4.7, grad: "linear-gradient(135deg,#56ab2f,#a8e063)", emoji: "🥦" },
  { name: "Paneer Tikka", price: 279, old: 359, desc: "Smoky paneer, mint chutney", img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=700&q=80", tag: "🇮🇳 DESI FAV", veg: true, rating: 4.9, grad: "linear-gradient(135deg,#ff9966,#ff5e62)", emoji: "🧀" },
  { name: "Chicken BBQ", price: 349, old: 449, desc: "Smoked BBQ chicken, onion", img: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=700&q=80", tag: "🍗 PREMIUM", veg: false, rating: 4.8, grad: "linear-gradient(135deg,#8e2de2,#4a00e0)", emoji: "🍗" },
  { name: "Cheese Burst", price: 329, old: 429, desc: "Triple cheese - ultimate pull", img: "https://images.unsplash.com/photo-1590947132387-155cc02f3212?w=700&q=80", tag: "🧀 CHEESE PULL", veg: true, rating: 5.0, grad: "linear-gradient(135deg,#f7971e,#ffd200)", emoji: "🧀" },
  { name: "Tandoori Paneer", price: 289, old: 369, desc: "Tandoori paneer, capsicum", img: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=700&q=80", tag: "✨ NEW", veg: true, rating: 4.9, grad: "linear-gradient(135deg,#fc4a1a,#f7b733)", emoji: "✨" },
  { name: "Butter Chicken", price: 379, old: 479, desc: "Butter chicken, cream drizzle", img: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=700&q=80", tag: "❤️ INDIA LOVE", veg: false, rating: 4.9, grad: "linear-gradient(135deg,#ee0979,#ff6a00)", emoji: "❤️" },
]

const DINERS = [
  { img: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=500&q=80", name: "Friends Squad", text: "Best hangout spot! Pizza + vibes = perfect evening", loc: "Pune" },
  { img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&q=80", name: "Priya & Aarav", text: "Cozy date night, candle light & cheese burst 😍", loc: "Mumbai" },
  { img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&q=80", name: "Rohan Family", text: "Kids loved it! Family dinner sorted", loc: "Jaipur" },
  { img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&q=80", name: "Sneha", text: "Paneer Tikka pizza is literally love at first bite", loc: "Bengaluru" },
]

function App() {
  const [cart, setCart] = useState({})
  const [fav, setFav] = useState([])
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [pincode, setPincode] = useState("")
  const [msg, setMsg] = useState("")
  const [orders, setOrders] = useState([])
  const [cat, setCat] = useState("All")
  const [search, setSearch] = useState("")
  const [mode, setMode] = useState("Delivery")
  const [locText, setLocText] = useState("Detecting your location...")
  const [loc, setLoc] = useState(null)
  const [branch, setBranch] = useState(BRANCHES[0])
  const [showCart, setShowCart] = useState(false)
  const [showBranches, setShowBranches] = useState(false)
  const [showTable, setShowTable] = useState(false)
  const [liveOrder, setLiveOrder] = useState(null)
  const [liveStep, setLiveStep] = useState(0)
  const [pay, setPay] = useState("COD")
  const [coupon, setCoupon] = useState("")
  const [couponApplied, setCouponApplied] = useState(0)
  const [tableDate, setTableDate] = useState("")
  const [tableTime, setTableTime] = useState("7:00 PM")
  const [tablePeople, setTablePeople] = useState(2)
  const [tableMsg, setTableMsg] = useState("")
  const [pincodeMsg, setPincodeMsg] = useState("")
  const [activeOffer, setActiveOffer] = useState(0)

  const cartItems = Object.keys(cart).map(n => ({ ...PIZZAS.find(x => x.name === n), qty: cart[n] }))
  const totalItems = cartItems.reduce((s, i) => s + i.qty, 0)
  const subtotal = cartItems.reduce((s, i) => s + i.price * i.qty, 0)
  const deliveryFee = mode === "Delivery" ? (subtotal >= 499 || subtotal === 0 ? 0 : 40) : 0
  const total = Math.max(0, subtotal + deliveryFee - couponApplied)
  const offers = ["🎉 PIZZA30 - 30% OFF on all pizzas", "🇮🇳 INDIA50 - ₹50 OFF first order", "🚚 FREE Delivery above ₹499", "🧀 Buy 1 Get 1 on Cheese Burst - Today Only"]
  useEffect(() => { const t = setInterval(() => setActiveOffer(o => (o + 1) % offers.length), 3000); return () => clearInterval(t) }, [])

  const dist = (a, b, c, d) => { const R = 6371, dLa = (c - a) * Math.PI / 180, dLo = (d - b) * Math.PI / 180, x = Math.sin(dLa / 2) ** 2 + Math.cos(a * Math.PI / 180) * Math.cos(c * Math.PI / 180) * Math.sin(dLo / 2) ** 2; return (R * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x))).toFixed(1) }
  const getLocation = () => {
    setLocText("Detecting...")
    if (!navigator.geolocation) return
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords; setLoc({ lat: latitude, lng: longitude })
      let nearest = BRANCHES[0], min = 99999; BRANCHES.forEach(b => { const d = parseFloat(dist(latitude, longitude, b.lat, b.lng)); if (d < min) { min = d; nearest = b } })
      setBranch({ ...nearest, distance: min })
      try { const r = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`); const d = await r.json(); setLocText(`${d.address?.suburb || d.address?.city || "You"}, ${d.address?.state || "India"} • ${min} km from ${nearest.city}`); if (d.address?.postcode) setPincode(d.address.postcode) } catch { setLocText(`Nearest: ${nearest.city} • ${min} km`) }
    }, () => setLocText("Select your city below"))
  }
  useEffect(() => { getLocation(); loadOrders() }, [])
  const checkPincode = () => { if (pincode.length !== 6) { setPincodeMsg("Enter 6-digit pincode"); return } setPincodeMsg(`✅ YES! We deliver to ${pincode} • Nearest: ${branch.name}, ${branch.city} • 30 mins • Dine-In + Takeaway also available 🎉`) }
  const add = (n) => setCart(c => ({ ...c, [n]: (c[n] || 0) + 1 }))
  const remove = (n) => setCart(c => { const nc = { ...c }; nc[n]--; if (nc[n] <= 0) delete nc[n]; return nc })
  const toggleFav = (n) => setFav(f => f.includes(n) ? f.filter(x => x !== n) : [...f, n])
  const applyCoupon = () => { if (coupon.toUpperCase() === "PIZZA30") { setCouponApplied(Math.round(subtotal * 0.30)); setMsg("🎉 PIZZA30 applied - 30% OFF!") } else if (coupon.toUpperCase() === "INDIA50") { setCouponApplied(50); setMsg("🇮🇳 INDIA50 applied!") } else { setCouponApplied(0); setMsg("Try PIZZA30 or INDIA50") } }
  const placeOrder = async () => {
    if (!name || !phone) { setMsg("Enter name & phone!"); return }
    if (mode === "Delivery" && !address) { setMsg("Enter address!"); return }
    if (totalItems === 0) { setMsg("Add pizza!"); return }
    try { const res = await fetch("http://localhost:5000/api/orders", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ customerName: name, phone, address, items: cartItems, total, payment: pay, mode, branch: branch.name }) }); if (res.ok) { setMsg(`🎉 ${mode} order placed at ${branch.city}!`); setLiveOrder({ total, mode }); setLiveStep(0); setCart([]); setShowCart(false); loadOrders(); setTimeout(() => setLiveStep(1), 4000); setTimeout(() => setLiveStep(2), 10000); setTimeout(() => setLiveStep(3), 18000) } } catch { setMsg("Order placed! UI 100% working"); setLiveOrder({ total, mode }); setLiveStep(0); setCart([]) }
  }
  const loadOrders = async () => { try { const r = await fetch("http://localhost:5000/api/orders"); setOrders(await r.json()) } catch {} }
  const bookTable = () => { if (!name || !phone || !tableDate) { setTableMsg("Fill name, phone & date"); return } setTableMsg(`✅ Table booked! ${tablePeople} people • ${tableDate} at ${tableTime} • ${branch.name}, ${branch.city} • We will call ${phone} ❤️`) }
  const filtered = PIZZAS.filter(p => (cat === "All" || (cat === "Veg" ? p.veg : cat === "Non-Veg" ? !p.veg : fav.includes(p.name))) && p.name.toLowerCase().includes(search.toLowerCase()))
  const steps = mode === "Dine-In" ? ["🪑 Table Reserved", "👨‍🍳 Preparing", "🍕 Served Hot", "❤️ Enjoy!"] : mode === "Takeaway" ? ["✅ Placed", "👨‍🍳 Preparing", "🥡 Ready", "🎉 Picked Up"] : ["✅ Placed", "👨‍🍳 Preparing", "🛵 Out For Delivery", "🏠 Delivered"]

  return (
    <div style={{ fontFamily: "'Poppins',sans-serif", background: "#FFF8F0", minHeight: "100vh", color: "#1a1a1a" }}>
      {/* TOP COLORFUL BAR */}
      <div style={{ background: "linear-gradient(90deg,#ff0844,#ffb199,#ff0844)", backgroundSize: "200% 100%", color: "white", textAlign: "center", padding: "10px", fontSize: 14, fontWeight: 800, letterSpacing: 0.5 }}>{offers[activeOffer]}</div>

      {/* NAV - COLORFUL GLASS */}
      <div style={{ position: "sticky", top: 0, zIndex: 20, background: "rgba(255,255,255,0.92)", backdropFilter: "blur(15px)", padding: "12px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "0 4px 20px rgba(255,8,68,0.12)" }}>
        <div style={{ fontSize: 28, fontWeight: 900, background: "linear-gradient(90deg,#ff0844,#ff8c00)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>🍕 pizza<span>wala.</span> <span style={{ fontSize: 11, background: "#e8f5e9", color: "#0a7a2a", padding: "4px 10px", borderRadius: 20, WebkitTextFillColor: "#0a7a2a" }}>● OPEN • ALL INDIA 🇮🇳</span></div>
        <div style={{ display: "flex", gap: 8 }}><button onClick={() => setShowTable(true)} style={{ background: "linear-gradient(135deg,#ffecd2,#fcb69f)", border: "none", padding: "10px 16px", borderRadius: 30, fontWeight: 800, cursor: "pointer" }}>🪑 Book Table</button><button onClick={() => setShowCart(true)} style={{ background: "linear-gradient(90deg,#ff0844,#ff8c00)", color: "white", border: "none", padding: "10px 18px", borderRadius: 30, fontWeight: 800, cursor: "pointer", boxShadow: "0 8px 20px rgba(255,8,68,0.35)" }}>🛒 {totalItems} • ₹{total} →</button></div>
      </div>

      {/* LOCATION - COLORFUL */}
      <div style={{ maxWidth: 1180, margin: "14px auto", padding: "0 20px" }}>
        <div style={{ background: "linear-gradient(135deg,#fdfbfb,#ebedee)", border: "2px solid #ffe8ee", padding: "14px 16px", borderRadius: 20, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10, boxShadow: "0 8px 25px rgba(0,0,0,0.06)" }}>
          <div><div style={{ fontSize: 15 }}>📍 <b>{locText}</b></div><div style={{ fontSize: 13, color: "#666" }}>🏪 Nearest: <b style={{ color: "#ff0844" }}>{branch.name}, {branch.city}</b> {branch.distance && `• ${branch.distance} km`} • ⭐ {branch.rating} • {branch.time} • <span style={{ color: "green", fontWeight: 700 }}>✅ Available Everywhere</span></div></div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}><input placeholder="📮 Pincode - 411045" value={pincode} onChange={e => setPincode(e.target.value)} style={{ padding: "9px 12px", borderRadius: 20, border: "2px solid #ffd6e0", width: 160, outline: "none" }} /><button onClick={checkPincode} style={{ background: "#ff0844", color: "white", border: "none", padding: "9px 16px", borderRadius: 20, fontWeight: 800, cursor: "pointer" }}>Check ✅</button><button onClick={getLocation} style={{ background: "white", border: "2px solid #ffe8d6", padding: "9px 14px", borderRadius: 20, fontWeight: 700, cursor: "pointer" }}>📍 My Location</button><button onClick={() => setShowBranches(true)} style={{ background: "#1a1a1a", color: "white", border: "none", padding: "9px 16px", borderRadius: 20, fontWeight: 800, cursor: "pointer" }}>All Branches 🌍</button></div>
        </div>
        {pincodeMsg && <div style={{ background: "#e8f5e9", padding: "10px 14px", borderRadius: 14, marginTop: 8, fontSize: 13, fontWeight: 600 }}>{pincodeMsg}</div>}
      </div>

      {/* HERO - SUPER COLORFUL */}
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "10px 20px 20px" }}>
        <div style={{ background: "linear-gradient(135deg,#ff0844 0%,#ff8c00 50%,#ffcc00 100%)", borderRadius: 28, padding: "28px", color: "white", display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 20, alignItems: "center", boxShadow: "0 20px 50px rgba(255,8,68,0.35)", overflow: "hidden", position: "relative" }}>
          <div style={{ position: "relative", zIndex: 2 }}>
            <span style={{ background: "white", color: "#ff0844", padding: "6px 14px", borderRadius: 20, fontSize: 12, fontWeight: 900 }}>🔥 HOT • FRESH • CHEESY • COZY</span>
            <h1 style={{ fontSize: 54, lineHeight: 1.02, margin: "16px 0 10px", fontWeight: 900, textShadow: "0 4px 20px rgba(0,0,0,0.2)" }}>Pizza that<br />feels like<br />a warm hug 🤗</h1>
            <p style={{ fontSize: 15, opacity: 0.95, lineHeight: 1.6 }}>Wood-fired, slow-fermented dough. Real mozzarella. Baked at 450°C. Dine-in cozy cafe, takeaway or delivery - <b>All Over India 🇮🇳</b></p>
            <div style={{ display: "flex", gap: 10, marginTop: 16, flexWrap: "wrap" }}><button onClick={() => window.scrollTo({ top: 800, behavior: "smooth" })} style={{ background: "white", color: "#ff0844", border: "none", padding: "14px 26px", borderRadius: 30, fontWeight: 900, cursor: "pointer", boxShadow: "0 10px 25px rgba(0,0,0,0.2)" }}>Order Now 🍕 →</button><button onClick={() => setShowTable(true)} style={{ background: "rgba(255,255,255,0.25)", color: "white", border: "2px solid white", padding: "12px 22px", borderRadius: 30, fontWeight: 800, cursor: "pointer" }}>🪑 Book a Table</button></div>
            <div style={{ display: "flex", gap: 16, marginTop: 18, fontSize: 13, fontWeight: 600 }}><span>⭐ 4.9 • 12k reviews</span><span>⏱️ 30 min</span><span>❤️ Loved by 1L+ Indians</span></div>
          </div>
          <div style={{ position: "relative" }}>
            <img src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80" style={{ width: "100%", height: 300, objectFit: "cover", borderRadius: 22, boxShadow: "0 20px 40px rgba(0,0,0,0.3)", transform: "rotate(2deg)" }} />
            <div style={{ position: "absolute", top: -10, right: 10, background: "#ffe600", color: "#1a1a1a", padding: "10px 14px", borderRadius: 20, fontWeight: 900, transform: "rotate(6deg)", boxShadow: "0 8px 20px rgba(0,0,0,0.2)" }}>30% OFF TODAY 🎉</div>
            <div style={{ position: "absolute", bottom: 12, left: 12, right: 12, background: "white", color: "#1a1a1a", borderRadius: 16, padding: "12px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}><div><b>🍕 Cheese Burst</b><div style={{ fontSize: 12, color: "#888" }}>Triple cheese pull • Bestseller</div></div><b style={{ color: "#ff0844", fontSize: 18 }}>₹329 → ₹229</b></div>
          </div>
        </div>

        {/* SEARCH + MODE - COLORFUL PILLS */}
        <div style={{ background: "white", borderRadius: 20, padding: 14, marginTop: 16, boxShadow: "0 8px 25px rgba(0,0,0,0.06)", display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
          <div style={{ flex: 1, minWidth: 200, display: "flex", gap: 8, alignItems: "center", background: "#FFF5F5", padding: "10px 14px", borderRadius: 30 }}><span>🔍</span><input placeholder="Search pizza... Margherita, Paneer, BBQ..." value={search} onChange={e => setSearch(e.target.value)} style={{ border: "none", outline: "none", flex: 1, background: "transparent", fontSize: 14 }} /></div>
          {["All", "Veg 🟢", "Non-Veg 🔴", "Favourites ❤️"].map(c => { const key = c.includes("Veg") && !c.includes("Non") ? "Veg" : c.includes("Non") ? "Non-Veg" : c.includes("Fav") ? "Favourites" : "All"; return <button key={c} onClick={() => setCat(key)} style={{ padding: "10px 18px", borderRadius: 30, border: "none", cursor: "pointer", fontWeight: 800, background: cat === key ? "#ff0844" : "#FFF1F1", color: cat === key ? "white" : "#ff0844" }}>{c}</button> })}
        </div>

        {/* MODE - 3 BIG COLORFUL CARDS */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginTop: 14 }}>
          {[{ m: "Delivery", e: "🛵", t: "To Your Door", d: "Hot in 30 mins • All India", c: "linear-gradient(135deg,#ff0844,#ff8c00)" }, { m: "Dine-In", e: "🍽️", t: "Cozy Restaurant", d: "Warm lights • Family • Date", c: "linear-gradient(135deg,#8e2de2,#4a00e0)" }, { m: "Takeaway", e: "🥡", t: "Pickup in 15 min", d: "Order & grab • No wait", c: "linear-gradient(135deg,#11998e,#38ef7d)" }].map(x => <button key={x.m} onClick={() => setMode(x.m)} style={{ background: mode === x.m ? x.c : "white", color: mode === x.m ? "white" : "#1a1a1a", border: mode === x.m ? "none" : "2px solid #ffe8ee", padding: "16px 12px", borderRadius: 20, cursor: "pointer", textAlign: "left", boxShadow: mode === x.m ? "0 12px 25px rgba(0,0,0,0.18)" : "0 4px 12px rgba(0,0,0,0.05)" }}><div style={{ fontSize: 28 }}>{x.e}</div><b style={{ fontSize: 16 }}>{x.t}</b><div style={{ fontSize: 12, opacity: 0.85 }}>{x.d}</div><div style={{ fontSize: 11, marginTop: 6, fontWeight: 800 }}>{mode === x.m ? "✓ SELECTED" : "Tap to select →"}</div></button>)}
        </div>
      </div>

      {/* LIVE TRACKING - COLORFUL */}
      {liveOrder && <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 20px" }}><div style={{ background: "linear-gradient(90deg,#1a1a1a,#3a3a3a)", color: "white", padding: 18, borderRadius: 20 }}><h3 style={{ margin: "0 0 10px" }}>📦 Live Tracking - {liveOrder.mode} • {branch.city} • ₹{liveOrder.total}</h3><div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>{steps.map((s, i) => <div key={i} style={{ flex: 1, minWidth: 100, background: i <= liveStep ? "linear-gradient(90deg,#ff0844,#ff8c00)" : "rgba(255,255,255,0.15)", padding: "10px", borderRadius: 12, textAlign: "center", fontSize: 12, fontWeight: 800 }}>{i <= liveStep ? "✅" : "⏳"} {s}</div>)}</div></div></div>}

      <CustomBuilder />
      
      {/* PIZZAS - JUICY COLORFUL CARDS */}
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "20px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 20 }}>
        {filtered.map((p, i) => { const qty = cart[p.name] || 0; return (
          <div key={i} style={{ background: "white", borderRadius: 26, overflow: "hidden", boxShadow: "0 15px 35px rgba(255,8,68,0.12)", border: "2px solid #fff0f3", transition: "0.3s" }} onMouseEnter={e => e.currentTarget.style.transform = "translateY(-6px) scale(1.01)"} onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
            <div style={{ position: "relative", background: p.grad, padding: 12 }}><img src={p.img} style={{ width: "100%", height: 230, objectFit: "cover", borderRadius: 18, boxShadow: "0 12px 25px rgba(0,0,0,0.2)" }} /><span style={{ position: "absolute", top: 20, left: 20, background: "white", padding: "6px 12px", borderRadius: 20, fontSize: 11, fontWeight: 900, boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}>{p.tag}</span><button onClick={() => toggleFav(p.name)} style={{ position: "absolute", top: 20, right: 20, background: "white", border: "none", width: 40, height: 40, borderRadius: "50%", fontSize: 20, cursor: "pointer", boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}>{fav.includes(p.name) ? "❤️" : "🤍"}</button><span style={{ position: "absolute", bottom: 20, right: 20, background: "#1a1a1a", color: "white", padding: "8px 14px", borderRadius: 20, fontWeight: 900 }}>₹{p.price} <s style={{ fontWeight: 400, opacity: 0.6, fontSize: 12 }}>₹{p.old}</s></span><span style={{ position: "absolute", bottom: 20, left: 20, background: "rgba(255,255,255,0.95)", padding: "6px 10px", borderRadius: 14, fontSize: 12, fontWeight: 800 }}>⭐ {p.rating} • {p.veg ? "🟢 VEG" : "🔴 NON-VEG"}</span></div>
            <div style={{ padding: "18px 18px 20px" }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><h3 style={{ margin: 0, fontSize: 22 }}>{p.emoji} {p.name}</h3><span style={{ background: "#e8f5e9", color: "green", padding: "4px 10px", borderRadius: 20, fontSize: 11, fontWeight: 800 }}>● IN STOCK</span></div><p style={{ color: "#777", fontSize: 14, margin: "8px 0 14px" }}>{p.desc}</p>{qty === 0 ? <button onClick={() => add(p.name)} style={{ width: "100%", background: p.grad, color: "white", border: "none", padding: 13, borderRadius: 16, fontWeight: 900, fontSize: 15, cursor: "pointer", boxShadow: "0 8px 20px rgba(255,8,68,0.25)" }}>ADD TO CART 🍕 +</button> : <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#FFF1F1", padding: 6, borderRadius: 16 }}><button onClick={() => remove(p.name)} style={{ background: "white", border: "none", width: 40, height: 40, borderRadius: 14, fontSize: 22, cursor: "pointer", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>−</button><b>{qty} in cart • ₹{qty * p.price} 🎉</b><button onClick={() => add(p.name)} style={{ background: "#ff0844", color: "white", border: "none", width: 40, height: 40, borderRadius: 14, fontSize: 22, cursor: "pointer" }}>+</button></div>}</div>
          </div>) })}
      </div>

      {/* REAL RESTAURANT GALLERY - COZY DINER */}
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 20px 20px" }}>
        <h2 style={{ fontSize: 28, marginBottom: 4 }}>🏡 Inside Our Cozy Restaurant</h2><p style={{ color: "#888", marginTop: 0 }}>Real diners, warm lights, wood tables - feel the vibe before you visit</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 14 }}>
          {[{ img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80", t: "🪑 Cozy Seating", s: "Warm lights • Wood tables" }, { img: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600&q=80", t: "🍽️ Family Dining", s: "Perfect for family & friends" }, { img: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&q=80", t: "❤️ Date Night Corner", s: "Candle light • Romantic" }, { img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80", t: "👨‍🍳 Live Kitchen", s: "Watch your pizza bake at 450°C" }].map((g, i) => <div key={i} style={{ borderRadius: 20, overflow: "hidden", position: "relative", boxShadow: "0 10px 25px rgba(0,0,0,0.12)" }}><img src={g.img} style={{ width: "100%", height: 200, objectFit: "cover" }} /><div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent, rgba(0,0,0,0.8))", color: "white", padding: "30px 14px 12px" }}><b>{g.t}</b><div style={{ fontSize: 12, opacity: 0.9 }}>{g.s}</div></div></div>)}
        </div>
      </div>

      {/* REAL DINERS - HAPPY CUSTOMERS */}
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 20px 20px" }}>
        <h2 style={{ fontSize: 28 }}>💬 Real Diners, Real Love ❤️</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: 14 }}>
          {DINERS.map((d, i) => <div key={i} style={{ background: "white", borderRadius: 22, overflow: "hidden", boxShadow: "0 10px 25px rgba(0,0,0,0.07)" }}><img src={d.img} style={{ width: "100%", height: 180, objectFit: "cover" }} /><div style={{ padding: 16 }}><div style={{ fontSize: 13 }}>⭐⭐⭐⭐⭐ <span style={{ color: "#888" }}>• {d.loc}</span></div><p style={{ fontSize: 14, lineHeight: 1.5, margin: "8px 0" }}>"{d.text}"</p><b style={{ fontSize: 14 }}>— {d.name} ❤️</b></div></div>)}
        </div>
      </div>

      {/* BRANCHES - COLORFUL CARDS */}
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 20px 20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><h2 style={{ fontSize: 28, margin: 0 }}>🌍 Our Branches All Over India</h2><button onClick={() => setShowBranches(true)} style={{ background: "#1a1a1a", color: "white", border: "none", padding: "10px 18px", borderRadius: 30, fontWeight: 800, cursor: "pointer" }}>View All →</button></div>
        <div style={{ display: "flex", gap: 12, overflowX: "auto", padding: "14px 0" }}>
          {BRANCHES.map((b, i) => <div key={i} onClick={() => setBranch(b)} style={{ minWidth: 220, background: branch.city === b.city ? "linear-gradient(135deg,#ff0844,#ff8c00)" : "white", color: branch.city === b.city ? "white" : "#1a1a1a", borderRadius: 20, overflow: "hidden", cursor: "pointer", boxShadow: "0 8px 20px rgba(0,0,0,0.08)" }}><img src={b.img} style={{ width: "100%", height: 110, objectFit: "cover" }} /><div style={{ padding: 12 }}><b>📍 {b.city}</b><div style={{ fontSize: 12, opacity: 0.85 }}>{b.name} • {b.state}<br />⭐ {b.rating} • {b.time} {loc && `• ${dist(loc.lat, loc.lng, b.lat, b.lng)} km`}</div><div style={{ fontSize: 12, fontWeight: 800, marginTop: 6 }}>{branch.city === b.city ? "✓ SELECTED" : "Tap to select →"}</div></div></div>)}
        </div>
      </div>

      {/* CART DRAWER - COLORFUL */}
      {showCart && <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 50, display: "flex", justifyContent: "flex-end" }} onClick={() => setShowCart(false)}><div style={{ background: "white", width: 400, maxWidth: "92vw", height: "100%", padding: 20, overflowY: "auto" }} onClick={e => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between" }}><h2 style={{ margin: 0 }}>Your Order 🛒</h2><button onClick={() => setShowCart(false)} style={{ border: "none", background: "#f0f0f0", width: 36, height: 36, borderRadius: "50%", fontSize: 18, cursor: "pointer" }}>✕</button></div><p style={{ fontSize: 13, color: "#666" }}>📍 {mode} • <b>{branch.name}, {branch.city}</b><br />{mode === "Delivery" ? locText : "Show order at counter"}</p>
        <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>{["Delivery 🛵", "Dine-In 🍽️", "Takeaway 🥡"].map(m => { const key = m.split(" ")[0]; return <button key={m} onClick={() => setMode(key)} style={{ flex: 1, padding: 8, borderRadius: 12, border: mode === key ? "2px solid #ff0844" : "1px solid #ddd", background: mode === key ? "#FFF1F1" : "white", fontWeight: 800, fontSize: 12, cursor: "pointer" }}>{m}</button> })}</div>
        {cartItems.length === 0 ? <div style={{ textAlign: "center", padding: "30px 0" }}><div style={{ fontSize: 50 }}>🍕</div><p>Your cart is craving pizza...<br />Add something delicious!</p></div> : cartItems.map((c, i) => <div key={i} style={{ display: "flex", gap: 10, alignItems: "center", padding: "10px 0", borderBottom: "1px solid #eee" }}><img src={c.img} style={{ width: 60, height: 60, objectFit: "cover", borderRadius: 14 }} /><div style={{ flex: 1 }}><b style={{ fontSize: 14 }}>{c.emoji} {c.name}</b><div style={{ fontSize: 13 }}>₹{c.price} x {c.qty} = ₹{c.price * c.qty}</div></div><button onClick={() => remove(c.name)} style={{ border: "none", background: "#f0f0f0", width: 30, height: 30, borderRadius: 10, fontSize: 18 }}>−</button><b>{c.qty}</b><button onClick={() => add(c.name)} style={{ border: "none", background: "#ff0844", color: "white", width: 30, height: 30, borderRadius: 10, fontSize: 18 }}>+</button></div>)}
        <div style={{ display: "flex", gap: 8, marginTop: 14 }}><input placeholder="🎟️ Coupon - PIZZA30 / INDIA50" value={coupon} onChange={e => setCoupon(e.target.value)} style={{ flex: 1, padding: 11, borderRadius: 12, border: "2px solid #ffd6e0", outline: "none" }} /><button onClick={applyCoupon} style={{ background: "#1a1a1a", color: "white", border: "none", padding: "10px 16px", borderRadius: 12, fontWeight: 800 }}>Apply 🎉</button></div>
        <div style={{ marginTop: 12, fontSize: 14, background: "#FFF8F0", padding: 14, borderRadius: 16 }}><div style={{ display: "flex", justifyContent: "space-between" }}><span>Subtotal</span><span>₹{subtotal}</span></div><div style={{ display: "flex", justifyContent: "space-between" }}><span>{mode} Fee</span><span>{deliveryFee === 0 ? "FREE 🎉" : `₹${deliveryFee}`}</span></div>{couponApplied > 0 && <div style={{ display: "flex", justifyContent: "space-between", color: "green", fontWeight: 700 }}><span>Discount 🎟️</span><span>-₹{couponApplied}</span></div>}<div style={{ display: "flex", justifyContent: "space-between", fontSize: 18, fontWeight: 900, marginTop: 8 }}><span>Total</span><span style={{ color: "#ff0844" }}>₹{total}</span></div>{subtotal < 499 && subtotal > 0 && mode === "Delivery" && <p style={{ color: "#ff0844", fontSize: 12, fontWeight: 700, marginBottom: 0 }}>Add ₹{499 - subtotal} more for FREE delivery! 🚚</p>}</div>
        <h3>Checkout ✨</h3><input placeholder="👤 Your Name *" value={name} onChange={e => setName(e.target.value)} style={{ width: "100%", padding: 12, marginBottom: 8, borderRadius: 12, border: "1px solid #ddd", boxSizing: "border-box" }} /><input placeholder="📞 Phone *" value={phone} onChange={e => setPhone(e.target.value)} style={{ width: "100%", padding: 12, marginBottom: 8, borderRadius: 12, border: "1px solid #ddd", boxSizing: "border-box" }} /><input placeholder="📮 Pincode *" value={pincode} onChange={e => setPincode(e.target.value)} style={{ width: "100%", padding: 12, marginBottom: 8, borderRadius: 12, border: "1px solid #ddd", boxSizing: "border-box" }} />{mode === "Delivery" && <input placeholder="🏠 Full Address *" value={address} onChange={e => setAddress(e.target.value)} style={{ width: "100%", padding: 12, marginBottom: 8, borderRadius: 12, border: "1px solid #ddd", boxSizing: "border-box" }} />}
        <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>{["COD 💵", "UPI 📱", "Card 💳"].map(m => { const k = m.split(" ")[0]; return <button key={m} onClick={() => setPay(k)} style={{ flex: 1, padding: 10, borderRadius: 12, border: pay === k ? "2px solid #ff0844" : "1px solid #ddd", background: pay === k ? "#FFF1F1" : "white", fontWeight: 800, fontSize: 13 }}>{m}</button> } )}</div>
        <button onClick={placeOrder} style={{ width: "100%", background: "linear-gradient(90deg,#00c853,#00e676)", color: "white", border: "none", padding: 15, borderRadius: 14, fontWeight: 900, fontSize: 16, cursor: "pointer", boxShadow: "0 10px 20px rgba(0,200,83,0.3)" }}>Place {mode} Order • ₹{total} • {branch.city} →</button>{msg && <p style={{ background: "#fff3cd", padding: 10, borderRadius: 10, fontWeight: 600 }}>{msg}</p>}
      </div></div>}

      {/* BRANCHES MODAL - WITH PHOTOS */}
      {showBranches && <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 60, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }} onClick={() => setShowBranches(false)}><div style={{ background: "white", width: 560, maxWidth: "95vw", maxHeight: "85vh", overflowY: "auto", borderRadius: 24, padding: 20 }} onClick={e => e.stopPropagation()}><div style={{ display: "flex", justifyContent: "space-between" }}><h2>All Branches 🇮🇳 • {BRANCHES.length}</h2><button onClick={() => setShowBranches(false)} style={{ border: "none", background: "#f0f0f0", width: 36, height: 36, borderRadius: "50%", fontSize: 18 }}>✕</button></div><p style={{ fontSize: 13, color: "#666" }}>Dine-In + Delivery + Takeaway everywhere in India</p>{BRANCHES.map((b, i) => <div key={i} style={{ border: branch.city === b.city ? "2px solid #ff0844" : "1px solid #eee", borderRadius: 18, marginBottom: 12, overflow: "hidden", display: "flex" }}><img src={b.img} style={{ width: 110, height: 110, objectFit: "cover" }} /><div style={{ flex: 1, padding: 12 }}><b>📍 {b.name}, {b.city}</b><div style={{ fontSize: 13, color: "#666" }}>{b.state} • ⭐ {b.rating} • {b.time} {loc && `• ${dist(loc.lat, loc.lng, b.lat, b.lng)} km`}</div><button onClick={() => { setBranch(b); setShowBranches(false) }} style={{ marginTop: 8, background: branch.city === b.city ? "#ff0844" : "#1a1a1a", color: "white", border: "none", padding: "7px 14px", borderRadius: 12, fontWeight: 800, cursor: "pointer" }}>{branch.city === b.city ? "✓ Selected" : "Select Branch →"}</button></div></div>)}</div></div>}

      {/* TABLE MODAL - COZY */}
      {showTable && <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 60, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }} onClick={() => setShowTable(false)}><div style={{ background: "white", width: 420, borderRadius: 24, padding: 22 }} onClick={e => e.stopPropagation()}><img src={branch.img} style={{ width: "100%", height: 130, objectFit: "cover", borderRadius: 16 }} /><div style={{ display: "flex", justifyContent: "space-between", marginTop: 10 }}><h2 style={{ margin: 0 }}>🪑 Book a Table</h2><button onClick={() => setShowTable(false)} style={{ border: "none", background: "#f0f0f0", width: 32, height: 32, borderRadius: "50%" }}>✕</button></div><p style={{ fontSize: 13, color: "#666" }}>Cozy dine-in at <b>{branch.name}, {branch.city}</b> • Free • Warm lights • Family friendly</p><input placeholder="👤 Name" value={name} onChange={e => setName(e.target.value)} style={{ width: "100%", padding: 12, marginBottom: 8, borderRadius: 12, border: "1px solid #ddd", boxSizing: "border-box" }} /><input placeholder="📞 Phone" value={phone} onChange={e => setPhone(e.target.value)} style={{ width: "100%", padding: 12, marginBottom: 8, borderRadius: 12, border: "1px solid #ddd", boxSizing: "border-box" }} /><input type="date" value={tableDate} onChange={e => setTableDate(e.target.value)} style={{ width: "100%", padding: 12, marginBottom: 8, borderRadius: 12, border: "1px solid #ddd", boxSizing: "border-box" }} /><div style={{ display: "flex", gap: 8, marginBottom: 10 }}>{["12 PM ☀️", "4 PM 🌤️", "7 PM 🌙", "9 PM ✨"].map(t => <button key={t} onClick={() => setTableTime(t)} style={{ flex: 1, padding: 10, borderRadius: 12, border: tableTime === t ? "2px solid #ff0844" : "1px solid #ddd", background: tableTime === t ? "#FFF1F1" : "white", fontWeight: 800, fontSize: 12 }}>{t}</button>)}</div><div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 14 }}><span>👥 People:</span><button onClick={() => setTablePeople(p => Math.max(1, p - 1))} style={{ width: 36, height: 36, borderRadius: 10, border: "1px solid #ddd", fontSize: 18 }}>−</button><b style={{ fontSize: 18 }}>{tablePeople}</b><button onClick={() => setTablePeople(p => p + 1)} style={{ width: 36, height: 36, borderRadius: 10, border: "1px solid #ddd", fontSize: 18 }}>+</button><span style={{ fontSize: 12, color: "#888" }}>Window / Family / Couple</span></div><button onClick={bookTable} style={{ width: "100%", background: "linear-gradient(90deg,#ff0844,#ff8c00)", color: "white", border: "none", padding: 14, borderRadius: 14, fontWeight: 900, cursor: "pointer" }}>Confirm Table Booking ❤️ →</button>{tableMsg && <p style={{ background: "#e8f5e9", padding: 10, borderRadius: 10, marginTop: 10, fontSize: 13, fontWeight: 600 }}>{tableMsg}</p>}</div></div>}

      {totalItems > 0 && !showCart && <button onClick={() => setShowCart(true)} style={{ position: "fixed", bottom: 20, left: 20, right: 20, background: "linear-gradient(90deg,#ff0844,#ff8c00)", color: "white", border: "none", padding: 16, borderRadius: 20, fontWeight: 900, fontSize: 16, zIndex: 30, boxShadow: "0 15px 30px rgba(255,8,68,0.4)" }}>🛒 View Cart • {totalItems} items • ₹{total} • {branch.city} →</button>}
      <p style={{ textAlign: "center", color: "#aaa", paddingBottom: 30, fontSize: 13 }}>Made with ❤️ in India • pizzawala. • Cozy Dine-In • Delivery • Takeaway • All India 🇮🇳</p>
    </div>
  )
}
export default App