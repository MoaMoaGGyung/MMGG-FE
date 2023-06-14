import { Divider, Skeleton } from "@mui/material";
import { Box, Stack } from "@mui/system";
import ArticleTableHead from "../ArticleTableHead";
import PostSkeletion from "./PostSkeletion";

function BoardSkeleton() {
    return (
        <Stack direction={"column"} spacing={1} width={"100%"}>
            <Skeleton
                variant="rounded"
                width={200}
                height={50}
                animation="wave"
            />
            <Divider sx={{ width: "100%" }} />
            <ArticleTableHead
                items={["번호", "제목", "날짜", "조회수"]}
                gtc={"5% auto 10% 7%"}
            />
            {new Array(20).fill(0).map((_, index) => {
                return <PostSkeletion key={index} />;
            })}
            <Box
                flexDirection={"row"}
                display={"flex"}
                justifyContent={"center"}
                width={"100%"}
                columnGap={2}
            >
                {new Array(10).fill(0).map((_, index) => {
                    return (
                        <Skeleton
                            variant="rounded"
                            width={30}
                            height={30}
                            key={index}
                        />
                    );
                })}
            </Box>
        </Stack>
    );
}

export default BoardSkeleton;
