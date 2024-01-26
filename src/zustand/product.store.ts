/* eslint-disable @typescript-eslint/no-unused-vars */
import { create } from "zustand";
import { fetchingProducts } from "../services/product.service";
import { IProduct } from "../interfaces/product/product.interface";

interface ProductState {
    products: IProduct[];
    nextPage: number;
    hasNextPage: boolean;
    onFetchProducts: (keyword: string) => void;
}

const useProductStore = create<ProductState>((_set, _get) => ({
    products: [],
    nextPage: 0,
    hasNextPage: false,
    onFetchProducts: async (keyword: string) => {
        const page = _get().nextPage;

        const { products, skip, total } = await fetchingProducts(page, keyword);
        if (skip < total) {
            _set({ nextPage: skip + 20, hasNextPage: true });
        } else {
            _set({ hasNextPage: false });
        }

        const currentProducts = _get().products;
        if (keyword && keyword.length > 0) {
            _set({ products });
        } else {
            _set({ products: currentProducts.concat(products) });
        }
    },
}));

export { useProductStore };
