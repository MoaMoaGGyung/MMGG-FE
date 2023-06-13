import { ChangeEvent, useEffect, useMemo, useState } from "react";
import HomeLayout from "../../components/HomeLayout";
import BulletinSection from "../../components/BulletinSection";
import RollingHotArticleSection from "../../components/RollingHotArticleSection";
import SearchSection from "../../components/SearchSection";
import { useRecoilStateLoadable, useRecoilValue } from "recoil";
import {
    hotPostAtom,
    hotPostState,
    recentPostAtom,
    recentPostState,
} from "../../store/store";
import { produce } from "immer";
import PostSkeletion from "../../components/Skeletons/PostSkeletion";

export default function Home() {
    console.info("Home Rendered!");

    const [hotLoadable, setHot] = useRecoilStateLoadable(hotPostState);
    const hot = useRecoilValue(hotPostAtom);
    const [recentLoadable, setRecent] = useRecoilStateLoadable(recentPostState);
    const recent = useRecoilValue(recentPostAtom);

    useEffect(() => {
        if (hot.length === 0 && hotLoadable.state === "hasValue") {
            setHot(
                produce((draft) =>
                    draft.sort(
                        (a, b) =>
                            b.post.dailyFluctuation - a.post.dailyFluctuation
                    )
                )
            );
        }
    }, [hotLoadable.state]);

    useEffect(() => {
        recentLoadable.state === "hasValue" &&
            setRecent(recentLoadable.contents);
    }, [recentLoadable.state]);

    return (
        <HomeLayout>
            <RollingHotArticleSection
                hotPosts={hot}
                hotState={hotLoadable.state}
                setHotPosts={setHot}
            />
            <SearchSection />
            <BulletinSection recentPosts={recent} setRecentPosts={setRecent} />
        </HomeLayout>
    );
}
