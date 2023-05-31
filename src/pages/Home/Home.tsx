import { Box, Divider, Grid, Link, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import MockHotArticleJson from "../../mock/HotArticle.json";
import { Cell } from "../../components/Cell";
import { useEffect, useRef, useState } from "react";
import { ArticleItem } from "../../components/ArticleItem";

export default function Home() {
    const [curItem, setCurItem] = useState(0);
    const timer = useRef<null | number>();

    useEffect(() => {
        if (timer.current) clearInterval(timer.current);
        timer.current = setInterval(() => {
            setCurItem((prev) => {
                return prev === 9 ? 0 : prev + 1;
            });
        }, 2000);
    }, []);

    return (
        <Box
            pt={2}
            gap={1}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            minHeight={"100%"}
            width={"80%"}
            mx={"auto"}
        >
            <Box
                display={"flex"}
                flexDirection={"row"}
                alignItems={"baseline"}
                justifyContent={"space-between"}
                width={"100%"}
            >
                <Typography
                    variant="h5"
                    component={"span"}
                    fontWeight={600}
                    fontFamily={"Noto Sans KR"}
                >
                    🔥 Hot 공지
                </Typography>
                <RouterLink to="/" style={{ textDecoration: "none" }}>
                    <Link
                        underline="none"
                        sx={{
                            color: "#b9b9b9",
                            fontFamily: "Inter",
                            fontSize: 15,
                            fontWeight: 100,
                            "&:hover": {
                                textDecoration: "underline",
                            },
                        }}
                        component={"span"}
                    >
                        더 보기
                    </Link>
                </RouterLink>
            </Box>
            <Grid container width={"100%"}>
                <Box
                    flexDirection={"row"}
                    display={"grid"}
                    gridTemplateColumns={"5% 10% 10% auto 10% 7%"}
                    gap={1}
                    width={"100%"}
                    px={1}
                >
                    <Cell>랭킹</Cell>
                    <Cell>학과</Cell>
                    <Cell>게시판</Cell>
                    <Cell>제목</Cell>
                    <Cell>날짜</Cell>
                    <Cell>조회수</Cell>
                </Box>
            </Grid>
            <Divider sx={{ width: "100%" }} />
            <Grid container>
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
            </Grid>
        </Box>
    );
}
