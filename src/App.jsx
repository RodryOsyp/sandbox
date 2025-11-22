import { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import ProductCreate from "./components/ProductCreate/ProductCreate";
import ProductInfo from "./components/ProductInfo/ProductInfo";
import ProductList from "./components/ProductList/ProductList";

export default function App() {
  const API = "https://dummyjson.com";
  const [route, setRoute] = useState("list");
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState(null);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [editId, setEditId] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [editCat, setEditCat] = useState("");
  const [editBrand, setEditBrand] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch(`${API}/products?limit=100`)
      .then((r) => r.json())
      .then((j) => setProducts(Array.isArray(j.products) ? j.products : []))
      .catch(() => setMsg("Помилка завантаження списку"))
      .finally(() => setLoading(false));
  }, []);

  const s = q.trim().toLowerCase();
  const filtered = !s
    ? products
    : products.filter(
      (p) =>
        String(p.id).includes(s) ||
        (p.title || "").toLowerCase().includes(s) ||
        (p.brand || "").toLowerCase().includes(s) ||
        (p.category || "").toLowerCase().includes(s)
    );

  return (
    <div
      style={{
        fontFamily: "Inter, system-ui, Arial",
        color: "#e5e7eb",
        background: "#0f172a",
        minHeight: "100vh",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: 16 }}>
        <Header setProducts={setProducts} setSelected={setSelected} q={q} setQ={setQ} route={route} setRoute={setRoute} loading={loading} setLoading={setLoading} setMsg={setMsg} />
        {route === "list" && (
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}
          >
            <ProductCreate
              API={API}
              setProducts={setProducts}
              setMsg={setMsg}
              setLoading={setLoading}
            />

              <ProductList
                API={API}
                setSelected={setSelected}
                setRoute={setRoute}
                setEditId={setEditId}
                setEditTitle={setEditTitle}
                setEditPrice={setEditPrice}
                setEditDesc={setEditDesc}
                setEditCat={setEditCat}
                setEditBrand={setEditBrand}
                setProducts={setProducts}
                setMsg={setMsg}
                setLoading={setLoading}
                filtered={filtered}/>
                

            {!!editId && (
              <div style={{ gridColumn: "1 / -1", ...panel }}>
                <h3 style={{ marginTop: 0 }}>Оновити товар ID {editId}</h3>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(5, 1fr)",
                    gap: 8,
                  }}
                >
                  <input
                    placeholder="Назва"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    style={input}
                  />
                  <input
                    placeholder="Ціна"
                    value={editPrice}
                    onChange={(e) => setEditPrice(e.target.value)}
                    style={input}
                  />
                  <input
                    placeholder="Опис"
                    value={editDesc}
                    onChange={(e) => setEditDesc(e.target.value)}
                    style={input}
                  />
                  <input
                    placeholder="Категорія"
                    value={editCat}
                    onChange={(e) => setEditCat(e.target.value)}
                    style={input}
                  />
                  <input
                    placeholder="Бренд"
                    value={editBrand}
                    onChange={(e) => setEditBrand(e.target.value)}
                    style={input}
                  />
                </div>
                <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                  <button
                    style={btn}
                    onClick={() => {
                      const priceNum = Number(editPrice);
                      const payload = {
                        title: String(editTitle || "").trim() || undefined,
                        price: Number.isFinite(priceNum) ? priceNum : undefined,
                        description: String(editDesc || "").trim() || undefined,
                        category: String(editCat || "").trim() || undefined,
                        brand: String(editBrand || "").trim() || undefined,
                      };
                      setLoading(true);
                      setMsg("");
                      fetch(`${API}/products/${editId}`, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(payload),
                      })
                        .then((r) => r.json())
                        .then((j) => {
                          setProducts((prev) =>
                            prev.map((p) =>
                              p.id === editId ? { ...p, ...j } : p
                            )
                          );
                          if (selected && selected.id === editId)
                            setSelected((s) => (s ? { ...s, ...j } : s));
                          setMsg(`Оновлено ID ${j.id}`);
                          setEditId("");
                        })
                        .catch(() => setMsg("Помилка оновлення"))
                        .finally(() => setLoading(false));
                    }}
                  >
                    Зберегти
                  </button>
                  <button style={btnMuted} onClick={() => setEditId("")}>
                    Скасувати
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {route === "detail" && (
          <ProductInfo
            selected={selected}
            setSelected={setSelected}
            setRoute={setRoute}
            API={API}
            setProducts={setProducts}
            setMsg={setMsg}
            setLoading={setLoading}
            setEditId={setEditId}
            setEditTitle={setEditTitle}
            setEditPrice={setEditPrice}
            setEditDesc={setEditDesc}
            setEditCat={setEditCat}
            setEditBrand={setEditBrand}
          />
        )}

        {!!msg && (
          <div
            style={{
              marginTop: 16,
              padding: 12,
              background: "#0b1325",
              border: "1px solid #1f2840",
              borderRadius: 10,
              color: "#cbd5e1",
            }}
          >
            {loading ? "Зачекайте..." : msg}
          </div>
        )}
      </div>
      <style>{`
        table th, table td { text-align: left }
        img { display: block }
      `}</style>
    </div>
  );
}

const panel = {
  background: "#111827",
  border: "1px solid #242b3a",
  borderRadius: 12,
  padding: 12,
};
const th = {
  padding: "8px 10px",
  fontWeight: 600,
  color: "#cbd5e1",
  borderBottom: "1px solid #242b3a",
  position: "sticky",
  top: 0,
  background: "#111827",
};
const td = { padding: "8px 10px", verticalAlign: "top" };
const input = {
  padding: "10px 12px",
  borderRadius: 10,
  border: "1px solid #242b3a",
  background: "#0b1020",
  color: "#e5e7eb",
  outline: "none",
};
const btn = {
  background: "linear-gradient(135deg,#22d3ee,#a78bfa)",
  color: "#0b1020",
  border: "none",
  borderRadius: 10,
  padding: "10px 14px",
  fontWeight: 700,
  cursor: "pointer",
};
const btnMuted = {
  background: "#1f2937",
  color: "#cbd5e1",
  border: "1px solid #2a3245",
  borderRadius: 10,
  padding: "10px 14px",
  fontWeight: 700,
  cursor: "pointer",
};
const btnMini = { ...btn, padding: "8px 10px", fontWeight: 700 };
