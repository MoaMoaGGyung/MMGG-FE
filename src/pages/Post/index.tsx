import HomeLayout from "../../components/HomeLayout";
import { useParams } from "react-router-dom";
import { Box, Grid, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { instance } from "../../store/store";
import { PostType } from "../../types/types";
import PostSkeleton from "../../components/Skeletons/PostSkeleton";

const Post = () => {
    const { dId, bId, pId } = useParams() as {
        dId: string;
        bId: string;
        pId: string;
    };
    const [state, setState] = useState<PostType>();

    const api = useCallback(async () => {
        try {
            const response = await instance<PostType>(
                `/department/${dId}/board/${bId}/post/${pId}`
            );
            if (response.status === 200) {
                setState(response.data);
            } else {
                console.error(response.data);
            }
        } catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(() => {
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
                    <Typography
                        variant="h6"
                        sx={{ fontWeight: "bold" }}
                    >
                        {state.title}
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
                            {state.writer_name}
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
                    <Grid item xs={2} sx={{ p: 2 }}>
                        <Typography
                            sx={{
                                fontSize: 20,
                            }}
                        >
                            {state.click_cnt}
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
            <Box width={"80%"}
                dangerouslySetInnerHTML={{
                    __html: state.body,
                }}
            ></Box>
        </HomeLayout>
    ): (
        <PostSkeleton />
    );
};

export default Post;
