import { Divider } from "@mui/material";
import ArticleTableHead from "../../components/ArticleTableHead";
import HomeLayout from "../../components/HomeLayout";
import TitleSection from "../../components/TitleSection";
import MockHotArticleJson from "../../mock/HotArticle.json";
import { Box } from "@mui/system";
import ArticleItem from "../../components/ArticleItem";
import Cell from "../../components/Cell";
import { ArrowDropUp } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

function HotArticles() {
    const navigate = useNavigate();
    const theadTitle = [
        "랭킹",
        "학과",
        "게시판",
        "제목",
        "날짜",
        "일일 변동량",
    ];
    return (
        <HomeLayout>
            <TitleSection title={"🔥 일일 Hot 공지"} />
            <Divider sx={{ width: "100%" }} />
            <ArticleTableHead items={theadTitle} gtc="5% 10% 10% auto 10% 7%" />
            <Box
                width={"100%"}
                display={"flex"}
                flexDirection={"column"}
                gap={1}
                px={1}
            >
                {MockHotArticleJson.sort(
                    (a, b) => b.post.dailyFluctuation - a.post.dailyFluctuation
                ).map((props, index) => {
                    const { department, board, post } = props;
                    return (
                        <ArticleItem
                            key={index}
                            gtc="5% 10% 10% auto 10% 7%"
                            onClick={() =>
                                navigate(
                                    `/department/${department.id}/board/${board.id}/post/${post.id}`
                                )
                            }
                        >
                            <Cell>{index + 1}</Cell>
                            <Cell sx={{ justifyContent: "left" }}>
                                {department.name}
                            </Cell>
                            <Cell sx={{ justifyContent: "left" }}>
                                {board.name}
                            </Cell>
                            <Cell sx={{ justifyContent: "left" }}>
                                {post.title}
                            </Cell>
                            <Cell>{post.uploadDate}</Cell>
                            <Cell>
                                <ArrowDropUp sx={{ color: "red" }} />{" "}
                                {post.dailyFluctuation}
                            </Cell>
                        </ArticleItem>
                    );
                })}
            </Box>
        </HomeLayout>
    );
}

export default HotArticles;
