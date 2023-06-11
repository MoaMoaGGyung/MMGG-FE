import { Divider, Stack } from "@mui/material";
import { ChangeEvent, useState } from "react";
import TitleSection from "../../components/TitleSection";
import HomeLayout from "../../components/HomeLayout";
import BulletinSection from "../../components/BulletinSection";
import RollingHotArticleSection from "../../components/RollingHotArticleSection";
import SearchSection from "../../components/SearchSection";

export default function Home() {
    console.debug("Home Rendered!");
    const [search, setSearch] = useState("");
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    return (
        <HomeLayout>
            <RollingHotArticleSection />
            <SearchSection keyword={search} handleChange={handleChange} />
            <BulletinSection keyword={search} />
        </HomeLayout>
    );
}
