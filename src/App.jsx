import { useEffect } from "react";
import Header from "./components/Header/Header";
import ProductCreate from "./components/ProductCreate/ProductCreate";
import ProductInfo from "./components/ProductInfo/ProductInfo";
import ProductList from "./components/ProductList/ProductList";
import UpdateProducts from "./components/UpdateProducts/UpdateProducts";
import { useStore } from "./store";
import "./App.css";

export const API = "https://dummyjson.com";

export default function App() {
  const {
    route,
    setProducts,
    loading, setLoading,
    msg, setMsg,
  } = useStore();

  useEffect(() => {
    setLoading(true);
    fetch(`${API}/products?limit=100`)
      .then((r) => r.json())
      .then((j) => setProducts(Array.isArray(j.products) ? j.products : []))
      .catch(() => setMsg("Помилка завантаження списку"))
      .finally(() => setLoading(false));
  }, [setLoading, setMsg, setProducts]);

  return (
    <div className="wrapper">
      <div className="container">
        <Header />

        {route === "list" && (
          <div className="route">
            <ProductCreate />
            <ProductList />
            <UpdateProducts />
          </div>
        )}

        {route === "detail" && <ProductInfo />}

        {!!msg && (
          <div className="msg">
            {loading ? "Зачекайте..." : msg}
          </div>
        )}
      </div>
    </div>
  );
}
