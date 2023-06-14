import { Card, CardContent, Divider, Stack, Typography } from "@mui/material";
import Cell from "../Cell";
import CustomLink from "../CustomLink";
import React, { useCallback, useEffect, useRef, useState } from "react";
import TitleSection from "../TitleSection";
import { Masonry } from "@mui/lab";
import { instance } from "../../store/store";
import { debounce } from "lodash";
import { RecentPostType } from "../../types/types";
import CardSkeleton from "../Skeletons/CardSkeleton";
import axios from "axios";

interface SectionType {
    keyword: string;
}
const source = axios.CancelToken.source();

const BulletinSection = ({ keyword }: SectionType) => {
    console.info("BulletinSection rendered!");
    const [recentPosts, setRecentPosts] = useState<RecentPostType[]>([]);
    const [copy, setCopy] = useState<RecentPostType[]>([]);
    const [loading, setLoading] = useState(false);
    const searchKeyword = useCallback(
        debounce((keyword: string, state: RecentPostType[]) => {
            const result = state.filter(({ department }) =>
                !keyword ? true : department.name.indexOf(keyword) > -1
            );
            setCopy(result);
        }, 300),
        []
    );
    useEffect(() => {
        if (recentPosts.length) {
            console.debug(keyword);
            searchKeyword(keyword, recentPosts);
        }
    }, [keyword, recentPosts]);

    useEffect(() => {
        const api = async () => {
            setLoading(true);
            try {
                const response = await instance<RecentPostType[]>(
                    `/recent-posts?limit=6`,
                    {
                        cancelToken: source.token,
                    }
                );
                if (response.status === 200) {
                    const tmp = response.data.filter(({ recent_posts }) => {
                        return recent_posts.length;
                    });
                    setRecentPosts(tmp);
                    setCopy(tmp);
                } else {
                    console.error(response);
                }
            } catch (error) {
                if (axios.isCancel(error)) {
                    console.error("Recent-post Request Canceled!");
                }
            } finally {
                setLoading(false);
            }
        };

        if (!recentPosts.length) api();
        return () => {
            loading && source.cancel();
        };
    }, []);

    return (
        <Stack direction={"column"} rowGap={2} width={"100%"}>
            <TitleSection title="📄 게시판" />
            <Divider sx={{ width: "100%" }} />
            {!loading ? (
                <Masonry
                    columns={{ xs: 1, sm: 2, md: 3 }}
                    spacing={{ xs: 1, sm: 2 }}
                >
                    {copy.map(({ department, recent_posts }, index) => {
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
                                            (
                                                { title, dId, bId, pId },
                                                index
                                            ) => {
                                                return (
                                                    <Cell
                                                        key={index}
                                                        justifyContent={"left"}
                                                        sx={{
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
                        );
                    })}
                </Masonry>
            ) : (
                <Masonry
                    columns={{ xs: 1, sm: 2, md: 3 }}
                    spacing={{ xs: 1, sm: 2 }}
                >
                    {new Array(12).fill(0).map((_, i) => (
                        <CardSkeleton key={i} />
                    ))}
                </Masonry>
            )}
        </Stack>
    );
};

export default React.memo(BulletinSection);
