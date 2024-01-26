/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useInfiniteQuery } from "react-query";
import { IProductsResponse } from "../../interfaces/response/response.interface";
import { fetchingProducts } from "../../services/product.service";
import Loadmore from "../../components/loadmore/Loadmore";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import { useSearchStore } from "../../zustand/search.store";

const Products = () => {
    const { keyword } = useSearchStore();

    //fetching data
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery<IProductsResponse, Error>(
        ["products", keyword],
        ({ pageParam = 0 }) => fetchingProducts(pageParam, keyword),
        {
            getNextPageParam: (lastPage) => {
                // Check if there's another page
                if (lastPage.skip < lastPage.total) {
                    return lastPage.skip + 20;
                }
                return undefined; // No more pages
            },
            staleTime: Infinity,
            retry: 2,
            retryDelay: 2000,
        }
    );

    // infinite scroll load more products
    const infiniteRef = React.useRef<HTMLDivElement>(null);
    useInfiniteScroll({
        ref: infiniteRef,
        onFetchNextPage: fetchNextPage,
        hasNextPage: hasNextPage,
        isFetchingNextPage: isFetchingNextPage,
    });

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Image</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.pages.map((page, index) => (
                        <React.Fragment key={index}>
                            {page.products.map((product) => (
                                <tr key={product.id}>
                                    <td>{product.id}</td>
                                    <td>{product.title}</td>
                                    <td>{product.price}</td>
                                    <td>
                                        <img src={product.thumbnail} width={50} height={50} />
                                    </td>
                                </tr>
                            ))}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>

            <Loadmore forwardedRef={infiniteRef} isShow={hasNextPage} />
        </div>
    );
};

export default Products;
