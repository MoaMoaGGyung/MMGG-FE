import styled from "@emotion/styled";

type CurArticleNum = {
    current: number;
};

export const ArticleItem = styled.div`
    width: 100%;
    flex-direction: row;
    display: grid;
    grid-template-columns: 5% 10% 10% auto 10% 7%;
    grid-template-rows: 32px;
    border: 0.5px solid #ccc;
    border-radius: 7px;
    column-gap: 8px;
    padding: 8px 2px;
    &:hover {
        cursor: pointer;
        background-color: #ccc;
    }
    transform: translateY(-${({ current }: CurArticleNum) => current * 57.3}px);
    transition: transform 0.5s ease;
`;
