import { Skeleton } from "@mui/material";
import ArticleItem from "../ArticleItem";
import Cell from "../Cell";

function PostSkeletion() {
    return (
        <ArticleItem gtc="5% 10% 10% auto 10% 7%">
            {new Array(7).fill(0).map((_, index) => {
                return (
                    <Cell key={index} display={"flex"} alignItems={"center"}>
                        <Skeleton
                            variant="rounded"
                            animation="wave"
                            width={"100%"}
                            height={"60%"}
                        />
                    </Cell>
                );
            })}
        </ArticleItem>
    );
}

export default PostSkeletion;
