import {
    Card,
    CardContent,
    Divider,
    Grid,
    Skeleton,
    Stack,
    Typography,
} from "@mui/material";
import Cell from "../Cell";
import CustomLink from "../CustomLink";
import React, { useEffect, useState } from "react";
import { SetterOrUpdater } from "recoil";
import TitleSection from "../TitleSection";
import { recentPostType } from "../../types/types";

type SectionType = {
    keyword: string;
    recentPosts: recentPostType[];
    setRecentPosts: SetterOrUpdater<recentPostType[]>;
};

const BulletinSection = ({
    keyword,
    recentPosts,
    setRecentPosts,
}: SectionType) => {
    console.debug("BulletinSection rendered!");
    useEffect(() => {
        if (recentPosts.length) {
            setRecentPosts((prev) => {
                return prev.filter(
                    ({ department }) => department.name.indexOf(keyword) > -1
                );
            });
        }
    }, [keyword]);

    return (
        <Stack direction={"column"} rowGap={2}>
            <TitleSection title="📄 게시판" />
            <Divider sx={{ width: "100%" }} />
            <Grid container spacing={2}>
                {recentPosts.map(({ department, recent_posts }, index) => {
                    const { name, id } = department;
                    let elevation = 1;
                    return (
                        <Grid item lg={4} md={6} sm={12} key={index}>
                            <Card
                                elevation={elevation}
                                onMouseEnter={() => {
                                    elevation = 5;
                                }}
                                onMouseLeave={() => {
                                    elevation = 1;
                                }}
                            >
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
                                            (
                                                { title, dId, bId, pId },
                                                index
                                            ) => {
                                                return (
                                                    <Cell
                                                        key={index}
                                                        sx={{
                                                            listStyle:
                                                                "disc outside",
                                                            justifyContent:
                                                                "left",
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
                        </Grid>
                    );
                })}
            </Grid>
        </Stack>
    );
};

export default React.memo(BulletinSection);
