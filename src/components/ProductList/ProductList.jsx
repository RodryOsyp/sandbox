import style from "./ProductList.module.css";
import Thead from "./components/Thead";
import TBody from "./components/TBody";
const ProductList = () => {
  return (
    <div className={style.productList}>
      <h3>Список товарів</h3>
      <div className={style.tableWrapper}>

        <table className={style.table}>
          <Thead />
          <TBody />
        </table>

      </div>
    </div>
  );
};

export default ProductList;
