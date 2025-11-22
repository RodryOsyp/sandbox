import { useState } from 'react'
import PropTypes from 'prop-types'
import style from './Header.module.css'
import Button from '../../shared/Button/Button';

const Header = ({ setSelected, setProducts, q, setQ, setRoute, setLoading, setMsg }) => {
  const API = "https://dummyjson.com";
  const [viewId, setViewId] = useState("");

  const Handler = {
    UpdateList: () => {
      setRoute("list");
      setSelected(null);
      setMsg("");
      setLoading(true);
      fetch(`${API}/products?limit=100`)
        .then((r) => r.json())
        .then((j) =>
          setProducts(Array.isArray(j.products) ? j.products : [])
        )
        .catch(() => setMsg("Помилка оновлення списку"))
        .finally(() => setLoading(false));
    },

    FindProductByID: () => {
      if (!viewId) return;
      setLoading(true);
      setMsg("");
      fetch(`${API}/products/${viewId}`)
        .then((r) => {
          if (!r.ok) throw new Error();
          return r.json();
        })
        .then((j) => {
          setSelected(j);
          setRoute("detail");
        })
        .catch(() => setMsg("Товар не знайдено"))
        .finally(() => setLoading(false));
    },
  };

  return (
    <div className={style.header}>
      <header className={style.headerContainer}>
        <div className={style.headerLeft}>
          <Button title="Список" onClick={Handler.UpdateList} />
          <Button title="Відкрити за ID" onClick={Handler.FindProductByID} />
          <input
            placeholder="ID"
            value={viewId}
            onChange={(e) => setViewId(e.target.value)}
            className={style.input}
          />
        </div>

        <div className={style.headerRight}>
          <input
            placeholder="Пошук"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className={style.input}
          />
        </div>

        <Button title="Оновити" onClick={Handler.UpdateList} />
      </header>
    </div>
  )
}

Header.propTypes = {
  setSelected: PropTypes.func.isRequired,
  q: PropTypes.string.isRequired,
  setQ: PropTypes.func.isRequired,
  setRoute: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
  setMsg: PropTypes.func.isRequired,
  setProducts: PropTypes.func.isRequired,
};

export default Header;
