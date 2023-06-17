import { useRecoilState } from "recoil";
import { hotPostAtom, instance } from "../../store/store";
import React, { useEffect, useRef, useState } from "react";
import TitleSection from "../TitleSection";
import { Divider } from "@mui/material";
import ArticleTableHead from "../ArticleTableHead";
import { Box } from "@mui/system";
import Cell from "../Cell";
import { ArrowDropUp } from "@mui/icons-material";
import { HotPostType } from "../../types/types";
import axios from "axios";
import PostSkeleton from "../Skeletons/PostSkeleton";
import ArticleItemDetail from "../ArticleItemDetail";
import CustomLink from "../CustomLink";

const theadTitle = ["랭킹", "학과", "게시판", "제목", "날짜", "주간 변동량"];
const source = axios.CancelToken.source();

export const RouteFontStyle = {
    fontSize: 15,
    fontWeight: 400,
    color: "black",
    "&:hover": {
        textDecoration: "none",
        color: "black",
        cursor: "pointer",
    },
};

export const RouteCellStyle = {
    justifyContent: "left",
    paddingX: "6px",
    borderRadius: "10px",
    width: "fit-content",
    "&:hover": {
        cursor: "pointer",
        bgcolor: "#ccc",
    },
};

const RollingHotArticleSection = () => {
    // console.info("RollingHotArticleSection rendered!");
    const [curItem, setCurItem] = useState(0);
    const timer = useRef<null | number>();
    const [hotPosts, setHotPosts] = useState<HotPostType[]>([]);
    const [globalHotState, setGlobalHotState] =
        useRecoilState<HotPostType[]>(hotPostAtom);

    useEffect(() => {
        if (globalHotState.length) {
            setHotPosts(globalHotState);
            timer.current = setInterval(() => {
                setCurItem((prev) => {
                    return prev === 9 ? 0 : prev + 1;
                });
            }, 4000);
            return () => {
                timer.current && clearInterval(timer.current);
            };
        } else {
            const api = async () => {
                const response = await instance<HotPostType[]>("/hot", {
                    cancelToken: source.token,
                });
                try {
                    if (response.status === 200) {
                        const tmp = response.data.sort(
                            (a, b) =>
                                b.post.dailyFluctuation -
                                a.post.dailyFluctuation
                        );
                        setHotPosts(tmp);
                        setGlobalHotState(tmp);
                    }
                    // else {
                    //     console.error(response.data);
                    // }
                } catch (error) {
                    if (axios.isCancel(error)) {
                        console.error("HotArticle request canceled!");
                    }
                }
            };
            api();
        }
    }, [globalHotState]);

    useEffect(() => {
        window.scrollTo(0, 0);
        return () => {
            source.cancel();
        };
    }, []);

    return (
        <>
            <TitleSection
                title={"🔥 주간 Hot 공지"}
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
                            <ArticleItemDetail
                                key={index}
                                current={curItem}
                                gtc="5% 10% 10% auto 10% 7%"
                            >
                                <Cell>{index + 1}</Cell>
                                <Cell sx={RouteCellStyle}>
                                    <CustomLink
                                        to={`/department/${department.id}`}
                                        sx={RouteFontStyle}
                                    >
                                        {department.name}
                                    </CustomLink>
                                </Cell>
                                <Cell sx={RouteCellStyle}>
                                    <CustomLink
                                        to={`/department/${department.id}/board/${board.id}?page=1`}
                                        sx={RouteFontStyle}
                                    >
                                        {board.name}
                                    </CustomLink>
                                </Cell>
                                <Cell sx={RouteCellStyle}>
                                    <CustomLink
                                        to={`/department/${department.id}/board/${board.id}/post/${post.id}`}
                                        sx={RouteFontStyle}
                                    >
                                        {post.title}
                                    </CustomLink>
                                </Cell>
                                <Cell>{post.uploadDate}</Cell>
                                <Cell>
                                    <ArrowDropUp sx={{ color: "red" }} />{" "}
                                    {post.dailyFluctuation}
                                </Cell>
                            </ArticleItemDetail>
                        );
                    })}
                </Box>
            ) : (
                <PostSkeleton />
            )}
        </>
    );
};

export default React.memo(RollingHotArticleSection);
