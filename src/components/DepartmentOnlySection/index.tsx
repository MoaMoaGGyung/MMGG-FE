import { Masonry } from "@mui/lab";
import { useRecoilValue } from "recoil";
import { allDepartmentAtom, keywordAtom } from "../../store/store";
import { useEffect, useState } from "react";
import { Box, Divider, Typography } from "@mui/material";
import CustomLink from "../CustomLink";
import Cell from "../Cell";

function getInitials(letter: string) {
    const initialConsonantsEnglish = [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
    ];

    const initialConsonantsKorean = [
        "ㄱ",
        "ㄲ",
        "ㄴ",
        "ㄷ",
        "ㄸ",
        "ㄹ",
        "ㅁ",
        "ㅂ",
        "ㅃ",
        "ㅅ",
        "ㅆ",
        "ㅇ",
        "ㅈ",
        "ㅉ",
        "ㅊ",
        "ㅋ",
        "ㅌ",
        "ㅍ",
        "ㅎ",
    ];

    const trimmedWord = letter.trim();

    if (!trimmedWord) {
        return "";
    }

    const firstCharacter = trimmedWord.charAt(0);
    const charCode = firstCharacter.charCodeAt(0);

    if (/[0-9]/.test(firstCharacter)) {
        // 숫자인 경우 그대로 반환합니다.
        return firstCharacter;
    } else if (
        (charCode >= 0xac00 && charCode <= 0xd7a3) || // 한글 완성형 범위
        (charCode >= 0x3131 && charCode <= 0x3163) // 한글 자모음(초성), 중성, 종성 범위
    ) {
        // 한글인 경우 한글 초성 추출
        const initialConsonantIndex = Math.floor((charCode - 0xac00) / 28 / 21);
        return initialConsonantsKorean[initialConsonantIndex];
    } else if (
        (charCode >= 65 && charCode <= 90) || // 대문자 영어 알파벳 범위
        (charCode >= 97 && charCode <= 122) // 소문자 영어 알파벳 범위
    ) {
        // 영어인 경우 영어 알파벳 순서로 계산
        const initialConsonantIndex = Math.floor(charCode - 65);

        return initialConsonantsEnglish[initialConsonantIndex];
    } else {
        // 숫자, 한글, 영어 이외의 문자일 경우 빈 문자열을 반환합니다.
        return "";
    }
}

type AllConsonantstype = { [key: string]: { name: string; id: number }[] };

function DepartmentOnlySection() {
    console.info("DepartmentOnlySection rendered!");
    const allDepartment = useRecoilValue(allDepartmentAtom);
    const [allConsonants, setAllConsonants] = useState<AllConsonantstype>({});
    const keyword = useRecoilValue(keywordAtom);

    useEffect(() => {
        const groupedDepartments: AllConsonantstype = {};
        allDepartment
            .filter(({ name }) => name.indexOf(keyword) > -1)
            .forEach((department) => {
                const tmp = getInitials(department.name);
                if (!groupedDepartments[tmp]) {
                    groupedDepartments[tmp] = [];
                }
                groupedDepartments[tmp].push(department);
            });
        setAllConsonants(groupedDepartments);
    }, [keyword]);

    return (
        <Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={{ xs: 1, sm: 2 }}>
            {Object.keys(allConsonants).map((consonant, index) => {
                return (
                    <Box key={index} width={"100%"}>
                        <Typography variant="h5" fontWeight={1000}>
                            {consonant}
                        </Typography>
                        <Divider sx={{ width: "100%", color: "divider" }} />
                        {allConsonants[consonant].map(({ name, id }, index) => {
                            return (
                                <Cell justifyContent={"left"}>
                                    <CustomLink
                                        to={`/department/${id}`}
                                        sx={{
                                            color: "#000000",
                                            "&:hover": {
                                                textDecoration: "underline",
                                                color: "#f8cb6a",
                                                cursor: "pointer",
                                            },
                                        }}
                                        key={index}
                                    >
                                        {name}
                                    </CustomLink>
                                </Cell>
                            );
                        })}
                    </Box>
                );
            })}
        </Masonry>
    );
}

export default DepartmentOnlySection;
