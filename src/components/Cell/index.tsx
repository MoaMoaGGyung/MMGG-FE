import styled from "@emotion/styled";
import React from "react";

type CellType = {
    children: React.ReactNode;
    jc?: "left" | "center" | "right";
};

export const Cell = ({ children, jc = "center" }: CellType) => {
    return <Container jc={jc}>{children}</Container>;
};

const Container = styled.div<Pick<CellType, "jc">>`
    /* width: 100%; */
    /* height: 100%; */
    display: flex;
    justify-content: ${({ jc }) => jc};
    align-items: center;
    font-size: 15px;
    position: relative;
    overflow: hidden;
    white-space: nowrap;
    // 넘어가는 부분을 흐리게 처리합니다.
    /* &::after {
        content: "";
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        width: 20px;
        background: linear-gradient(
            to right,
            rgba(255, 255, 255, 0),
            rgba(255, 255, 255, 1) 80%
        );
    } */
`;
