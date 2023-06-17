import React, { useCallback, useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { alignmentState, breadcrumbState, instance } from "../../store/store";
import { Stack } from "@mui/system";
import { Box, Divider, Pagination } from "@mui/material";
import ArticleTableHead from "../../components/ArticleTableHead";
import ArticleItem from "../../components/ArticleItem";
import Cell from "../../components/Cell";
import TitleSection from "../../components/TitleSection";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { BoardType } from "../../types/types";
import BoardSkeleton from "../../components/Skeletons/BoardSkeleton";

const Board = () => {
    console.info("Board Rendered!");
    const { type, direction } = useRecoilValue(alignmentState);
    const { dId, bId } = useParams() as { dId: string; bId: string };
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const [state, setState] = useState<BoardType>({} as BoardType);
    const [loading, setLoading] = useState(false);
    const setBreadcrumb = useSetRecoilState(breadcrumbState);
    const handleChange = useCallback(
        (_: React.ChangeEvent<unknown>, value: number) => {
            searchParams.set("page", value + ``);
            setSearchParams(searchParams);
        },
        []
    );

    const api = useCallback(async (nextPage: number) => {
        setLoading(true);
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
            }
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
        api(parseInt(searchParams.get("page")!) - 1);
    }, [searchParams]);

    useEffect(() => {
        window.scrollTo(0, 0);
        api(parseInt(searchParams.get("page")!) - 1);
    }, []);

    return !loading ? (
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
                            <Cell justifyContent={"left"} paddingLeft={5}>
                                {title}
                            </Cell>
                            <Cell>{uploadDate}</Cell>
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
                    page={parseInt(searchParams.get("page")!)}
                    onChange={handleChange}
                />
            </Box>
        </Stack>
    ) : (
        <BoardSkeleton />
    );
};

export default React.memo(Board);
