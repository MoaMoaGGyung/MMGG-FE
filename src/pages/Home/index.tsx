import MockHotArticleJson from "../../mock/HotArticle.json";
import {
    Box,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    Stack,
} from "@mui/material";
import Cell from "../../components/Cell";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import ArticleItem from "../../components/ArticleItem";
import { ArrowDropUp, Search } from "@mui/icons-material";
import Searchbar from "../../components/Searchbar";
import TitleSection from "../../components/TitleSection";
import HomeLayout from "../../components/HomeLayout";
import ArticleTableHead from "../../components/ArticleTableHead";
import BulletinSection from "../../components/BulletinSection";

export default function Home() {
    const [curItem, setCurItem] = useState(0);
    const timer = useRef<null | number>();
    const [search, setSearch] = useState("");
    const theadTitle = [
        "랭킹",
        "학과",
        "게시판",
        "제목",
        "날짜",
        "일일 변동량",
    ];

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        if (timer.current) clearInterval(timer.current);
        timer.current = setInterval(() => {
            setCurItem((prev) => {
                return prev === 9 ? 0 : prev + 1;
            });
        }, 2000);
    }, []);

    return (
        <HomeLayout>
            <TitleSection
                title={"🔥 일일 Hot 공지"}
                link={"/hot"}
                linkLabel="더 보기"
            />
            <Divider sx={{ width: "100%" }} />
            <ArticleTableHead gtc="5% 10% 10% auto 10% 7%" items={theadTitle} />
            <Box
                width={"100%"}
                display={"flex"}
                flexDirection={"column"}
                gap={1}
                height={57.3}
                px={1}
                sx={{
                    overflow: "hidden",
                }}
            >
                {MockHotArticleJson.sort(
                    (a, b) => b.dailyFluctuation - a.dailyFluctuation
                ).map((props, index) => {
                    const {
                        department,
                        board,
                        title,
                        uploadDate,
                        dailyFluctuation,
                    } = props;
                    return (
                        <ArticleItem
                            key={index}
                            current={curItem}
                            gtc="5% 10% 10% auto 10% 7%"
                        >
                            <Cell>{index + 1}</Cell>
                            <Cell sx={{ justifyContent: "left" }}>
                                {department}
                            </Cell>
                            <Cell sx={{ justifyContent: "left" }}>{board}</Cell>
                            <Cell sx={{ justifyContent: "left" }}>{title}</Cell>
                            <Cell>{uploadDate}</Cell>
                            <Cell>
                                <ArrowDropUp sx={{ color: "red" }} />{" "}
                                {dailyFluctuation}
                            </Cell>
                        </ArticleItem>
                    );
                })}
            </Box>
            <Box
                justifyContent={"center"}
                alignItems={"center"}
                width={"50%"}
                py={2}
                mx={"auto"}
            >
                <List>
                    <ListItem
                        sx={{ border: "1px solid black", borderRadius: "20px" }}
                    >
                        <ListItemIcon>
                            <Search />
                        </ListItemIcon>
                        <Searchbar
                            value={search}
                            placeholder="학과 검색"
                            onChange={handleSearch}
                        />
                    </ListItem>
                </List>
            </Box>
            <Stack direction={"column"} rowGap={2}>
                <TitleSection title="📄 게시판" />
                <Divider sx={{ width: "100%" }} />
                <BulletinSection keyword={search} />
            </Stack>
        </HomeLayout>
    );
}
