import TitleSection from "../../components/TitleSection";
import { Stack, Divider } from "@mui/material";
import Cell from "../../components/Cell";
import ArticleTableHead from "../../components/ArticleTableHead";
import ArticleItem from "../../components/ArticleItem";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { alignmentState, departmentAtom, instance } from "../../store/store";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { DepartmentType } from "../../types/types";
import DepartmentSkeleton from "../../components/Skeletons/DepartmentSkeleton";

const Department = () => {
    console.info("Department rendered!");
    const { dId } = useParams() as { dId: string };
    const navigate = useNavigate();
    const [dState, setDState] = useState<DepartmentType>();
    const { type, direction } = useRecoilValue(alignmentState);
    const [loading, setLoading] = useState(false);
    const setGlobalDState = useSetRecoilState(departmentAtom);

    useEffect(() => {
        const api = async () => {
            setLoading(true);
            const response = await instance<DepartmentType>(
                `/department/${dId}?limit=6`
            );
            if (response.status === 200) {
                setDState(response.data);
                setGlobalDState(response.data.department);
            } else {
                console.error(response.data);
            }
            setLoading(false);
        };
        api();
    }, []);

    return (
        <>
            {!loading ? (
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
                                {posts
                                    .sort((a, b) => {
                                        switch (type) {
                                            case "date":
                                                return (
                                                    (new Date(
                                                        a.uploadDate
                                                    ).getTime() -
                                                        new Date(
                                                            b.uploadDate
                                                        ).getTime()) *
                                                    direction
                                                );
                                            case "view":
                                                return (
                                                    (a.view - b.view) *
                                                    direction
                                                );
                                            default:
                                                return 1;
                                        }
                                    })
                                    .map(
                                        ({
                                            id: pId,
                                            title,
                                            uploadDate,
                                            view,
                                        }) => {
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
                                                    <Cell
                                                        justifyContent={"left"}
                                                        paddingLeft={5}
                                                    >
                                                        {title}
                                                    </Cell>
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
            ) : (
                <DepartmentSkeleton />
            )}
        </>
    );
};

export default Department;
