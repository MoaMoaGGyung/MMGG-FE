import HomeLayout from "../../components/HomeLayout";
import {
    Stack,
    MenuItem,
    Typography,
    Divider,
    RadioGroup,
    FormControl,
    FormControlLabel,
    Radio,
    Select,
    SelectChangeEvent,
} from "@mui/material";
import { ChangeEvent, useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import {
    alignmentDirectionState,
    alignmentTypeState,
    departmentState,
} from "../../store/store";
import CustomLink from "../../components/CustomLink";

type AlignmentType = "date" | "past" | "index";
type AlignmentDirectionType = 1 | -1;

const Detail = () => {
    const department = useRecoilValue(departmentState);
    const { dId } = useParams();
    const [alignment, setAlignment] = useRecoilState(alignmentTypeState);
    const [dir, setDir] = useRecoilState(alignmentDirectionState);
    const handleChange = (e: SelectChangeEvent<string>) => {
        setAlignment((_) => e.target.value as AlignmentType);
    };

    const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
        setDir(parseInt(e.target.value) as AlignmentDirectionType);
    };

    console.log({ alignment, dir });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <HomeLayout rowGap={2}>
            {/* 학과 이름 영역 */}
            <Stack
                direction={"row"}
                justifyContent={"space-between"}
                width={"100%"}
            >
                <CustomLink to={`/department/${dId}`} sx={{ color: "black" }}>
                    <Typography
                        variant="h4"
                        component={"span"}
                        fontWeight={600}
                        fontFamily={"Noto Sans KR"}
                    >
                        {department}
                    </Typography>
                </CustomLink>
                <Stack direction={"row"} spacing={1}>
                    <FormControl size="small">
                        <Select
                            value={alignment}
                            onChange={handleChange}
                            sx={{ width: "fit-content" }}
                        >
                            <MenuItem value="date">
                                <div
                                    style={{
                                        fontFamily: "Noto Sans KR",
                                        fontSize: 15,
                                        fontWeight: 300,
                                    }}
                                >
                                    날짜순
                                </div>
                            </MenuItem>
                            <MenuItem value="view">
                                <div
                                    style={{
                                        fontFamily: "Noto Sans KR",
                                        fontSize: 15,
                                        fontWeight: 300,
                                    }}
                                >
                                    조회수순
                                </div>
                            </MenuItem>
                            <MenuItem value="index">
                                <div
                                    style={{
                                        fontFamily: "Noto Sans KR",
                                        fontSize: 15,
                                        fontWeight: 300,
                                    }}
                                >
                                    번호순
                                </div>
                            </MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl>
                        <RadioGroup
                            name="alignment-direction"
                            value={dir}
                            onChange={handleRadioChange}
                            row
                        >
                            <FormControlLabel
                                control={<Radio size="small" />}
                                label={
                                    <div
                                        style={{
                                            fontFamily: "Noto Sans KR",
                                            fontSize: 15,
                                            fontWeight: 300,
                                        }}
                                    >
                                        오름차순
                                    </div>
                                }
                                value={1}
                            />
                            <FormControlLabel
                                control={<Radio size="small" />}
                                label={
                                    <div
                                        style={{
                                            fontFamily: "Noto Sans KR",
                                            fontSize: 15,
                                            fontWeight: 300,
                                        }}
                                    >
                                        내림차순
                                    </div>
                                }
                                value={-1}
                            />
                        </RadioGroup>
                    </FormControl>
                </Stack>
            </Stack>
            <Divider sx={{ width: "100%" }} />
            <Outlet />
        </HomeLayout>
    );
};

export default Detail;
