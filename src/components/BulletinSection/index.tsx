import { Card, CardContent, Divider, Grid, Typography } from "@mui/material";
import MockRecentPosts from "../../mock/HomeRecentPosts.json";
import { Cell } from "../Cell";
import { CustomLink } from "../CustomLink";
import React from "react";

const BulletinSection = () => {
    return (
        <Grid container spacing={2}>
            {MockRecentPosts.map(({ board_name, recent_posts }, index) => {
                return (
                    <Grid item lg={4} md={6} sm={12} key={index}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5" component={"span"}>
                                    {board_name}
                                </Typography>
                                <Divider />
                                <Typography
                                    variant="body2"
                                    component={"span"}
                                    color={"text.secondary"}
                                >
                                    최근 게시물
                                </Typography>
                                {recent_posts.map(({ title, link }, index) => {
                                    return (
                                        <Cell jc={"left"} key={index}>
                                            <CustomLink to={link} color="#000">
                                                {title}
                                            </CustomLink>
                                        </Cell>
                                    );
                                })}
                            </CardContent>
                        </Card>
                    </Grid>
                );
            })}
        </Grid>
    );
};

export default React.memo(BulletinSection);
