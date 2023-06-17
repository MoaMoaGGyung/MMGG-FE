import HomeLayout from "../../components/HomeLayout";
import { useParams } from "react-router-dom";
import { Box, Grid, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { breadcrumbState, instance } from "../../store/store";
import { PostType } from "../../types/types";
import { useSetRecoilState } from "recoil";
import { produce } from "immer";
import PostDetailSkeleton from "../../components/Skeletons/PostDetailSkeleton";
import CustomLink from "../../components/CustomLink";
import Cell from "../../components/Cell";

const Post = () => {
    const { dId, bId, pId } = useParams() as {
        dId: string;
        bId: string;
        pId: string;
    };
    const [state, setState] = useState<PostType>();
    const setBreadcrumbState = useSetRecoilState(breadcrumbState);

    const api = useCallback(async () => {
        try {
            const response = await instance<PostType>(
                `/department/${dId}/board/${bId}/post/${pId}`
            );
            if (response.status === 200) {
                const hostInjectedData = produce(response.data, (draft) => {
                    draft.post.body = draft.post.body.replaceAll(
                        'src="/',
                        `src="${draft.post.base_url}`
                    );
                    console.debug(draft.post.base_url);
                });
                setState(hostInjectedData);
                setBreadcrumbState({
                    department: response.data.department,
                    board: response.data.board,
                    post: {
                        name: response.data.post.title,
                        id: response.data.post.id,
                    },
                });
            } else {
                console.error(response.data);
            }
        } catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
        api();
    }, []);

    return state ? (
        <HomeLayout>
            <Box width={"80%"}>
                <Box
                    sx={{
                        bgcolor: "#e1e3eb",
                        p: 2,
                        borderBottom: 2,
                        borderColor: "#a4a8b8",
                    }}
                >
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                        {state.post.title}
                    </Typography>
                </Box>
                <Grid
                    container
                    sx={{
                        borderBottom: 2,
                        borderColor: "#a4a8b8",
                    }}
                >
                    <Grid
                        item
                        xs={1.5}
                        sx={{
                            bgcolor: "#e1e3eb",
                            p: 2,
                            borderRight: 2,
                            borderColor: "#a4a8b8",
                            textAlign: "center",
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: 20,
                            }}
                        >
                            작성자
                        </Typography>
                    </Grid>
                    <Grid item xs={8} sx={{ p: 2 }}>
                        <Typography
                            sx={{
                                fontSize: 20,
                            }}
                        >
                            {state.post.writer}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid
                    container
                    sx={{
                        borderBottom: 2,
                        borderColor: "#a4a8b8",
                    }}
                >
                    <Grid
                        item
                        xs={1.5}
                        sx={{
                            bgcolor: "#e1e3eb",
                            p: 2,
                            borderRight: 2,
                            borderColor: "#a4a8b8",
                            textAlign: "center",
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: 20,
                            }}
                        >
                            조회수
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xs={4}
                        sx={{
                            p: 2,
                            borderRight: 2,
                            borderColor: "#a4a8b8",
                            textAlign: "left",
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: 20,
                            }}
                        >
                            {state.post.view}
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xs={1.5}
                        sx={{
                            bgcolor: "#e1e3eb",
                            p: 2,
                            borderRight: 2,
                            borderColor: "#a4a8b8",
                            textAlign: "center",
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: 20,
                            }}
                        >
                            날짜
                        </Typography>
                    </Grid>
                    <Grid item xs={4} sx={{ p: 2 }}>
                        <Typography
                            sx={{
                                fontSize: 20,
                            }}
                        >
                            {state.post.uploadDate}
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
            <Box
                width={"80%"}
                sx={{
                    "& table, & tr, & td": {
                        border: "1px solid black",
                        borderCollapse: "collapse",
                    },
                }}
                dangerouslySetInnerHTML={{
                    __html: state.post.body,
                }}
            />
            <Box width={"80%"} borderTop={"1px solid #a4a8b8"}>
                <Box
                    display={"grid"}
                    gridTemplateColumns={"20% auto"}
                    flexDirection={"row"}
                    borderBottom={"1px solid #a4a8b8"}
                >
                    <Box
                        textAlign={"center"}
                        borderRight={"1px solid #a4a8b8"}
                        fontSize={"20px"}
                        fontFamily={"Nanum Gothic"}
                        py={2}
                    >
                        다음글
                    </Box>
                    <Cell
                        justifyContent={"left"}
                        sx={{
                            boxSizing: "border-box",
                            height: "100%",
                            width: "100%",
                            pl: 2,
                            "& a": {
                                width: "100%",
                            },
                        }}
                    >
                        <CustomLink
                            to="/"
                            sx={{
                                width: "100%",
                                color: "black",
                                fontWeight: 400,
                                "&:hover": {
                                    color: "black",
                                },
                            }}
                        >
                            <Box
                                sx={{
                                    boxSizing: "border-box",
                                    width: "100%",
                                    pl: 1,
                                    borderRadius: "10px",
                                    "&:hover": {
                                        cursor: "pointer",
                                        bgcolor: "#aaa",
                                    },
                                }}
                            >
                                aaa
                            </Box>
                        </CustomLink>
                    </Cell>
                </Box>
                <Box
                    display={"grid"}
                    gridTemplateColumns={"20% auto"}
                    flexDirection={"row"}
                    borderBottom={"1px solid #a4a8b8"}
                >
                    <Box
                        textAlign={"center"}
                        borderRight={"1px solid #a4a8b8"}
                        fontSize={"20px"}
                        fontFamily={"Nanum Gothic"}
                        py={2}
                    >
                        이전글
                    </Box>
                    <Cell
                        justifyContent={"left"}
                        sx={{
                            boxSizing: "border-box",
                            height: "100%",
                            width: "100%",
                            pl: 2,
                            "& a": {
                                width: "100%",
                            },
                        }}
                    >
                        <CustomLink
                            to="/"
                            sx={{
                                width: "100%",
                                color: "black",
                                fontWeight: 400,
                                "&:hover": {
                                    color: "black",
                                },
                            }}
                        >
                            <Box
                                sx={{
                                    boxSizing: "border-box",
                                    width: "100%",
                                    pl: 1,
                                    borderRadius: "10px",
                                    "&:hover": {
                                        cursor: "pointer",
                                        bgcolor: "#aaa",
                                    },
                                }}
                            >
                                aaa
                            </Box>
                        </CustomLink>
                    </Cell>
                </Box>
            </Box>
        </HomeLayout>
    ) : (
        <PostDetailSkeleton />
    );
};

export default Post;
