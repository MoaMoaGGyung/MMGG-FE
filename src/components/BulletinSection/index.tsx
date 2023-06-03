import {
    Card,
    CardContent,
    Divider,
    Grid,
    Stack,
    Typography,
} from "@mui/material";
import MockRecentPosts from "../../mock/HomeRecentPosts.json";
import { Cell } from "../Cell";
import { CustomLink } from "../CustomLink";
import React from "react";

type BulletinSectionType = {
    keyword: string;
};

const BulletinSection = ({ keyword }: BulletinSectionType) => {
    const boards = keyword
        ? MockRecentPosts.filter(
              ({ department }) => department.name.indexOf(keyword) > -1
          )
        : MockRecentPosts;
    return (
        <Grid container spacing={2}>
            {boards.map(({ department, recent_posts }, index) => {
                const { name, id } = department;
                return (
                    <Grid item lg={4} md={6} sm={12} key={index}>
                        <Card>
                            <CardContent>
                                <Stack direction={"column"} spacing={1}>
                                    <CustomLink
                                        to={`/board/${id}`}
                                        color={"black"}
                                        fontWeight={700}
                                        size={"30px"}
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
                                <Stack direction={"column"} spacing={1} py={2}>
                                    {recent_posts.map(
                                        ({ title, link }, index) => {
                                            return (
                                                <Cell jc={"left"} key={index}>
                                                    <CustomLink
                                                        to={link}
                                                        color="#000"
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
    );
};

export default React.memo(BulletinSection);
