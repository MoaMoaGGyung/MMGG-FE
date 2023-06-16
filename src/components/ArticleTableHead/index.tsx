import { Box } from "@mui/material";
import Cell from "../Cell";

type ArticleTableHeadType = {
    items: string[];
    gtc: string;
};

const ArticleTableHead = ({ items, gtc }: ArticleTableHeadType) => {
    return (
        <Box
            flexDirection={"row"}
            display={"grid"}
            gridTemplateColumns={gtc}
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

export default ArticleTableHead;
