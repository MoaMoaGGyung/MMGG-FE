import { Box, Divider, Grid, Link, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import MockHotArticleJson from "../../mock/HotArticle.json";
import { Cell } from "../../components/Cell";

export default function Home() {
    return (
        <Grid
            container
            alignItems={"center"}
            pt={2}
            gap={1}
            direction={"column"}
            minHeight={"100%"}
            sm={8}
            xs={12}
            mx={"auto"}
        >
            <Grid
                container
                direction={"row"}
                // display={"flex"}
                alignItems={"baseline"}
                justifyContent={"space-between"}
                width={"100%"}
                mb={2}
            >
                <Typography
                    variant="h5"
                    component={"span"}
                    fontWeight={600}
                    fontFamily={"Noto Sans KR"}
                >
                    🔥 Hot 공지
                </Typography>
                <RouterLink to="/" style={{ textDecoration: "none" }}>
                    <Link
                        underline="none"
                        sx={{
                            color: "#b9b9b9",
                            fontFamily: "Inter",
                            fontSize: 15,
                            fontWeight: 100,
                            "&:hover": {
                                textDecoration: "underline",
                            },
                        }}
                        component={"span"}
                    >
                        더 보기
                    </Link>
                </RouterLink>
            </Grid>
            <Grid container width={"100%"}>
                <Box
                    flexDirection={"row"}
                    display={"grid"}
                    gridTemplateColumns={"5% 10% 10% auto 10% 7%"}
                    gap={1}
                    width={"100%"}
                >
                    <Box textAlign={"center"} fontSize={15}>
                        랭킹
                    </Box>
                    <Box textAlign={"center"} fontSize={15}>
                        학과
                    </Box>
                    <Box textAlign={"center"} fontSize={15}>
                        게시판
                    </Box>
                    <Box textAlign={"center"} fontSize={15}>
                        제목
                    </Box>
                    <Box textAlign={"center"} fontSize={15}>
                        날짜
                    </Box>
                    <Box textAlign={"center"} fontSize={15}>
                        조회수
                    </Box>
                </Box>
            </Grid>
            <Divider sx={{ width: "100%" }} />
            <Grid container>
                <Box
                    width={"100%"}
                    display={"flex"}
                    flexDirection={"column"}
                    gap={1}
                    overflow={"hidden"}
                    px={1}
                >
                    {MockHotArticleJson.map((props) => {
                        const {
                            id,
                            rank,
                            department,
                            bulletin,
                            title,
                            uploadDate,
                            view,
                        } = props;
                        return (
                            <Box
                                flexDirection={"row"}
                                display={"grid"}
                                gridTemplateColumns={"5% 10% 10% auto 10% 7%"}
                                width={"100%"}
                                key={id}
                                border={"0.5px solid #ccc"}
                                sx={{
                                    borderRadius: "10px",
                                    "&:hover": {
                                        cursor: "pointer",
                                        bgcolor: "#ccc",
                                    },
                                }}
                                py={2}
                            >
                                <Cell>{rank}</Cell>
                                <Cell>{department}</Cell>
                                <Cell>{bulletin}</Cell>
                                <Cell jc={"left"}>{title}</Cell>
                                <Cell>{uploadDate}</Cell>
                                <Cell>{view}</Cell>
                            </Box>
                        );
                    })}
                </Box>
            </Grid>
        </Grid>
    );
}
