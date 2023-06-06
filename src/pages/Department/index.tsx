import MockDepartmentBulletin from "../../mock/DepartmentBulletin.json";
import TitleSection from "../../components/TitleSection";
import { Stack, Divider } from "@mui/material";
import Cell from "../../components/Cell";
import ArticleTableHead from "../../components/ArticleTableHead";
import ArticleItem from "../../components/ArticleItem";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { alignmentState, boardState } from "../../store/store";

const Department = () => {
    const { boards } = MockDepartmentBulletin;
    const { type, direction } = useRecoilValue(alignmentState);
    const setBoard = useSetRecoilState(boardState);
    return (
        <>
            <Stack direction={"column"} spacing={4} width={"100%"}>
                {boards.map(({ name, id, articles }, index) => {
                    return (
                        <Stack
                            direction={"column"}
                            spacing={1}
                            width={"100%"}
                            key={index}
                        >
                            <TitleSection
                                title={name}
                                py={2}
                                link={`./board/${id}`}
                                linkLabel="더 보기"
                                onLinkClicked={() => setBoard(name)}
                            />
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
                                                (new Date(
                                                    a.uploadDate
                                                ).getTime() -
                                                    new Date(
                                                        b.uploadDate
                                                    ).getTime()) *
                                                direction
                                            );
                                        case "view":
                                            return (
                                                (a.view - b.view) * direction
                                            );
                                        case "index":
                                            return (
                                                (a.index - b.index) * direction
                                            );
                                        default:
                                            return 1;
                                    }
                                })
                                .map(({ index, title, uploadDate, view }) => {
                                    return (
                                        <ArticleItem
                                            key={index}
                                            gtc="5% auto 10% 7%"
                                        >
                                            <Cell>{index}</Cell>
                                            <Cell>{title}</Cell>
                                            <Cell>{uploadDate}</Cell>
                                            <Cell>{view}</Cell>
                                        </ArticleItem>
                                    );
                                })}
                        </Stack>
                    );
                })}
            </Stack>
        </>
    );
};

export default Department;
