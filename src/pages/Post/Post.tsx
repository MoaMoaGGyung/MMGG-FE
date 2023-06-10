import HomeLayout from "../../components/HomeLayout";
import TitleSection from "../../components/TitleSection";
import MockPost from "../../mock/Post.json";
import { useParams } from "react-router-dom";
import { Box, Grid, Typography } from "@mui/material";

const Post = () => {
    const { postId } = useParams();
    return (
        <HomeLayout>
            {MockPost.filter(
                ({ article_no }) => article_no === Number(postId)
            ).map(({ article_title, article_text, writer_nm, click_cnt }) => {
                return (
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
                                    {article_title}
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
                                        {writer_nm}
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
                                        {click_cnt}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Box>
                        <Box
                            key={Number(postId)}
                            dangerouslySetInnerHTML={{
                                __html: article_text,
                            }}
                        ></Box>
                    </>
                );
            })}
        </HomeLayout>
    );
};

export default Post;
