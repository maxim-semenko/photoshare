import React from 'react';
import {Drawer, ListItem} from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemIcon from "@mui/material/ListItemIcon";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ListItemText from "@mui/material/ListItemText";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import MessageIcon from "@mui/icons-material/Message";
import Divider from "@mui/material/Divider";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import {Link} from "react-router-dom";
import AuthService from "../../service/AuthService";
import {useNavigate} from 'react-router-dom';

const drawerWidth = 240;

const linkStyle = {
    textDecoration: 'none',
    color: 'black'
}

function DrawerComponent(props) {
    const navigate = useNavigate();

    const logoutHandler = () => {
        AuthService.logout().then(() => {
            navigate("/login")
        })
    }

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {width: drawerWidth, boxSizing: 'border-box'},
            }}
        >
            <Toolbar/>
            <Box sx={{overflow: 'auto'}}>
                <List>
                    <Link to={"/profile"} style={linkStyle}>
                        <ListItem button>
                            <ListItemIcon><AccountBoxIcon/></ListItemIcon>
                            <ListItemText primary={"Profile"}/>
                        </ListItem>
                    </Link>
                    <Link to={"/news"} style={linkStyle}>
                    <ListItem button>
                        <ListItemIcon><NewspaperIcon/></ListItemIcon>
                        <ListItemText primary={"News"}/>
                    </ListItem>
                    </Link>
                    <ListItem button>
                        <ListItemIcon><MessageIcon/></ListItemIcon>
                        <ListItemText primary={"Messages"}/>
                    </ListItem>
                </List>
                <Divider/>
                <List>
                    <ListItem button>
                        <ListItemIcon><SettingsIcon/></ListItemIcon>
                        <ListItemText primary={"Settings"}/>
                    </ListItem>
                    <ListItem button onClick={() => logoutHandler()}>
                        <ListItemIcon><LogoutIcon/></ListItemIcon>
                        <ListItemText primary={"Logout"}/>
                    </ListItem>
                </List>
            </Box>
        </Drawer>
    );
}

export default DrawerComponent;