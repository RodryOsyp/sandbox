import style from "./ProductList.module.css";
import PropTypes from "prop-types";

const ProductList = ({ API, setSelected, setRoute, setEditId, setEditTitle, setEditPrice, setEditDesc, setEditCat, setEditBrand, setProducts, setMsg, setLoading, filtered = [], }) => {
  return (
    <div className={style.productList}>
      <h3>Список товарів</h3>
      <div className={style.tableWrapper}>
        <table className={style.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Назва</th>
              <th>Ціна</th>
              <th>Категорія</th>
              <th>Бренд</th>
              <th>Опис</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.title}</td>
                <td>{p.price}</td>
                <td>{p.category}</td>
                <td>{p.brand}</td>
                <td>{p.description}</td>
                <td>
                  <div className={style.buttons}>
                    <button
                      onClick={() => {
                        setLoading(true);
                        fetch(`${API}/products/${p.id}`)
                          .then((r) => r.json())
                          .then((j) => {
                            setSelected(j);
                            setRoute("detail");
                          })
                          .catch(() => setMsg("Помилка відкриття"))
                          .finally(() => setLoading(false));
                      }}
                    >
                      Відкрити
                    </button>
                    <button
                      onClick={() => {
                        setEditId(p.id);
                        setEditTitle(p.title ?? "");
                        setEditPrice(p.price ?? "");
                        setEditDesc(p.description ?? "");
                        setEditCat(p.category ?? "");
                        setEditBrand(p.brand ?? "");
                      }}
                    >
                      Редагувати
                    </button>
                    <button
                      onClick={() => {
                        setLoading(true);
                        setMsg("");
                        fetch(`${API}/products/${p.id}`, { method: "DELETE" })
                          .then((r) => r.json())
                          .then(() => {
                            setProducts((prev) =>
                              prev.filter((x) => x.id !== p.id)
                            );
                            setMsg(`Видалено ID ${p.id}`);
                          })
                          .catch(() => setMsg("Помилка видалення"))
                          .finally(() => setLoading(false));
                      }}
                    >
                      Видалити
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {!filtered.length && (
              <tr>
                <td colSpan={7}>Нічого не знайдено</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
ProductList.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
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
