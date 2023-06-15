import { useEffect } from "react";
import HomeLayout from "../../components/HomeLayout";
import BulletinSection from "../../components/BulletinSection";
import RollingHotArticleSection from "../../components/RollingHotArticleSection";
import SearchSection from "../../components/SearchSection";
import { useResetRecoilState } from "recoil";
import { breadcrumbState } from "../../store/store";

export default function Home() {
    console.info("Home Rendered!");
    const resetBreadcrumbState = useResetRecoilState(breadcrumbState);
    useEffect(() => {
        resetBreadcrumbState();
    }, []);

    return (
        <HomeLayout>
            <RollingHotArticleSection />
            <SearchSection />
            <BulletinSection />
        </HomeLayout>
    );
}
