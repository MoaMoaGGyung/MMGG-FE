import { Divider } from "@mui/material";
import ArticleTableHead from "../../components/ArticleTableHead";
import HomeLayout from "../../components/HomeLayout";
import TitleSection from "../../components/TitleSection";
import { Box } from "@mui/system";
import ArticleItem from "../../components/ArticleItem";
import Cell from "../../components/Cell";
import { ArrowDropUp } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useResetRecoilState } from "recoil";
import { breadcrumbState, hotPostAtom, instance } from "../../store/store";
import { useCallback, useEffect, useState } from "react";
import HotArticlesSkeleton from "../../components/Skeletons/HotArticlesSkeleton";
import { HotPostType } from "../../types/types";
import ArticleItemDetail from "../../components/ArticleItemDetail";

function HotArticles() {
    const navigate = useNavigate();
    const [hotPosts, setHotPosts] = useState<HotPostType[]>([]);
    const [globalHotState, setGlobalHotState] =
        useRecoilState<HotPostType[]>(hotPostAtom);
    const resetBreadcrumbState = useResetRecoilState(breadcrumbState);

    const api = useCallback(async () => {
        const response = await instance<HotPostType[]>("/hot");
        if (response.status === 200) {
            const tmp = response.data.sort(
                (a, b) => b.post.dailyFluctuation - a.post.dailyFluctuation
            );
            setHotPosts(tmp);
            setGlobalHotState(tmp);
        } else {
            console.error(response.data);
        }
    }, []);

    useEffect(() => {
        resetBreadcrumbState();
    }, []);

    useEffect(() => {
        if (globalHotState.length) {
            setHotPosts(globalHotState);
        } else {
            api();
        }
    }, [globalHotState]);

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
            <TitleSection title={"🔥 주간 Hot 공지"} />
            <Divider sx={{ width: "100%" }} />
            <ArticleTableHead items={theadTitle} gtc="5% 10% 10% auto 10% 7%" />
            <Box
                width={"100%"}
                display={"flex"}
                flexDirection={"column"}
                gap={1}
                px={1}
            >
                {hotPosts.length ? (
                    hotPosts.map((props, index) => {
                        const { department, board, post } = props;
                        return (
                            <ArticleItemDetail
                                key={index}
                                gtc="5% 10% 10% auto 10% 7%"
                            >
                                <Cell>{index + 1}</Cell>
                                <Cell
                                    sx={{
                                        justifyContent: "left",
                                        paddingLeft: "6px",
                                        borderRadius: "10px",
                                        "&:hover": {
                                            cursor: "pointer",
                                            bgcolor: "#ccc",
                                        },
                                    }}
                                    onClick={() => {
                                        navigate(
                                            `/department/${department.id}`
                                        );
                                    }}
                                >
                                    {department.name}
                                </Cell>
                                <Cell
                                    sx={{
                                        justifyContent: "left",
                                        paddingLeft: "6px",
                                        borderRadius: "10px",
                                        "&:hover": {
                                            cursor: "pointer",
                                            bgcolor: "#ccc",
                                        },
                                    }}
                                    onClick={() => {
                                        navigate(
                                            `/department/${department.id}/board/${board.id}`
                                        );
                                    }}
                                >
                                    {board.name}
                                </Cell>
                                <Cell
                                    sx={{
                                        justifyContent: "left",
                                        paddingLeft: "6px",
                                        borderRadius: "10px",
                                        "&:hover": {
                                            cursor: "pointer",
                                            bgcolor: "#ccc",
                                        },
                                    }}
                                    onClick={() =>
                                        navigate(
                                            `/department/${department.id}/board/${board.id}/post/${post.id}`
                                        )
                                    }
                                >
                                    {post.title}
                                </Cell>
                                <Cell>{post.uploadDate}</Cell>
                                <Cell>
                                    <ArrowDropUp sx={{ color: "red" }} />{" "}
                                    {post.dailyFluctuation}
                                </Cell>
                            </ArticleItemDetail>
                        );
                    })
                ) : (
                    <HotArticlesSkeleton />
                )}
            </Box>
        </HomeLayout>
    );
}

export default HotArticles;
