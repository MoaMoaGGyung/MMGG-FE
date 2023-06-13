import React, { useEffect, useMemo, useState } from "react";
import {
    useRecoilState,
    useRecoilStateLoadable,
    useRecoilValue,
    useSetRecoilState,
} from "recoil";
import { alignmentState, boardState, departmentAtom } from "../../store/store";
import MockBoard1 from "../../mock/Board1.json";
import { Stack } from "@mui/system";
import { Box, Divider, Pagination } from "@mui/material";
import ArticleTableHead from "../../components/ArticleTableHead";
import ArticleItem from "../../components/ArticleItem";
import Cell from "../../components/Cell";
import TitleSection from "../../components/TitleSection";
import { useNavigate, useParams } from "react-router-dom";
import { boardAtom } from "../../store/store";
import { produce } from "immer";

// 유저가 딱 처음 들어오면 page에 따라서 화면이 렌더링되게 해야됨.
// 근데 api를 쓰면 /posts/dId/bId?page=1 여기로 요청해서 받을 때 articles만 받아오면 됨.
// 근데 새로고침하면 현재 dName, bName 렌더링 안됨.
// dName, bName을 Detail에서 렌더링하고 근데 bName은 사용자가 department를 볼 때는 필요없음. 따라서 Board에서 받아서 전역 state를 set해주면 됨.
// 나머지 articles, totalPage를 Baord에서 가져옴.
// 사용자가 다른 페이지(2,3,...)으로 넘어가면 해당 페이지에 맞는 article들을 rendering함.
// 이때 데이터에 curPage 정보가 필요? 새로고침하면 전역 state 다 날아가기 때문에 필요함. 받아서 pagination에 현재 page rendering

const Board = () => {
    console.info("Board Rendered!");
    const { type, direction } = useRecoilValue(alignmentState);
    const { dId, bId } = useParams() as { dId: string; bId: string };
    const bState = useRecoilValue(boardAtom);
    const setDState = useSetRecoilState(departmentAtom);
    const [bStateLoadable, setBState] = useRecoilStateLoadable(
        boardState({
            dId: parseInt(dId),
            bId: parseInt(bId),
            page: bState.curPage,
        })
    );
    const navigate = useNavigate();
    const handleChange = (
        _event: React.ChangeEvent<unknown>,
        nextPage: number
    ) => {
        setBState(
            produce((draft) => {
                draft.curPage = nextPage;
                return draft;
            })
        );
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (bStateLoadable.state === "hasValue") {
            setBState(bStateLoadable.contents);
            setDState(
                produce((draft) => {
                    draft.department.name = bStateLoadable.contents.dName;
                    return draft;
                })
            );
        }
    }, [bStateLoadable]);

    useEffect(() => {
        if (bStateLoadable.state === "hasValue") {
            setBState(
                produce((draft) => {
                    draft.posts.sort((a, b) => {
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
                    });
                    return draft;
                })
            );
        }
    }, [type, direction]);

    return (
        <Stack direction={"column"} spacing={1} width={"100%"}>
            <TitleSection title={bState.bName} py={2} />
            <Divider sx={{ width: "100%" }} />
            <ArticleTableHead
                items={["번호", "제목", "날짜", "조회수"]}
                gtc={"5% auto 10% 7%"}
            />
            {bState?.posts.map(({ id, title, uploadDate, view }, index) => {
                return (
                    <ArticleItem
                        key={index}
                        gtc="5% auto 10% 7%"
                        onClick={() => navigate(`./post/${id}`)}
                    >
                        <Cell>{id}</Cell>
                        <Cell sx={{ justifyContent: "left" }}>{title}</Cell>
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
                    count={bState.totalPage}
                    shape="rounded"
                    page={bState.curPage}
                    onChange={handleChange}
                />
            </Box>
        </Stack>
    );
};

export default React.memo(Board);
