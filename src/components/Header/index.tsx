import { Menu, Person } from "@mui/icons-material";
import {
    AppBar,
    Box,
    Drawer,
    IconButton,
    Toolbar,
    Typography,
} from "@mui/material";
import { useState } from "react";

function Header() {
    const [open, setOpen] = useState(false);
    return (
        <>
            <AppBar position="static" sx={{ bgcolor: "#FFE0B1" }}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        aria-label="logo"
                        onClick={() => setOpen(true)}
                        sx={{
                            "&:svg": { bgcolor: "#8A6157" },
                            borderRadius: "10px",
                        }}
                    >
                        <Menu />
                    </IconButton>
                    <Box
                        sx={{
                            width: "100%",
                            textAlign: "center",
                            color: "#464646",
                            fontFamily: "Bruno Ace SC, cursive",
                            fontSize: "clamp(1rem, 3vw, 2rem)",
                        }}
                    >
                        CNU NOTICE HUB
                    </Box>
                    <IconButton
                        size="large"
                        edge="start"
                        aria-label="avatar"
                        sx={{
                            "&:svg": { bgcolor: "#8A6157" },
                            borderRadius: "10px",
                        }}
                    >
                        <Person />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
                <Box p={2} width={250} textAlign={"center"} role="presentation">
                    <Typography variant="h6" component={"div"}>
                        Side Panel
                    </Typography>
                </Box>
            </Drawer>
        </>
    );
}

export default Header;
