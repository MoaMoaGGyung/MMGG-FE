import { Box, BoxProps, TooltipProps } from "@mui/material";
import React from "react";

interface CellType extends BoxProps {}
const Cell = (
    { children, justifyContent, ...rest }: CellType,
    ref: React.ForwardedRef<TooltipProps>
) => {
    return (
        <Box
            display={"flex"}
            justifyContent={justifyContent || "center"}
            alignItems={"center"}
            fontSize={"15px"}
            position={"relative"}
            overflow={"hidden"}
            whiteSpace={"nowrap"}
            ref={ref}
            {...rest}
        >
            {children}
        </Box>
    );
};

export default React.forwardRef(Cell);
