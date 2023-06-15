import HomeLayout from "../../components/HomeLayout";
import { useParams } from "react-router-dom";
import { Box, Grid, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { alignmentState, departmentAtom, instance } from "../../store/store";
import { BodyType, PostType } from "../../types/types";
import BoardSkeleton from "../../components/Skeletons/BoardSkeleton";

const Post = () => {
    const { dId, bId, pId } = useParams() as {
        dId: string;
        bId: string;
        pId: string;
    };
    const [state, setState] = useState<PostType>();
    const [body, setBody] = useState<String>('');

    const test2 = "<div>hello</div>"
    const test = "<div class=\"fr-view\"><p><img src=\"/_attach/image/editor_image/2023/06/WQedyxvuWUCFxdumwMZS0.jpg\" class=\"fr-fic fr-dib\" data-path=\"/_attach/image/editor_image/2023/06/WQedyxvuWUCFxdumwMZS0.jpg\" data-size=\"2786646\" data-success=\"true\" data-file_name=\"WQedyxvuWUCFxdumwMZS0.jpg\" data-width=\"1199\" data-alt=\"screen shot\" data-height=\"1698\"><img src=\"/_attach/image/editor_image/2023/06/GKhUpOcamXqLPWOkmPlC0.jpg\" class=\"fr-fic fr-dib\" data-path=\"/_attach/image/editor_image/2023/06/GKhUpOcamXqLPWOkmPlC0.jpg\" data-size=\"2667094\" data-success=\"true\" data-file_name=\"GKhUpOcamXqLPWOkmPlC0.jpg\" data-width=\"1199\" data-alt=\"screen shot\" data-height=\"1698\"></p></div>"

    const api = useCallback(async () => {
        try {
            const response = await instance<PostType>(
                `/department/${dId}/board/${bId}/post/${pId}`
            );
            if (response.status === 200) {
                // setPost(response.data);
                console.log(response.data);
                setState(response.data);
                setBody(String(response.data.body));
                console.log((response.data.body))
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

    return <div>
        {test}
        <div dangerouslySetInnerHTML={{__html: test2}}></div>
        <div dangerouslySetInnerHTML={{__html: test}}></div>
    </div>;
/*
    return state ? (
        <HomeLayout>
        
                    <>
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
                                    {state?.title}
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
                                <Grid item xs={2} sx={{ p: 2 }}>
                                    <Typography
                                        sx={{
                                            fontSize: 20,
                                        }}
                                    >
                                        {state?.writer_name}
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
                        <Box
                            dangerouslySetInnerHTML={{
                                __html: state.body.div,
                            }}
                        ></Box>
                    </>

        </HomeLayout>
    ): (
        <BoardSkeleton />
    );
    */
};

export default Post;
