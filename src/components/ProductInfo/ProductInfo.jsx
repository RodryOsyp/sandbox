import styles from "./ProductInfo.module.css";
import PropTypes from "prop-types";

export default function ProductInfo({
  selected,
  setSelected,
  setRoute,
  API,
  setProducts,
  setMsg,
  setLoading,
  setEditId,
  setEditTitle,
  setEditPrice,
  setEditDesc,
  setEditCat,
  setEditBrand,
}) {
  const handlerGoBack = () => setRoute("list");

  const handlerDeleteProduct = () => {
    if (!selected) return;
    setLoading(true);
    fetch(`${API}/products/${selected.id}`, { method: "DELETE" })
      .then((r) => r.json())
      .then(() => {
        setProducts((prev) => prev.filter((x) => x.id !== selected.id));
        setMsg(`Видалено ID ${selected.id}`);
        setSelected(null);
        setRoute("list");
      })
      .catch(() => setMsg("Помилка видалення"))
      .finally(() => setLoading(false));
  };

  const handlerEditProduct = () => {
    if (!selected) return;
    setEditId(selected.id);
    setEditTitle(selected.title ?? "");
    setEditPrice(selected.price ?? "");
    setEditDesc(selected.description ?? "");
    setEditCat(selected.category ?? "");
    setEditBrand(selected.brand ?? "");
    setRoute("list");
  };

  if (!selected)
    return (
      <div className={styles.panel}>
        <div className={styles.noData}>Немає даних</div>
      </div>
    );

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <h3>Товар</h3>
        <button className={styles.btn} onClick={handlerGoBack}>
          ← Назад
        </button>
      </div>

      <div className={styles.grid}>
        <div className={styles.info}>
          <div>
            <b>ID:</b> {selected.id}
          </div>
          <div>
            <b>Назва:</b> {selected.title}
          </div>
          <div>
            <b>Ціна:</b> {selected.price}
          </div>
          <div>
            <b>Категорія:</b> {selected.category}
          </div>
          <div>
            <b>Бренд:</b> {selected.brand}
          </div>
          <div>
            <b>Опис:</b> {selected.description}
          </div>

          <div className={styles.btnRow}>
            <button className={styles.btn} onClick={handlerDeleteProduct}>
              Видалити
            </button>

            <button className={styles.btn} onClick={handlerEditProduct}>
              Редагувати
            </button>
          </div>
        </div>

        <div className={styles.galleryBlock}>
          <div className={styles.galleryTitle}>Міні-галерея</div>

          <div className={styles.gallery}>
            {(selected.images || []).slice(0, 6).map((src, i) => (
              <img key={i} src={src} alt="" className={styles.image} />
            ))}

            {!selected.images?.length && (
              <div className={styles.noImages}>Немає зображень</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

ProductInfo.propTypes = {
  selected: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    category: PropTypes.string,
    brand: PropTypes.string,
    description: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.string),
  }),

  setSelected: PropTypes.func.isRequired,
  setRoute: PropTypes.func.isRequired,
  API: PropTypes.string.isRequired,
  setProducts: PropTypes.func.isRequired,
  setMsg: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
  setEditId: PropTypes.func.isRequired,
  setEditTitle: PropTypes.func.isRequired,
  setEditPrice: PropTypes.func.isRequired,
  setEditDesc: PropTypes.func.isRequired,
  setEditCat: PropTypes.func.isRequired,
  setEditBrand: PropTypes.func.isRequired,
};
