import { Divider } from "@mui/material";
import { ArticleTableHead } from "../../components/ArticleTableHead";
import HomeLayout from "../../components/HomeLayout";
import TitleSection from "../../components/TitleSection";
import MockHotArticleJson from "../../mock/HotArticle.json";
import { Box } from "@mui/system";
import ArticleItem from "../../components/ArticleItem";
import { Cell } from "../../components/Cell";
import { ArrowDropUp } from "@mui/icons-material";

function HotArticles() {
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
            <TitleSection
                title={"🔥 일일 Hot 공지"}
                link="/"
                linkLabel="홈으로"
            />
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
                    (a, b) => b.dailyFluctuation - a.dailyFluctuation
                ).map((props, index) => {
                    const {
                        department,
                        bulletin,
                        title,
                        uploadDate,
                        dailyFluctuation,
                    } = props;
                    return (
                        <ArticleItem key={index} gtc="5% 10% 10% auto 10% 7%">
                            <Cell>{index + 1}</Cell>
                            <Cell jc={"left"}>{department}</Cell>
                            <Cell jc={"left"}>{bulletin}</Cell>
                            <Cell jc={"left"}>{title}</Cell>
                            <Cell>{uploadDate}</Cell>
                            <Cell>
                                <ArrowDropUp sx={{ color: "red" }} />{" "}
                                {dailyFluctuation}
                            </Cell>
                        </ArticleItem>
                    );
                })}
            </Box>
        </HomeLayout>
    );
}

export default HotArticles;
