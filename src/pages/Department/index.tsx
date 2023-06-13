import TitleSection from "../../components/TitleSection";
import { Stack, Divider } from "@mui/material";
import Cell from "../../components/Cell";
import ArticleTableHead from "../../components/ArticleTableHead";
import ArticleItem from "../../components/ArticleItem";
import { useRecoilStateLoadable, useRecoilValue } from "recoil";
import {
    alignmentState,
    departmentAtom,
    departmentState,
} from "../../store/store";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { departmentType } from "../../types/types";
import { produce } from "immer";

const Department = () => {
    console.info("Department rendered!");
    const { dId } = useParams() as { dId: string };
    const navigate = useNavigate();
    const [dStateLoadable, setDState] = useRecoilStateLoadable(
        departmentState(parseInt(dId))
    );
    const dState = useRecoilValue<departmentType>(departmentAtom);
    const { type, direction } = useRecoilValue(alignmentState);

    useEffect(() => {
        if (dStateLoadable.state === "hasValue") {
            setDState(
                produce((draft) => {
                    draft.boards.map(({ posts }) =>
                        posts.sort((a, b) => {
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
                    );
                    return draft;
                })
            );
        }
    }, [type, direction]);

    useEffect(() => {
        if (dStateLoadable.state === "hasValue") {
            setDState(dStateLoadable.contents);
        }
    }, [dStateLoadable]);

    return (
        <>
            <Stack direction={"column"} spacing={4} width={"100%"}>
                {dState?.boards.map(({ name, id: bId, posts }, index) => {
                    return (
                        <Stack
                            direction={"column"}
                            spacing={1}
                            width={"100%"}
                            key={index}
                        >
                            <TitleSection
                                title={name}
                                py={2}
                                link={`./board/${bId}`}
                                linkLabel="더 보기"
                                onLinkClicked={() => {}}
                            />
                            <Divider sx={{ width: "100%" }} />
                            <ArticleTableHead
                                items={["번호", "제목", "날짜", "조회수"]}
                                gtc={"5% auto 10% 7%"}
                            />
                            {posts.map(
                                ({ id: pId, title, uploadDate, view }) => {
                                    return (
                                        <ArticleItem
                                            key={pId}
                                            gtc="5% auto 10% 7%"
                                            onClick={() =>
                                                navigate(
                                                    `/department/${dId}/board/${bId}/post/${pId}`
                                                )
                                            }
                                        >
                                            <Cell>{pId}</Cell>
                                            <Cell>{title}</Cell>
                                            <Cell>{uploadDate}</Cell>
                                            <Cell>{view}</Cell>
                                        </ArticleItem>
                                    );
                                }
                            )}
                        </Stack>
                    );
                })}
            </Stack>
        </>
    );
};

export default Department;
