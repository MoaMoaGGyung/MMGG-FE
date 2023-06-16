import {
    Card,
    CardContent,
    Divider,
    Tooltip,
    TooltipProps,
    Typography,
    styled,
    tooltipClasses,
} from "@mui/material";
import { Stack } from "@mui/system";
import CustomLink from "../CustomLink";
import Cell from "../Cell";
import { RecentPostType } from "../../types/types";
import { useState } from "react";

const CustomWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip
        {...props}
        placement="left-start"
        enterDelay={500}
        classes={{ popper: className }}
    />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        maxWidth: 500,
        backgroundColor: theme.palette.common.black,
    },
}));

function RecentPostCard(props: RecentPostType) {
    const {
        department: { name, id },
        recent_posts,
    } = props;
    const [elevation, setElevation] = useState(1);
    return (
        <Card
            onMouseEnter={() => setElevation(6)}
            onMouseLeave={() => setElevation(1)}
            elevation={elevation}
        >
            <CardContent>
                <Stack direction={"column"} spacing={1}>
                    <CustomLink
                        to={`/department/${id}`}
                        sx={{
                            color: "black",
                            fontWeight: 700,
                            fontSize: "30px",
                        }}
                    >
                        {name}
                    </CustomLink>
                    <Divider />
                    <Typography
                        variant="body1"
                        component={"span"}
                        color={"text.secondary"}
                        fontWeight={1000}
                    >
                        최근 게시물
                    </Typography>
                </Stack>
                <Stack
                    direction={"column"}
                    spacing={1}
                    // component={"ul"}
                    sx={{
                        margin: 0,
                        padding: "16px 0",
                    }}
                >
                    {recent_posts.map(({ title, dId, bId, pId }, index) => {
                        return (
                            <CustomWidthTooltip title={title} key={index}>
                                <Cell
                                    justifyContent={"left"}
                                    sx={{
                                        justifyContent: "left",
                                    }}
                                    // component={"li"}
                                >
                                    <CustomLink
                                        to={`/department/${dId}/board/${bId}/post/${pId}`}
                                        sx={{
                                            color: "black",
                                        }}
                                    >
                                        {title}
                                    </CustomLink>
                                </Cell>
                            </CustomWidthTooltip>
                        );
                    })}
                </Stack>
            </CardContent>
        </Card>
    );
}

export default RecentPostCard;
