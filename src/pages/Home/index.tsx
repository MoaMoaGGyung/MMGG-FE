import { ChangeEvent, useState } from "react";
import HomeLayout from "../../components/HomeLayout";
import BulletinSection from "../../components/BulletinSection";
import RollingHotArticleSection from "../../components/RollingHotArticleSection";
import SearchSection from "../../components/SearchSection";

export default function Home() {
    console.info("Home Rendered!");
    const [keyword, setKeyword] = useState("");
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value);
    };

    return (
        <HomeLayout>
            <RollingHotArticleSection />
            <SearchSection keyword={keyword} handleChange={handleChange} />
            <BulletinSection keyword={keyword} />
        </HomeLayout>
    );
}
