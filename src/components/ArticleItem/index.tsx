import styled from "@emotion/styled";
import { BoxProps } from "@mui/material";
import { ReactNode } from "react";

interface CurArticleType extends BoxProps {
    current?: number;
    gtc: string;
    onClick?: () => void;
    children: ReactNode;
}

function ArticleItem({ current, gtc, onClick, children }: CurArticleType) {
    return (
        <Container current={current} gtc={gtc} onClick={onClick}>
            {children}
        </Container>
    );
}

const Container = styled.div<CurArticleType>`
    width: 100%;
    flex-direction: row;
    display: grid;
    grid-template-columns: ${({ gtc }) => gtc};
    grid-template-rows: 32px;
    border: 0.5px solid #ccc;
    border-radius: 7px;
    column-gap: 8px;
    padding: 8px 2px;
    &:hover {
        cursor: pointer;
        background-color: #ccc;
    }
    transform: translateY(-${({ current = 0 }) => current * 57.3333}px);
    transition: transform 0.5s ease-in-out;
`;

export default ArticleItem;
