import { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import ProductCreate from "./components/ProductCreate/ProductCreate";
import ProductInfo from "./components/ProductInfo/ProductInfo";
import ProductList from "./components/ProductList/ProductList";
import UpdateProducts from "./components/UpdateProducts/UpdateProducts";
import "./App.css";
export const API = "https://dummyjson.com";
export default function App() {
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
      className="wrapper">
      <div className="container">
        <Header
          setProducts={setProducts}
          setSelected={setSelected}
          q={q}
          setQ={setQ}
          route={route}
          setRoute={setRoute}
          loading={loading}
          setLoading={setLoading}
          setMsg={setMsg}
        />

        {route === "list" && (
          <div className="route">
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
              filtered={filtered}
            />

            <UpdateProducts
              editId={editId}
              editTitle={editTitle}
              editPrice={editPrice}
              editDesc={editDesc}
              editCat={editCat}
              editBrand={editBrand}
              setEditId={setEditId}
              setEditTitle={setEditTitle}
              setEditPrice={setEditPrice}
              setEditDesc={setEditDesc}
              setEditCat={setEditCat}
              setEditBrand={setEditBrand}
              API={API}
              setProducts={setProducts}
              selected={selected}
              setSelected={setSelected}
              setMsg={setMsg}
              setLoading={setLoading}
              panel={panel}
              input={input}
              btn={btn}
              btnMuted={btnMuted}
            />


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
            className="msg"
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
