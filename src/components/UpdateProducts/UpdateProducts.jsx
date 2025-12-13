import PropTypes from "prop-types";
import { API } from "../../App";
import style from "./UpdateProducts.module.css";
import { useStore } from "../../store";

export default function UpdateProducts() {
    const {
        editId,
        editTitle,
        editPrice,
        editDesc,
        editCat,
        editBrand,
        setEditId,
        setEditTitle,
        setEditPrice,
        setEditDesc,
        setEditCat,
        setEditBrand,
        setProducts,
        selected,
        setSelected,
        setMsg,
        setLoading,
        panel,
        input,
        btn,
        btnMuted
    } = useStore();

    if (!editId) return null;
    const handlerUpdateProduct = () => {
        const priceNum = Number(editPrice);

        const payload = {
            title: String(editTitle || "").trim() || undefined,
            price: Number.isFinite(priceNum) ? priceNum : undefined,
            description: String(editDesc || "").trim() || undefined,
            category: String(editCat || "").trim() || undefined,
            brand: String(editBrand || "").trim() || undefined,
        };

        setLoading(true);
        setMsg("");

        fetch(`${API}/products/${editId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        })
            .then((r) => r.json())
            .then((j) => {
                setProducts((prev) =>
                    prev.map((p) => (p.id === editId ? { ...p, ...j } : p))
                );

                if (selected && selected.id === editId) {
                    setSelected((s) => (s ? { ...s, ...j } : s));
                }

                setMsg(`Оновлено ID ${j.id}`);
                setEditId("");
            })
            .catch(() => setMsg("Помилка оновлення"))
            .finally(() => setLoading(false));
    };

    return (
        <div style={{ gridColumn: "1 / -1", ...panel }}>
            <h3 style={{ marginTop: 0 }}>Оновити товар ID {editId}</h3>

            <div className={style.inputs}>
                <input
                    placeholder="Назва"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    style={input}
                />
                <input
                    placeholder="Ціна"
                    value={editPrice}
                    onChange={(e) => setEditPrice(e.target.value)}
                    style={input}
                />
                <input
                    placeholder="Опис"
                    value={editDesc}
                    onChange={(e) => setEditDesc(e.target.value)}
                    style={input}
                />
                <input
                    placeholder="Категорія"
                    value={editCat}
                    onChange={(e) => setEditCat(e.target.value)}
                    style={input}
                />
                <input
                    placeholder="Бренд"
                    value={editBrand}
                    onChange={(e) => setEditBrand(e.target.value)}
                    style={input}
                />
            </div>

            <div className={style.container}>
                <button style={btn} onClick={handlerUpdateProduct}>
                    Зберегти
                </button>

                <button style={btnMuted} onClick={() => setEditId("")}>
                    Скасувати
                </button>
            </div>
        </div>
    );
}

UpdateProducts.propTypes = {
    editId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    editTitle: PropTypes.string,
    editPrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    editDesc: PropTypes.string,
    editCat: PropTypes.string,
    editBrand: PropTypes.string,

    setEditId: PropTypes.func.isRequired,
    setEditTitle: PropTypes.func.isRequired,
    setEditPrice: PropTypes.func.isRequired,
    setEditDesc: PropTypes.func.isRequired,
    setEditCat: PropTypes.func.isRequired,
    setEditBrand: PropTypes.func.isRequired,

    setProducts: PropTypes.func.isRequired,

    selected: PropTypes.object,
    setSelected: PropTypes.func,

    setMsg: PropTypes.func.isRequired,
    setLoading: PropTypes.func.isRequired,

    panel: PropTypes.object.isRequired,
    input: PropTypes.object.isRequired,
    btn: PropTypes.object.isRequired,
    btnMuted: PropTypes.object.isRequired,
};
