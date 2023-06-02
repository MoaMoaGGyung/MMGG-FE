import MockDepartmentBulletin from "../../mock/DepartmentBulletin.json";
import { useParams } from "react-router-dom";
import HomeLayout from "../../components/HomeLayout";
import TitleSection from "../../components/TitleSection";
import {
    Stack,
    Box,
    TextField,
    MenuItem,
    Typography,
    Divider,
} from "@mui/material";
import { ChangeEvent, useState } from "react";
import { Cell } from "../../components/Cell";
import { ArticleTableHead } from "../../components/ArticleTableHead";
import ArticleItem from "../../components/ArticleItem";

type AlignmentType = "recent" | "view" | "past";

const Bulletin = () => {
    const { bulletin } = useParams();
    const { boards } = MockDepartmentBulletin;
    const [alignment, setAlignment] = useState<AlignmentType>("recent");
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAlignment(e.target.value as AlignmentType);
    };

    return (
        <HomeLayout>
            <Stack
                direction={"row"}
                justifyContent={"space-between"}
                width={"100%"}
            >
                <TitleSection title={bulletin ? bulletin : ""} variant="h4" />
                <Box width={130}>
                    <TextField
                        select
                        value={alignment}
                        onChange={handleChange}
                        size="small"
                        fullWidth
                    >
                        <MenuItem value="recent">
                            <Typography variant="subtitle2">최신순</Typography>
                        </MenuItem>
                        <MenuItem value="view">
                            <Typography variant="subtitle2">
                                조회수순
                            </Typography>
                        </MenuItem>
                        <MenuItem value="past">
                            <Typography variant="subtitle2">과거순</Typography>
                        </MenuItem>
                    </TextField>
                </Box>
            </Stack>
            <Divider sx={{ width: "100%" }} />
            <Stack direction={"column"} spacing={2} width={"100%"}>
                {boards.map(({ name, articles }, index) => {
                    return (
                        <Stack
                            direction={"column"}
                            spacing={1}
                            width={"100%"}
                            key={index}
                        >
                            <TitleSection
                                title={name}
                                py={2}
                                link="/"
                                linkLabel="더 보기"
                            />
                            <ArticleTableHead
                                items={["번호", "제목", "날짜", "조회수"]}
                                gtc={"5% auto 10% 7%"}
                            />
                            <Divider sx={{ width: "100%" }} />
                            {articles
                                .sort((a, b) => {
                                    if (alignment === "recent") {
                                        return (
                                            new Date(b.uploadDate).getTime() -
                                            new Date(a.uploadDate).getTime()
                                        );
                                    } else if (alignment === "past") {
                                        return (
                                            new Date(a.uploadDate).getTime() -
                                            new Date(b.uploadDate).getTime()
                                        );
                                    } else {
                                        return b.view - a.view;
                                    }
                                })
                                .map(
                                    ({
                                        index,
                                        title,
                                        uploadDate,
                                        view,
                                        link,
                                    }) => {
                                        return (
                                            <ArticleItem
                                                key={index}
                                                gtc="5% auto 10% 7%"
                                            >
                                                <Cell>{index}</Cell>
                                                <Cell>{title}</Cell>
                                                <Cell>{uploadDate}</Cell>
                                                <Cell>{view}</Cell>
                                            </ArticleItem>
                                        );
                                    }
                                )}
                        </Stack>
                    );
                })}
            </Stack>
        </HomeLayout>
    );
};

export default Bulletin;
