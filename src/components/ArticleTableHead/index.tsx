import { Box } from "@mui/material";
import { Cell } from "../Cell";

type ArticleTableHeadType = {
    items: string[];
};

export const ArticleTableHead = ({ items }: ArticleTableHeadType) => {
    return (
        <Box
            flexDirection={"row"}
            display={"grid"}
            gridTemplateColumns={"5% 10% 10% auto 10% 7%"}
            gap={1}
            width={"100%"}
            px={1}
        >
            {items.map((item, index) => (
                <Cell key={index}>{item}</Cell>
            ))}
        </Box>
    );
};
