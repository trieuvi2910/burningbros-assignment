import { IProduct } from "../product/product.interface";

export interface IProductsResponse {
    skip: number;
    total: number;
    limit: number;
    products: IProduct[];
}
