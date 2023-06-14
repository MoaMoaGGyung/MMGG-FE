import styled from "@emotion/styled";
import { BoxProps } from "@mui/material";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface CurArticleType extends BoxProps {
    current?: number;
    gtc: string;
    onClick?: () => void;
    children: ReactNode;
    boardId: number;
    postId: number;
}

function ArticleItem({
    current,
    gtc = "5% 10% 10% auto 10% 7%",
    onClick,
    children,
    postId,
    boardId,
}: CurArticleType) {
    const navigate = useNavigate();
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
    padding: 8px 10px;
    &:hover {
        cursor: pointer;
        background-color: #ccc;
    }
    transform: translateY(-${({ current = 0 }) => current * 57.3333}px);
    transition: transform 0.5s ease-in-out;
`;

export default ArticleItem;
