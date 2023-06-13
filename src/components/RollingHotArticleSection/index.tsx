import { Loadable, SetterOrUpdater } from "recoil";
import { hotPostState } from "../../store/store";
import React, { useEffect, useRef, useState } from "react";
import TitleSection from "../TitleSection";
import { Divider, Skeleton } from "@mui/material";
import ArticleTableHead from "../ArticleTableHead";
import { Box } from "@mui/system";
import ArticleItem from "../ArticleItem";
import Cell from "../Cell";
import { ArrowDropUp } from "@mui/icons-material";
import { LoadableStateType, hotPostType } from "../../types/types";
import PostSkeletion from "../Skeletons/PostSkeletion";

type RollingHotArticleSection = {
    hotPosts: hotPostType[];
    setHotPosts: SetterOrUpdater<hotPostType[]>;
    hotState: LoadableStateType;
};

const theadTitle = ["랭킹", "학과", "게시판", "제목", "날짜", "일일 변동량"];

const RollingHotArticleSection = ({
    hotPosts,
    setHotPosts,
    hotState,
}: RollingHotArticleSection) => {
    console.info("RollingHotArticleSection rendered!");
    const [curItem, setCurItem] = useState(0);
    const timer = useRef<null | number>();

    useEffect(() => {
        if (hotPosts.length) {
            timer.current = setInterval(() => {
                setCurItem((prev) => {
                    return prev === 9 ? 0 : prev + 1;
                });
            }, 4000);
            return () => {
                timer.current && clearInterval(timer.current);
            };
        }
    }, [hotPosts]);

    useEffect(() => {
        window.scrollTo(0, 0);
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
            {hotPosts.length ? (
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
                                <Cell>
                                    {post.uploadDate.toString().slice(0, 10)}
                                </Cell>
                                <Cell>
                                    <ArrowDropUp sx={{ color: "red" }} />{" "}
                                    {post.dailyFluctuation}
                                </Cell>
                            </ArticleItem>
                        );
                    })}
                </Box>
            ) : (
                <PostSkeletion />
            )}
        </>
    );
};

export default React.memo(RollingHotArticleSection);
