import { Box, BoxProps } from "@mui/material";
import React from "react";

interface HomeLayoutType extends BoxProps {
    children: React.ReactNode;
}

const HomeLayout = ({ children, ...props }: HomeLayoutType) => {
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
            {...props}
        >
            {children}
        </Box>
    );
};

export default HomeLayout;
