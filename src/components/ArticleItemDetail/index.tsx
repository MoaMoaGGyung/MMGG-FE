import styled from "@emotion/styled";
import { BoxProps } from "@mui/material";
import { ReactNode } from "react";

interface CurArticleType extends BoxProps {
    current?: number;
    gtc: string;
    children: ReactNode;
}

function ArticleItemDetail({
    current = 0,
    gtc = "5% 10% 10% auto 10% 7%",
    children,
}: CurArticleType) {
    return (
        <Container current={current} gtc={gtc}>
            {children}
        </Container>
    );
}

const Container = styled.div<{ current: number; gtc: string }>`
    width: 100%;
    flex-direction: row;
    display: grid;
    grid-template-columns: ${({ gtc }) => gtc};
    grid-template-rows: 32px;
    border: 0.5px solid #ccc;
    border-radius: 7px;
    column-gap: 8px;
    padding: 8px 2px;
    transform: translateY(-${({ current = 0 }) => current * 57.3333}px);
    transition: transform 0.5s ease-in-out;
`;

export default ArticleItemDetail;
