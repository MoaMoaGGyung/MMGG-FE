import HomeLayout from "../HomeLayout";
import { Box, Grid, Skeleton, Typography } from "@mui/material";

function PostDetailSkeleton() {
    return (
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
                    <Skeleton width={"80%"} height={30} />
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
                        <Skeleton width={150} height={30} />
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
                        <Skeleton width={150} height={30} />
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
                        <Skeleton width={150} height={30} />
                    </Grid>
                </Grid>
            </Box>
            <Box width={"80%"}>
                {new Array(4).fill(0).map((_, index) => (
                    <Skeleton
                        variant="text"
                        width={`${Math.random() * 100}%`}
                        key={index}
                    />
                ))}
                <Skeleton
                    variant="rounded"
                    width={"50%"}
                    height={"400px"}
                    sx={{ marginY: "10px" }}
                />
                {new Array(7).fill(0).map((_, index) => (
                    <Skeleton
                        variant="text"
                        width={`${Math.random() * 100}%`}
                        key={index}
                    />
                ))}
            </Box>
        </HomeLayout>
    );
}

export default PostDetailSkeleton;
