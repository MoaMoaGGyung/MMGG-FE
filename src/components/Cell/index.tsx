import { Box, BoxProps } from "@mui/material";
import React from "react";

interface CellType extends BoxProps {
    children: React.ReactNode;
}

const Cell = ({ children, sx, component, ...rest }: CellType) => {
    return (
        <Box
            component={component}
            sx={Object.assign(
                {
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "15px",
                    position: "relative",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                },
                sx
            )}
            {...rest}
        >
            {children}
        </Box>
    );
};

export default Cell;
