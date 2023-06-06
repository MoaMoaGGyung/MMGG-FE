import {
    Card,
    CardContent,
    Divider,
    Grid,
    Stack,
    Typography,
} from "@mui/material";
import MockRecentPosts from "../../mock/HomeRecentPosts.json";
import Cell from "../Cell";
import CustomLink from "../CustomLink";
import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { departmentState } from "../../store/store";

type BulletinSectionType = {
    keyword: string;
};

const BulletinSection = ({ keyword }: BulletinSectionType) => {
    const boards = keyword
        ? MockRecentPosts.filter(
              ({ department }) => department.name.indexOf(keyword) > -1
          )
        : MockRecentPosts;
    const setDepartment = useSetRecoilState(departmentState);

    return (
        <Grid container spacing={2}>
            {boards.map(({ department, recent_posts }, index) => {
                const { name, id } = department;
                const [elevation, setElevation] = useState(1);

                return (
                    <Grid item lg={4} md={6} sm={12} key={index}>
                        <Card
                            elevation={elevation}
                            onMouseEnter={() => setElevation(5)}
                            onMouseLeave={() => setElevation(1)}
                        >
                            <CardContent>
                                <Stack direction={"column"} spacing={1}>
                                    <CustomLink
                                        to={`/department/${id}`}
                                        onLinkClicked={() =>
                                            setDepartment(name)
                                        }
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
                                    sx={{ margin: 0, padding: "16px 0" }}
                                >
                                    {recent_posts.map(
                                        ({ title, link }, index) => {
                                            return (
                                                <Cell
                                                    key={index}
                                                    sx={{
                                                        listStyle:
                                                            "disc outside",
                                                        justifyContent: "left",
                                                    }}
                                                    // component={"li"}
                                                >
                                                    <CustomLink
                                                        to={link}
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
    );
};

export default React.memo(BulletinSection);
