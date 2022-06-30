import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Avatar from "@mui/material/Avatar";
import {Link} from "react-router-dom";

export default function HeaderComponent() {
    const user = JSON.parse(localStorage.getItem("user"))

    return (
        <AppBar sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}>
            <Toolbar>
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{display: {xs: 'none', sm: 'block'}}}
                >
                    Photoshare
                </Typography>
                <Box sx={{flexGrow: 1}}/>
                <Box sx={{display: {xs: 'none', md: 'flex'}}}>
                    <Link to={"/profile"}>
                        <Avatar alt="Remy Sharp" src={user.image}/>
                    </Link>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
