import style from "./ProductList.module.css";
import PropTypes from "prop-types";
import { API } from "../../App";
import Thead from "./components/Thead";
import TBody from "./components/TBody";
const ProductList = ({
  setSelected,
  setRoute,
  setEditId,
  setEditTitle,
  setEditPrice,
  setEditDesc,
  setEditCat,
  setEditBrand,
  setProducts,
  setMsg,
  setLoading,
  filtered = [],
}) => {
  const handlerOpenProduct = (p) => {
    setLoading(true);
    fetch(`${API}/products/${p.id}`)
      .then((r) => r.json())
      .then((j) => {
        setSelected(j);
        setRoute("detail");
      })
      .catch(() => setMsg("Помилка відкриття"))
      .finally(() => setLoading(false));
  };

  const handlerEditProduct = (p) => {
    setEditId(p.id);
    setEditTitle(p.title ?? "");
    setEditPrice(p.price ?? "");
    setEditDesc(p.description ?? "");
    setEditCat(p.category ?? "");
    setEditBrand(p.brand ?? "");
  };

  const handlerDeleteProduct = (p) => {
    setLoading(true);
    setMsg("");
    fetch(`${API}/products/${p.id}`, { method: "DELETE" })
      .then((r) => r.json())
      .then(() => {
        setProducts((prev) => prev.filter((x) => x.id !== p.id));
        setMsg(`Видалено ID ${p.id}`);
      })
      .catch(() => setMsg("Помилка видалення"))
      .finally(() => setLoading(false));
  };

  return (
    <div className={style.productList}>
      <h3>Список товарів</h3>
      <div className={style.tableWrapper}>
        
        <table className={style.table}>
         <Thead />
         <TBody
          filtered={filtered}
          handlerOpenProduct={handlerOpenProduct}
          handlerEditProduct={handlerEditProduct}
          handlerDeleteProduct={handlerDeleteProduct}
         />
        </table>

      </div>
    </div>
  );
};

ProductList.propTypes = {
  filtered: PropTypes.arrayOf(PropTypes.object).isRequired,
  API: PropTypes.string.isRequired,
  setSelected: PropTypes.func.isRequired,
  setRoute: PropTypes.func.isRequired,
  setEditId: PropTypes.func.isRequired,
  setEditTitle: PropTypes.func.isRequired,
  setEditPrice: PropTypes.func.isRequired,
  setEditDesc: PropTypes.func.isRequired,
  setEditCat: PropTypes.func.isRequired,
  setEditBrand: PropTypes.func.isRequired,
  setProducts: PropTypes.func.isRequired,
  setMsg: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
};

export default ProductList;
