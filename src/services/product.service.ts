/* eslint-disable no-case-declarations */
import { IProductsResponse } from "../interfaces/response/response.interface";
import axiosClient from "./axios";

export const fetchingProducts = async (page: number, keyword: string): Promise<IProductsResponse> => {
    if (keyword && keyword.length > 0) {
        return await axiosClient.get(`products/search?q=${keyword}&limit=20&skip=${page}`);
    }

    return await axiosClient.get(`products?limit=20&skip=${page}`);
};
