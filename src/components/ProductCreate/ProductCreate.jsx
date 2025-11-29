import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./ProductCreate.module.css";
import Button from "../../shared/Button/Button";
import { API } from "../../App";

function ProductCreate({ setProducts, setMsg, setLoading }) {
    const [formTitle, setFormTitle] = useState("");
    const [formPrice, setFormPrice] = useState("");
    const [formDesc, setFormDesc] = useState("");
    const [formCat, setFormCat] = useState("");
    const [formBrand, setFormBrand] = useState("");

    const handleCreate = () => {
        const priceNum = Number(formPrice);
        const payload = {
            title: String(formTitle || "").trim(),
            price: Number.isFinite(priceNum) ? priceNum : undefined,
            description: String(formDesc || "").trim() || undefined,
            category: String(formCat || "").trim() || undefined,
            brand: String(formBrand || "").trim() || undefined,
        };

        if (!payload.title) return setMsg("Введіть назву");

        setLoading(true);
        setMsg("");

        fetch(`${API}/products/add`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        })
            .then((r) => r.json())
            .then((j) => {
                setProducts((prev) => [j, ...prev]);
                setFormTitle("");
                setFormPrice("");
                setFormDesc("");
                setFormCat("");
                setFormBrand("");
                setMsg(`Створено ID ${j.id}`);
            })
            .catch(() => setMsg("Помилка створення"))
            .finally(() => setLoading(false));
    };

    return (
        <div className={styles.panel}>
            <h3 className={styles.heading}>Створити товар</h3>
            <div className={styles.formGrid}>
                <input
                    placeholder="Назва"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    className={styles.input}
                />
                <input
                    placeholder="Ціна"
                    value={formPrice}
                    onChange={(e) => setFormPrice(e.target.value)}
                    className={styles.input}
                />
                <input
                    placeholder="Опис"
                    value={formDesc}
                    onChange={(e) => setFormDesc(e.target.value)}
                    className={styles.input}
                />
                <input
                    placeholder="Категорія"
                    value={formCat}
                    onChange={(e) => setFormCat(e.target.value)}
                    className={styles.input}
                />
                <input
                    placeholder="Бренд"
                    value={formBrand}
                    onChange={(e) => setFormBrand(e.target.value)}
                    className={styles.input}
                />
            
                <Button title="Створити" onClick={handleCreate} className={styles.btn} />
            </div>
        </div>
    );
}

ProductCreate.propTypes = {
    API: PropTypes.string.isRequired,
    setProducts: PropTypes.func.isRequired,
    setMsg: PropTypes.func,
    setLoading: PropTypes.func,
};

export default ProductCreate;
