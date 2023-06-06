import HomeLayout from "../../components/HomeLayout";
import {
    Stack,
    Box,
    TextField,
    MenuItem,
    Typography,
    Divider,
    RadioGroup,
    FormControl,
    FormControlLabel,
    Radio,
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
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
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
                    <Box width={130}>
                        <TextField
                            select
                            value={alignment}
                            onChange={handleChange}
                            size="small"
                            fullWidth
                        >
                            <MenuItem value="date">
                                <Typography variant="subtitle2">
                                    날짜순
                                </Typography>
                            </MenuItem>
                            <MenuItem value="view">
                                <Typography variant="subtitle2">
                                    조회수순
                                </Typography>
                            </MenuItem>
                            <MenuItem value="index">
                                <Typography variant="subtitle2">
                                    번호순
                                </Typography>
                            </MenuItem>
                        </TextField>
                    </Box>
                    <Box>
                        <FormControl>
                            <RadioGroup
                                name="alignment-direction"
                                value={dir}
                                onChange={handleRadioChange}
                                row
                            >
                                <FormControlLabel
                                    control={<Radio size="small" />}
                                    label="오름차순"
                                    value={1}
                                />
                                <FormControlLabel
                                    control={<Radio size="small" />}
                                    label="내림차순"
                                    value={-1}
                                />
                            </RadioGroup>
                        </FormControl>
                    </Box>
                </Stack>
            </Stack>
            <Divider sx={{ width: "100%" }} />
            <Outlet />
        </HomeLayout>
    );
};

export default Detail;
