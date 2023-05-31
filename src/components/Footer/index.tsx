import { Box, Typography } from "@mui/material";

function Footer() {
    return (
        <Box
            width={"100%"}
            height={50}
            color={"white"}
            bgcolor={"#2a2a2a"}
            // position={"absolute"}
            // bottom={0}
        >
            <Typography
                variant="subtitle2"
                component={"div"}
                height={"100%"}
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "right",
                }}
                fontWeight={200}
                pr={1}
            >
                Copyright 2023 MMGG, All rights Reserved
            </Typography>
        </Box>
    );
}

export default Footer;
