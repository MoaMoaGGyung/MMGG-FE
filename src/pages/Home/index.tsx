import { useEffect } from "react";
import HomeLayout from "../../components/HomeLayout";
import RollingHotArticleSection from "../../components/RollingHotArticleSection";
import SearchSection from "../../components/SearchSection";
import { useResetRecoilState } from "recoil";
import { breadcrumbState } from "../../store/store";
import Tabs from "../../components/Tabs";

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
            <Tabs />
        </HomeLayout>
    );
}
