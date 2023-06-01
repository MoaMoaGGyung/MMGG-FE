import { Box, Divider, List, ListItem, ListItemIcon } from "@mui/material";
import MockHotArticleJson from "../../mock/HotArticle.json";
import { Cell } from "../../components/Cell";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import ArticleItem from "../../components/ArticleItem";
import { Search } from "@mui/icons-material";
import { Searchbar } from "../../components/Searchbar";
import TitleSection from "../../components/TitleSection";
import { HomeLayout } from "../../components/HomeLayout";
import { ArticleTableHead } from "../../components/ArticleTableHead";
import BulletinSection from "../../components/BulletinSection";

export default function Home() {
    const [curItem, setCurItem] = useState(0);
    const timer = useRef<null | number>();
    const [search, setSearch] = useState("");
    const theadTitle = ["랭킹", "학과", "게시판", "제목", "날짜", "조회수"];

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    useEffect(() => {
        if (timer.current) clearInterval(timer.current);
        timer.current = setInterval(() => {
            setCurItem((prev) => {
                return prev === 9 ? 0 : prev + 1;
            });
        }, 2000);
    }, []);

    return (
        <HomeLayout>
            <TitleSection title={"🔥 일일 Hot 공지"} link={"/hot"} />
            <Divider sx={{ width: "100%" }} />
            <ArticleTableHead items={theadTitle} />
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
                        <ArticleItem key={id} current={curItem}>
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
            <TitleSection title="게시판" />
            <Divider sx={{ width: "100%" }} />
            <BulletinSection keyword={search} />
        </HomeLayout>
    );
}
