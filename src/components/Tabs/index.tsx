import {
    Box,
    Tab,
    ThemeProvider,
    Typography,
    createTheme,
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import BulletinSection from "../BulletinSection";
import DepartmentOnlySection from "../DepartmentOnlySection";
import { useRecoilState, useRecoilValue } from "recoil";
import { keywordAtom, tabAtom } from "../../store/store";

function Tabs() {
    console.info("Tabs rendered!");
    const [value, setValue] = useRecoilState(tabAtom);

    const handleChange = (
        _event: React.SyntheticEvent,
        newValue: "1" | "2"
    ) => {
        setValue(newValue);
    };

    const theme = createTheme({
        palette: {
            primary: {
                main: "#fec061",
            },
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <TabContext value={value}>
                <Box
                    sx={{
                        borderBottom: 1,
                        borderColor: "divider",
                        width: "100%",
                    }}
                >
                    <TabList onChange={handleChange} textColor="primary">
                        <Tab
                            label={
                                <Typography
                                    variant="h5"
                                    fontWeight={600}
                                    fontFamily={"Noto Sans KR"}
                                >
                                    최근 게시물
                                </Typography>
                            }
                            value="1"
                        />
                        <Tab
                            label={
                                <Typography
                                    variant="h5"
                                    fontWeight={600}
                                    fontFamily={"Noto Sans KR"}
                                >
                                    모든 학과
                                </Typography>
                            }
                            value="2"
                        />
                    </TabList>
                </Box>
                <TabPanel value="1" sx={{ width: "100%" }}>
                    <BulletinSection />
                </TabPanel>
                <TabPanel value="2" sx={{ width: "100%" }}>
                    <DepartmentOnlySection />
                </TabPanel>
            </TabContext>
        </ThemeProvider>
    );
}

export default Tabs;
