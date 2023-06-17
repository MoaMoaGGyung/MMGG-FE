import { Home, NavigateNext } from "@mui/icons-material";
import { Box, Breadcrumbs } from "@mui/material";
import CustomLink from "../CustomLink";
import { useRecoilValue } from "recoil";
import { breadcrumbState } from "../../store/store";
import Cell from "../Cell";

function Breadcrumb() {
    const state = useRecoilValue(breadcrumbState);

    return (
        <Box
            width="100%"
            bgcolor={"#ffeed8"}
            display={"flex"}
            alignItems={"center"}
        >
            <Box width={"80%"} height={"100%"} marginX={"auto"}>
                <Breadcrumbs separator={<NavigateNext fontSize="small" />}>
                    <CustomLink to="/">
                        <Home
                            sx={{
                                "&:hover": {
                                    color: "#3a3a3a",
                                },
                            }}
                        />
                    </CustomLink>
                    {location.pathname.indexOf("department") > -1 &&
                        state.department?.name && (
                            <CustomLink
                                to={`/department/${state.department.id}`}
                                sx={{
                                    "&:hover": {
                                        textDecoration: "underline",
                                        color: "#3a3a3a",
                                        cursor: "pointer",
                                    },
                                }}
                            >
                                {state.department.name}
                            </CustomLink>
                        )}
                    {location.pathname.indexOf("board") > -1 &&
                        state.board?.name && (
                            <CustomLink
                                to={`/department/${
                                    state.department!.id
                                }/board/${state.board.id}?page=1`}
                                sx={{
                                    "&:hover": {
                                        textDecoration: "underline",
                                        color: "#3a3a3a",
                                        cursor: "pointer",
                                    },
                                }}
                            >
                                {state.board.name}
                            </CustomLink>
                        )}
                    {location.pathname.indexOf("post") > -1 &&
                        state.post?.name && (
                            <CustomLink
                                to={`/department/${
                                    state.department!.id
                                }/board/${state.board!.id}/post/${
                                    state.post!.id
                                }`}
                                sx={{
                                    "&:hover": {
                                        textDecoration: "underline",
                                        color: "#3a3a3a",
                                        cursor: "pointer",
                                    },
                                }}
                            >
                                <Cell>{state.post.name}</Cell>
                            </CustomLink>
                        )}
                    {location.pathname.indexOf("hot") > -1 && (
                        <CustomLink
                            to={`/hot`}
                            sx={{
                                "&:hover": {
                                    textDecoration: "underline",
                                    color: "#3a3a3a",
                                    cursor: "pointer",
                                },
                            }}
                        >
                            <Cell>{`hot`}</Cell>
                        </CustomLink>
                    )}
                </Breadcrumbs>
            </Box>
        </Box>
    );
}

export default Breadcrumb;
