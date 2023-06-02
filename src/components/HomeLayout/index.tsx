import { Box } from "@mui/material";
import React from "react";

type HomeLayoutType = {
    children: React.ReactNode;
};

const HomeLayout = ({ children }: HomeLayoutType) => {
    return (
        <Box
            py={2}
            gap={1}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            minHeight={"100%"}
            width={"80%"}
            mx={"auto"}
        >
            {children}
        </Box>
    );
};

export default HomeLayout;
