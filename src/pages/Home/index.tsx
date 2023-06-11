import { Divider, Stack } from "@mui/material";
import React, { ChangeEvent, Suspense, useMemo, useState } from "react";
import TitleSection from "../../components/TitleSection";
import HomeLayout from "../../components/HomeLayout";
import BulletinSection from "../../components/BulletinSection";
import RollingHotArticleSection from "../../components/RollingHotArticleSection";
import SearchSection from "../../components/SearchSection";
import { useRecoilState, useRecoilStateLoadable } from "recoil";
import { hotPostState, recentPostState } from "../../store/store";

export default function Home() {
    console.debug("Home Rendered!");

    const [hotLoadable, setHot] = useRecoilStateLoadable(hotPostState);
    const [recentLoadable, setRecent] = useRecoilStateLoadable(recentPostState);

    const [search, setSearch] = useState("");
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const hot = useMemo(() => {
        return hotLoadable.state === "hasValue" ? hotLoadable.contents : [];
    }, [hotLoadable.state]);
    const recent = useMemo(() => {
        return recentLoadable.state === "hasValue"
            ? recentLoadable.contents
            : [];
    }, [recentLoadable.state]);

    return (
        <HomeLayout>
            <RollingHotArticleSection hotPosts={hot} setHotPosts={setHot} />
            <SearchSection keyword={search} handleChange={handleChange} />
            {/* <BulletinSection
                keyword={search}
                recentPosts={recent}
                setRecentPosts={setRecent}
            /> */}
        </HomeLayout>
    );
}
