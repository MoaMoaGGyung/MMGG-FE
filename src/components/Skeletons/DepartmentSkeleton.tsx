import { Box, Skeleton } from "@mui/material";

export default function DepartmentSkeleton() {
    return (
        <Box
            display={"flex"}
            justifyContent={"left"}
            alignItems={"center"}
            width={"50%"}
        >
            <Skeleton
                variant="rounded"
                width={"100%"}
                height={"40px"}
                animation="wave"
            />
        </Box>
    );
}
