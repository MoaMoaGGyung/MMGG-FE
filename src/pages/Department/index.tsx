import MockDepartmentBulletin from "../../mock/Department.json";
import TitleSection from "../../components/TitleSection";
import { Stack, Divider } from "@mui/material";
import Cell from "../../components/Cell";
import ArticleTableHead from "../../components/ArticleTableHead";
import ArticleItem from "../../components/ArticleItem";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { alignmentState } from "../../store/store";
import { useNavigate } from "react-router-dom";

const Department = () => {
    const { department: dId, boards } = MockDepartmentBulletin;
    const { type, direction } = useRecoilValue(alignmentState);
    const navigate = useNavigate();
    return (
        <>
            <Stack direction={"column"} spacing={4} width={"100%"}>
                {boards.map(({ name, id: bId, posts }, index) => {
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
                                link={`./board/${bId}`}
                                linkLabel="더 보기"
                                onLinkClicked={() => {}}
                            />
                            <Divider sx={{ width: "100%" }} />
                            <ArticleTableHead
                                items={["번호", "제목", "날짜", "조회수"]}
                                gtc={"5% auto 10% 7%"}
                            />
                            {posts
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
                                        default:
                                            return 1;
                                    }
                                })
                                .map(({ id: pId, title, uploadDate, view }) => {
                                    return (
                                        <ArticleItem
                                            key={pId}
                                            gtc="5% auto 10% 7%"
                                            onClick={() =>
                                                navigate(
                                                    `/department/${dId}/board/${bId}/post/${pId}`
                                                )
                                            }
                                        >
                                            <Cell>{pId}</Cell>
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
