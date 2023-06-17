import { Stack } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { Masonry } from "@mui/lab";
import {
    allDepartmentAtom,
    instance,
    keywordAtom,
    recentPostAtom,
} from "../../store/store";
import { debounce } from "lodash";
import { RecentPostType } from "../../types/types";
import CardSkeleton from "../Skeletons/CardSkeleton";
import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";
import { CommonType } from "../../types/types";
import RecentPostCard from "../RecentPostCard";

const source = axios.CancelToken.source();

const RecentPostSection = () => {
    console.info("RecentPostSection rendered!");
    const keyword = useRecoilValue(keywordAtom);
    const [debouncedKeyword, setDebouncedKeyword] = useState(keyword);
    const debouncedKeyworkdUpdateFunction = useCallback(
        debounce((keyword: string) => {
            setDebouncedKeyword(keyword);
        }, 300),
        []
    );
    const [recentPosts, setRecentPosts] = useRecoilState(recentPostAtom);
    const [allDepartment, setAllDepartment] = useRecoilState(allDepartmentAtom);
    const [copy, setCopy] = useState<RecentPostType[]>([]);
    const [loading, setLoading] = useState(false);
    const searchKeyword = useCallback(
        (keyword: string, state: RecentPostType[]) => {
            const result = !keyword
                ? state
                : state.filter(
                      ({ department }) => department.name.indexOf(keyword) > -1
                  );
            setCopy(result);
        },
        []
    );
    useEffect(() => {
        debouncedKeyworkdUpdateFunction(keyword);
    }, [keyword]);

    useEffect(() => {
        if (recentPosts.length) {
            searchKeyword(debouncedKeyword, recentPosts);
        }
    }, [debouncedKeyword, recentPosts]);

    useEffect(() => {
        async function api<T>(path: string, handleSucess: (data: T) => void) {
            setLoading(true);
            try {
                const response = await instance<T>(path, {
                    cancelToken: source.token,
                });
                if (response.status === 200) {
                    handleSucess(response.data);
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
        }

        if (!recentPosts.length) {
            api<RecentPostType[]>(`/recent-posts?limit=6`, (data) => {
                const tmp = data.filter(({ recent_posts }) => {
                    return recent_posts.length;
                });
                setRecentPosts(tmp);
                setCopy(tmp);
            });
        }

        if (!allDepartment.length) {
            api<CommonType[]>(`/departments_only`, (data) => {
                setAllDepartment(data);
            });
        }
        return () => {
            loading && source.cancel();
        };
    }, []);

    return (
        <Stack direction={"column"} rowGap={2} width={"100%"}>
            {!loading ? (
                <Masonry
                    columns={{ xs: 1, sm: 2, md: 3 }}
                    spacing={{ xs: 1, sm: 2 }}
                >
                    {copy.map((recentPost, index) => (
                        <RecentPostCard {...recentPost} key={index} />
                    ))}
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

export default React.memo(RecentPostSection);
