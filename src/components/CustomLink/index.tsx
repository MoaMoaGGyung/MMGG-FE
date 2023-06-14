import { Box, BoxProps } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

interface CustomLinkType extends BoxProps {
    to: string;
    onLinkClicked?: () => void;
    children: React.ReactNode | string;
}

const CustomLink = ({
    children,
    to,
    onLinkClicked,
    sx,
    ...rest
}: CustomLinkType) => {
    const navigate = useNavigate();
    return (
        <Box
            sx={Object.assign(
                {
                    width: "fit-content",
                    color: "#b2b2b2",
                    fontWeight: 300,
                    fontSize: "20px",
                    "&:hover": {
                        cursor: "pointer",
                        color: "#3d3aff",
                        textDecoration: "underline",
                    },
                },
                sx
            )}
            onClick={() => {
                onLinkClicked && onLinkClicked();
                navigate(to);
            }}
            {...rest}
        >
            {children}
        </Box>
    );
};

export default CustomLink;
