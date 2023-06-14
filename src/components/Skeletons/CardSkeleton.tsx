import { Card, CardContent, Skeleton, Stack } from "@mui/material";
import { Box } from "@mui/system";

function CardSkeleton() {
    return (
        <Card>
            <CardContent>
                <Box
                    display={"flex"}
                    justifyContent={"left"}
                    alignItems={"center"}
                    width={"100%"}
                    height={"100%"}
                >
                    <Skeleton width={"50%"} height={50} animation="wave" />
                </Box>
                <Skeleton width={"100%"} height={5} animation="wave" />
                <Stack direction={"column"}>
                    {new Array(6).fill(0).map((_, index) => {
                        return (
                            <Skeleton
                                variant="text"
                                animation="wave"
                                key={index}
                            />
                        );
                    })}
                </Stack>
            </CardContent>
        </Card>
    );
}

export default CardSkeleton;
