import { Divider } from "@mui/material";
import { ArticleTableHead } from "../../components/ArticleTableHead";
import { HomeLayout } from "../../components/HomeLayout";
import TitleSection from "../../components/TitleSection";
import MockHotArticleJson from "../../mock/HotArticle.json";
import { Box } from "@mui/system";
import ArticleItem from "../../components/ArticleItem";
import { Cell } from "../../components/Cell";

function HotArticles() {
    const theadTitle = ["랭킹", "학과", "게시판", "제목", "날짜", "조회수"];
    return (
        <HomeLayout>
            <TitleSection
                title={"🔥 일일 Hot 공지"}
                link="/"
                linkLabel="홈으로"
            />
            <Divider sx={{ width: "100%" }} />
            <ArticleTableHead items={theadTitle} />
            <Box
                width={"100%"}
                display={"flex"}
                flexDirection={"column"}
                gap={1}
                px={1}
            >
                {MockHotArticleJson.map((props) => {
                    const {
                        id,
                        rank,
                        department,
                        bulletin,
                        title,
                        uploadDate,
                        view,
                    } = props;
                    return (
                        <ArticleItem key={id}>
                            <Cell>{rank}</Cell>
                            <Cell jc={"left"}>{department}</Cell>
                            <Cell jc={"left"}>{bulletin}</Cell>
                            <Cell jc={"left"}>{title}</Cell>
                            <Cell>{uploadDate}</Cell>
                            <Cell>{view}</Cell>
                        </ArticleItem>
                    );
                })}
            </Box>
        </HomeLayout>
    );
}

export default HotArticles;
