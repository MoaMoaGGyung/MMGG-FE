import {
    SetterOrUpdater,
    useRecoilStateLoadable,
    useRecoilValue,
} from "recoil";
import { hotPostState } from "../../store/store";
import React, { useEffect, useRef, useState } from "react";
import TitleSection from "../TitleSection";
import { Divider, Skeleton } from "@mui/material";
import ArticleTableHead from "../ArticleTableHead";
import { Box } from "@mui/system";
import ArticleItem from "../ArticleItem";
import Cell from "../Cell";
import { ArrowDropUp } from "@mui/icons-material";
import { hotPostType } from "../../types/types";

type RollingHotArticleSection = {
    hotPosts: hotPostType[];
    setHotPosts: SetterOrUpdater<hotPostType[]>;
};

const theadTitle = ["랭킹", "학과", "게시판", "제목", "날짜", "일일 변동량"];

const RollingHotArticleSection = ({
    hotPosts,
    setHotPosts,
}: RollingHotArticleSection) => {
    console.debug("RollingHotArticleSection rendered!");
    console.info(hotPosts);
    const [curItem, setCurItem] = useState(0);
    const timer = useRef<null | number>();

    useEffect(() => {
        window.scrollTo(0, 0);
        if (hotPosts.length) {
            timer.current = setInterval(() => {
                setCurItem((prev) => {
                    return prev === 9 ? 0 : prev + 1;
                });
            }, 2000);
        }
        return () => {
            timer.current && clearInterval(timer.current);
        };
    }, []);

    return (
        <>
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
                {hotPosts.map(({ department, board, post }, index) => {
                    return (
                        <ArticleItem
                            key={index}
                            current={curItem}
                            gtc="5% 10% 10% auto 10% 7%"
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
        </>
    );
};

export default React.memo(RollingHotArticleSection);
