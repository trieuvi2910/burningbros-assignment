/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEffect } from "react";

interface UseInfiniteScrollOptions {
    hasNextPage: boolean | undefined;
    isFetchingNextPage: boolean;
    onFetchNextPage: () => void;
    ref?: React.Ref<HTMLDivElement>;
}

const useInfiniteScroll = ({ hasNextPage, onFetchNextPage, ref }: UseInfiniteScrollOptions) => {
    useEffect(() => {
        //@ts-ignore
        if (!ref || !ref.current) return; // Check if ref is available
        const observer = new IntersectionObserver((entries) => {
            const sentinel = entries[0];
            if (sentinel.isIntersecting && hasNextPage) {
                onFetchNextPage();
            }
        });

        //@ts-ignore
        observer.observe(ref.current);

        return () => {
            if (observer) {
                observer.disconnect();
            }
        };
    }, [hasNextPage, onFetchNextPage, ref]);
};

export default useInfiniteScroll;
