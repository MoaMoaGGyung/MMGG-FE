import { useRecoilStateLoadable, useRecoilValue } from "recoil";
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

const theadTitle = ["랭킹", "학과", "게시판", "제목", "날짜", "일일 변동량"];

const RollingHotArticleSection = () => {
    console.debug("RollingHotArticleSection rendered!");
    const [hotPostsLoadable, reload] = useRecoilStateLoadable(hotPostState);
    const [hotPosts, setHotPosts] = useState<hotPostType[]>([]);
    const [curItem, setCurItem] = useState(0);
    const timer = useRef<null | number>();
    console.info(hotPostsLoadable);

    useEffect(() => {
        switch (hotPostsLoadable.state) {
            case "hasValue":
                setHotPosts(hotPostsLoadable.contents);
                break;
            case "hasError":
                console.debug("Fetching hot articles got an error!");
                break;
        }
    }, [hotPostsLoadable]);

    useEffect(() => {
        window.scrollTo(0, 0);
        timer.current = setInterval(() => {
            setCurItem((prev) => {
                return prev === 9 ? 0 : prev + 1;
            });
        }, 2000);
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
                {/* {hotPostsLoadable.state === "hasValue" ? (
                    hotPostsLoadable.contents
                        .sort((a, b) => {
                            return (
                                b.post.dailyFluctuation -
                                a.post.dailyFluctuation
                            );
                        })
                        .map(({ department, board, post }, index) => {
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
                        })
                ) : (
                    <Skeleton />
                )} */}
            </Box>
        </>
    );
};

export default React.memo(RollingHotArticleSection);
