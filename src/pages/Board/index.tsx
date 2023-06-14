import React, { useCallback, useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { alignmentState, breadcrumbState, instance } from "../../store/store";
import { Stack } from "@mui/system";
import { Box, Divider, Pagination } from "@mui/material";
import ArticleTableHead from "../../components/ArticleTableHead";
import ArticleItem from "../../components/ArticleItem";
import Cell from "../../components/Cell";
import TitleSection from "../../components/TitleSection";
import { useNavigate, useParams } from "react-router-dom";
import { BoardType } from "../../types/types";
import BoardSkeleton from "../../components/Skeletons/BoardSkeleton";

const Board = () => {
    console.info("Board Rendered!");
    const { type, direction } = useRecoilValue(alignmentState);
    const { dId, bId } = useParams() as { dId: string; bId: string };
    const navigate = useNavigate();
    const [state, setState] = useState<BoardType>({} as BoardType);
    const [page, setPage] = useState(1);
    const setBreadcrumb = useSetRecoilState(breadcrumbState);

    const handleChange = useCallback(
        (_: React.ChangeEvent<unknown>, value: number) => {
            setPage(value);
        },
        []
    );

    const api = useCallback(async (nextPage: number) => {
        try {
            const response = await instance<BoardType>(
                `/department/${dId}/board/${bId}?skip=${nextPage}&limit=20`
            );
            if (response.status === 200) {
                // console.debug(response.data);
                setState(response.data);
                setBreadcrumb({
                    department: {
                        name: response.data.dname,
                        id: parseInt(dId),
                    },
                    board: {
                        name: response.data.bname,
                        id: parseInt(bId),
                    },
                });
                setPage(response.data.curPage);
            } else {
                console.error(response.data);
            }
        } catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
        if (state.curPage && state.curPage !== page) {
            api(page - 1);
        }
    }, [page]);

    useEffect(() => {
        window.scrollTo(0, 0);
        if (!state.bname) api(page - 1);
    }, []);

    return state ? (
        <Stack direction={"column"} spacing={1} width={"100%"}>
            <TitleSection title={state.bname} py={2} />
            <Divider sx={{ width: "100%" }} />
            <ArticleTableHead
                items={["번호", "제목", "날짜", "조회수"]}
                gtc={"7% auto 10% 7%"}
            />
            {state?.posts
                ?.sort((a, b) => {
                    switch (type) {
                        case "date":
                            return (
                                (new Date(a.uploadDate).getTime() -
                                    new Date(b.uploadDate).getTime()) *
                                direction
                            );
                        case "view":
                            return (a.view - b.view) * direction;
                        default:
                            return 1;
                    }
                })
                .map(({ id, title, uploadDate, view }, index) => {
                    return (
                        <ArticleItem
                            key={index}
                            gtc="7% auto 10% 7%"
                            onClick={() => navigate(`./post/${id}`)}
                        >
                            <Cell>{id}</Cell>
                            <Cell>{title}</Cell>
                            <Cell justifyContent="flex-start">
                                {uploadDate}
                            </Cell>
                            <Cell>{view}</Cell>
                        </ArticleItem>
                    );
                })}
            <Box
                flexDirection={"row"}
                display={"flex"}
                justifyContent={"center"}
                width={"100%"}
            >
                <Pagination
                    count={state.totalPage}
                    shape="rounded"
                    page={page}
                    onChange={handleChange}
                />
            </Box>
        </Stack>
    ) : (
        <BoardSkeleton />
    );
};

export default React.memo(Board);
