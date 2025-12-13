import style from "../ProductList.module.css";
import { useStore } from "../../../store";
import { API } from "../../../App";

const TBody = () => {
    const {
        filtered,
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
        products,
    } = useStore();

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
                setProducts(products.filter((x) => x.id !== p.id));

                setMsg(`Видалено ID ${p.id}`);
            })
            .catch(() => setMsg("Помилка видалення"))
            .finally(() => setLoading(false));
    };

    const filteredList = Array.isArray(filtered()) ? filtered() : [];

    console.log(filteredList);
    console.log("wqeqwewqeqw");

    console.log(products);


    return (
        <tbody>
            {filteredList?.map((p) => (
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
            {!filteredList?.length && (
                <tr>
                    <td colSpan={7}>Нічого не знайдено</td>
                </tr>
            )}
        </tbody>
    )
}


export default TBody