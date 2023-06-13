import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Card,
    CardContent,
    Divider,
    Grid,
    Paper,
    Skeleton,
    Stack,
    Typography,
} from "@mui/material";
import Cell from "../Cell";
import CustomLink from "../CustomLink";
import React, { useEffect, useState } from "react";
import { SetterOrUpdater, useRecoilValue } from "recoil";
import TitleSection from "../TitleSection";
import { LoadableStateType, recentPostType } from "../../types/types";
import { produce } from "immer";
import { Masonry } from "@mui/lab";
import { ExpandMore } from "@mui/icons-material";
import { keywordAtom } from "../../store/store";

type SectionType = {
    recentPosts: recentPostType[];
    setRecentPosts: SetterOrUpdater<recentPostType[]>;
};

const BulletinSection = ({ recentPosts, setRecentPosts }: SectionType) => {
    console.info("BulletinSection rendered!");
    const keyword = useRecoilValue(keywordAtom);
    const [posts, setPosts] = useState([...recentPosts]);

    useEffect(() => {
        if (keyword) {
            setPosts((prev) => {
                const tmp = prev.filter(
                    ({ department }) => department.name.indexOf(keyword) > -1
                );
                console.debug(tmp);
                return tmp;
            });
        } else {
            setPosts([...recentPosts]);
        }
    }, [keyword]);

    return (
        <Stack direction={"column"} rowGap={2} width={"100%"}>
            <TitleSection title="📄 게시판" />
            <Divider sx={{ width: "100%" }} />
            <Masonry
                columns={{ xs: 1, sm: 2, md: 3 }}
                spacing={{ xs: 1, sm: 2 }}
            >
                {posts.map(({ department, recent_posts }, index) => {
                    const { name, id } = department;
                    return (
                        <Card elevation={1} key={index}>
                            <CardContent>
                                <Stack direction={"column"} spacing={1}>
                                    <CustomLink
                                        to={`/department/${id}`}
                                        onLinkClicked={() => {}}
                                        sx={{
                                            color: "black",
                                            fontWeight: 700,
                                            fontSize: "30px",
                                        }}
                                    >
                                        {name}
                                    </CustomLink>
                                    <Divider />
                                    <Typography
                                        variant="body1"
                                        component={"span"}
                                        color={"text.secondary"}
                                        fontWeight={1000}
                                    >
                                        최근 게시물
                                    </Typography>
                                </Stack>
                                <Stack
                                    direction={"column"}
                                    spacing={1}
                                    // component={"ul"}
                                    sx={{
                                        margin: 0,
                                        padding: "16px 0",
                                    }}
                                >
                                    {recent_posts.map(
                                        ({ title, dId, bId, pId }, index) => {
                                            return (
                                                <Cell
                                                    key={index}
                                                    justifyContent={"left"}
                                                    sx={{
                                                        justifyContent: "left",
                                                    }}
                                                    // component={"li"}
                                                >
                                                    <CustomLink
                                                        to={`/department/${dId}/board/${bId}/post/${pId}`}
                                                        sx={{
                                                            color: "black",
                                                        }}
                                                    >
                                                        {title}
                                                    </CustomLink>
                                                </Cell>
                                            );
                                        }
                                    )}
                                </Stack>
                            </CardContent>
                        </Card>
                    );
                })}
            </Masonry>
        </Stack>
    );
};

export default React.memo(BulletinSection);
