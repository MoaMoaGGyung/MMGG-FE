import { Divider, Skeleton, Stack } from "@mui/material";
import ArticleTableHead from "../ArticleTableHead";
import PostSkeleton from "./PostSkeleton";

function DepartmentSkeleton() {
    return (
        <Stack direction={"column"} spacing={2} width={"100%"}>
            {new Array(4).fill(0).map((_, index) => {
                return (
                    <Stack
                        direction={"column"}
                        spacing={1}
                        width={"100%"}
                        key={index}
                    >
                        <Skeleton
                            variant="rounded"
                            width={200}
                            height={30}
                            animation="wave"
                        />
                        <Divider sx={{ width: "100%" }} />
                        <ArticleTableHead
                            items={["번호", "제목", "날짜", "조회수"]}
                            gtc={"5% auto 10% 7%"}
                        />
                        {new Array(6).fill(0).map((_, index) => {
                            return <PostSkeleton key={index} />;
                        })}
                    </Stack>
                );
            })}
        </Stack>
    );
}

export default DepartmentSkeleton;
