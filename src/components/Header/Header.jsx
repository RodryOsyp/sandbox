import { useState } from 'react'
import PropTypes from 'prop-types'
import style from './Header.module.css'
import Button from '../../shared/Button/Button';

const Header = ({ setSelected, setProducts, q, setQ, setRoute, setLoading, setMsg }) => {
  const API = "https://dummyjson.com";
  const [viewId, setViewId] = useState("");

  const handlerUpdateList = () => {
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
  }
  return (
    <div className={style.header}><header className={style.headerContainer}
    >
      <div className={style.headerLeft}>

        <Button title="Список" onClick={handlerUpdateList} />
        <Button onClick={() => {
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
        }} title="Відкрити за ID" />

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
         
        <Button onClick={() => {
          setLoading(true);
          setMsg("");
          fetch(`${API}/products?limit=100`)
            .then((r) => r.json())
            .then((j) =>
              setProducts(Array.isArray(j.products) ? j.products : [])
            )
            .catch(() => setMsg("Помилка завантаження списку"))
            .finally(() => setLoading(false));
        }} title="Оновити" />
    </header>
    </div>
  )
}

Header.propTypes = {
  setSelected: PropTypes.func,
  q: PropTypes.string,
  setQ: PropTypes.func.isRequired,
  route: PropTypes.string,
  setRoute: PropTypes.func,
  loading: PropTypes.bool,
  setLoading: PropTypes.func,
  setMsg: PropTypes.func,
  setProducts: PropTypes.func.isRequired,
};

export default Header