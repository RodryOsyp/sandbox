import { create } from "zustand";

export const useStore = create((set, get) => ({
  route: "list",
  setRoute: (route) => set({ route }),

  products: [],
  setProducts: (products) => set({ products }),

  selected: null,
  setSelected: (selected) => set({ selected }),

  q: "",
  setQ: (q) => set({ q }),

  loading: false,
  setLoading: (loading) => set({ loading }),

  msg: "",
  setMsg: (msg) => set({ msg }),

  editId: "",
  editTitle: "",
  editPrice: "",
  editDesc: "",
  editCat: "",
  editBrand: "",

  setEditId: (editId) => set({ editId }),
  setEditTitle: (editTitle) => set({ editTitle }),
  setEditPrice: (editPrice) => set({ editPrice }),
  setEditDesc: (editDesc) => set({ editDesc }),
  setEditCat: (editCat) => set({ editCat }),
  setEditBrand: (editBrand) => set({ editBrand }),

  filtered: () => {
    const { products, q } = get();
    const s = q.trim().toLowerCase();

    if (!s) return products;

    return products.filter(
      (p) =>
        String(p.id).includes(s) ||
        (p.title || "").toLowerCase().includes(s) ||
        (p.brand || "").toLowerCase().includes(s) ||
        (p.category || "").toLowerCase().includes(s)
    );
  },
}));
