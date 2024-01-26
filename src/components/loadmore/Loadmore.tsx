/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

type LoadMoreProps = {
    isShow: boolean | undefined;
    forwardedRef: React.Ref<HTMLDivElement>;
};
const Loadmore: React.FC<LoadMoreProps> = ({ isShow, forwardedRef }) => {
    return (
        <div ref={forwardedRef} style={{ height: "10px", background: "transparent" }}>
            <div style={{ color: isShow ? "red" : "transparent" }}>
                <p>Loading more...</p>
            </div>
        </div>
    );
};

export default Loadmore;
