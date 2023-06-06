import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { alignmentState, boardState } from "../../store/store";
import MockBoardArticles from "../../mock/BoardArticles.json";
import { Stack } from "@mui/system";
import { Divider } from "@mui/material";
import ArticleTableHead from "../../components/ArticleTableHead";
import ArticleItem from "../../components/ArticleItem";
import Cell from "../../components/Cell";
import TitleSection from "../../components/TitleSection";

const Board = () => {
    const board = useRecoilValue(boardState);
    const { type, direction } = useRecoilValue(alignmentState);
    const { articles } = MockBoardArticles;
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <Stack direction={"column"} spacing={1} width={"100%"}>
            <TitleSection title={board} py={2} />
            <Divider sx={{ width: "100%" }} />
            <ArticleTableHead
                items={["번호", "제목", "날짜", "조회수"]}
                gtc={"5% auto 10% 7%"}
            />
            {articles
                .sort((a, b) => {
                    switch (type) {
                        case "date":
                            return (
                                (new Date(a.uploadDate).getTime() -
                                    new Date(b.uploadDate).getTime()) *
                                direction
                            );
                        case "view":
                            return (a.view - b.view) * direction;
                        case "index":
                            return (a.index - b.index) * direction;
                        default:
                            return 1;
                    }
                })
                .map(({ index, title, uploadDate, view }, iter) => {
                    return (
                        <ArticleItem key={iter} gtc="5% auto 10% 7%">
                            <Cell>{index}</Cell>
                            <Cell sx={{ justifyContent: "left" }}>{title}</Cell>
                            <Cell>{uploadDate}</Cell>
                            <Cell>{view}</Cell>
                        </ArticleItem>
                    );
                })}
        </Stack>
    );
};

export default Board;
