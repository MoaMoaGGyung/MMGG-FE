import { Box, Typography, TypographyProps } from "@mui/material";
import { CustomLink } from "../CustomLink";
import React from "react";

interface TitleSectionType extends TypographyProps {
    title: string;
    link?: string;
    linkLabel?: string;
}

const TitleSection = ({
    title,
    link,
    linkLabel = "더 보기",
    variant = "h5",
}: TitleSectionType) => {
    return (
        <Box
            display={"flex"}
            flexDirection={"row"}
            alignItems={"baseline"}
            justifyContent={"space-between"}
            width={"100%"}
        >
            <Typography
                variant={variant}
                component={"span"}
                fontWeight={600}
                fontFamily={"Noto Sans KR"}
            >
                {title}
            </Typography>
            {link && <CustomLink to={link}>{linkLabel}</CustomLink>}
        </Box>
    );
};

export default React.memo(TitleSection);
