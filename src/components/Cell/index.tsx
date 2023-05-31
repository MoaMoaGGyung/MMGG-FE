import styled from "@emotion/styled";

type CellAlignType = {
    jc?: "left" | "center" | 'right"';
};

export const Cell = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: ${({ jc = "center" }: CellAlignType) => jc};
    align-items: center;
    font-size: 15px;
`;
