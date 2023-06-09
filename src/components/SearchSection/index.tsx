import { Search } from "@mui/icons-material";
import { List, ListItem, ListItemIcon } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import styled from "@emotion/styled";
import { useRecoilState } from "recoil";
import { keywordAtom } from "../../store/store";

const Searchbar = styled.input`
    width: 100%;
    border: none;
    &:focus {
        outline: none;
    }
`;

const SearchSection = () => {
    console.info("SearchSection rendered!");
    const [keyword, setKeyword] = useRecoilState(keywordAtom);
    return (
        <Box
            justifyContent={"center"}
            alignItems={"center"}
            width={"50%"}
            py={2}
            mx={"auto"}
        >
            <List>
                <ListItem
                    sx={{ border: "1px solid black", borderRadius: "20px" }}
                >
                    <ListItemIcon>
                        <Search />
                    </ListItemIcon>
                    <Searchbar
                        value={keyword}
                        placeholder="학과 검색"
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                </ListItem>
            </List>
        </Box>
    );
};

export default React.memo(SearchSection);
