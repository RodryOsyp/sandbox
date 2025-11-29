import PropTypes from "prop-types";
import style from "../ProductList.module.css";
const TBody = ({ filtered, handlerOpenProduct, handlerEditProduct, handlerDeleteProduct }) => {
    return (
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
                            <button onClick={() => handlerOpenProduct(p)}>Відкрити</button>
                            <button onClick={() => handlerEditProduct(p)}>Редагувати</button>
                            <button onClick={() => handlerDeleteProduct(p)}>Видалити</button>
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
    )
}
TBody.propTypes = {
  filtered: PropTypes.arrayOf(PropTypes.object).isRequired,

  handlerOpenProduct: PropTypes.func.isRequired,
  handlerEditProduct: PropTypes.func.isRequired,
  handlerDeleteProduct: PropTypes.func.isRequired,

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

export default TBody