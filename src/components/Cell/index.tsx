import { Box, BoxProps } from "@mui/material";
import React from "react";

interface CellType extends BoxProps {
    children: React.ReactNode;
}

const Cell = ({ children, justifyContent, ...rest }: CellType) => {
    return (
        <Box
            display={"flex"}
            justifyContent={justifyContent || "center"}
            alignItems={"center"}
            fontSize={"15px"}
            position={"relative"}
            overflow={"hidden"}
            whiteSpace={"nowrap"}
            {...rest}
        >
            {children}
        </Box>
    );
};

export default Cell;
