import { Box, SxProps } from "@mui/material";
import React from "react";
import { Link, LinkProps } from "react-router-dom";

interface CustomLinkType extends LinkProps {
    sx?: SxProps;
    children: React.ReactNode | string;
    onLinkClicked?: () => void;
}

const CustomLink = ({ children, to, onLinkClicked, sx }: CustomLinkType) => {
    const newSx = Object.assign(
        {
            width: "fit-content",
            color: "#b2b2b2",
            fontWeight: 300,
            fontSize: "20px",
            "&:hover": {
                cursor: "pointer",
                color: "#3d3aff",
                textDecoration: "none",
            },
        },
        sx
    );
    return (
        <Link to={to} style={{ textDecoration: "none" }}>
            <Box
                sx={newSx}
                onClick={() => {
                    onLinkClicked && onLinkClicked();
                }}
            >
                {children}
            </Box>
        </Link>
    );
};

export default React.memo(CustomLink);
