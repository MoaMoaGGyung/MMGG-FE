import { Box, Typography } from "@mui/material";
import { CustomLink } from "../CustomLink";
import React from "react";

type TitleSectionType = {
    title: string;
    link: string;
    isMore?: boolean;
};

const TitleSection = ({ title, link, isMore = true }: TitleSectionType) => {
    return (
        <Box
            display={"flex"}
            flexDirection={"row"}
            alignItems={"baseline"}
            justifyContent={"space-between"}
            width={"100%"}
        >
            <Typography
                variant="h5"
                component={"span"}
                fontWeight={600}
                fontFamily={"Noto Sans KR"}
            >
                {title}
            </Typography>
            {isMore && <CustomLink to={link}>더 보기</CustomLink>}
        </Box>
    );
};

export default React.memo(TitleSection);
