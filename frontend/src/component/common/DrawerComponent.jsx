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
import BookmarkIcon from '@mui/icons-material/Bookmark';
import FeedbackIcon from '@mui/icons-material/Feedback';
import SearchIcon from '@mui/icons-material/Search';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import {Link, useNavigate} from "react-router-dom";
import AuthService from "../../service/AuthService";

const drawerWidth = 240;

const linkStyle = {
    textDecoration: 'none',
    color: 'rgb(33,33,33)'
}

function DrawerComponent(props) {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"))

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
                    <Link to={"/search"} style={linkStyle}>
                        <ListItem button>
                            <ListItemIcon><SearchIcon/></ListItemIcon>
                            <ListItemText primary={"Search"}/>
                        </ListItem>
                    </Link>
                    <Link to={"/news"} style={linkStyle}>
                        <ListItem button>
                            <ListItemIcon><NewspaperIcon/></ListItemIcon>
                            <ListItemText primary={"News"}/>
                        </ListItem>
                    </Link>
                    <Link to={"/messages"} style={linkStyle}>
                        <ListItem button>
                            <ListItemIcon><MessageIcon/></ListItemIcon>
                            <ListItemText primary={"Messages"}/>
                        </ListItem>
                    </Link>
                    <Link to={"/bookmarks"} style={linkStyle}>
                        <ListItem button>
                            <ListItemIcon><BookmarkIcon/></ListItemIcon>
                            <ListItemText primary={"Bookmarks"}/>
                        </ListItem>
                    </Link>
                </List>
                <Divider/>
                <List>
                    <Link to={"/feedback"} style={linkStyle}>
                        <ListItem button>
                            <ListItemIcon><FeedbackIcon/></ListItemIcon>
                            <ListItemText primary={"Feedback"}/>
                        </ListItem>
                    </Link>
                    <Link to={"/settings"} style={linkStyle}>
                        <ListItem button>
                            <ListItemIcon><SettingsIcon/></ListItemIcon>
                            <ListItemText primary={"Settings"}/>
                        </ListItem>
                    </Link>
                    <ListItem button onClick={() => logoutHandler()}>
                        <ListItemIcon><LogoutIcon/></ListItemIcon>
                        <ListItemText primary={"Logout"}/>
                    </ListItem>
                </List>
                {
                    user.roles.includes("ROLE_ADMIN") ?
                        <div>
                            <Divider/>
                            <Link to={"/administrator"} style={linkStyle}>
                                <ListItem button>
                                    <ListItemIcon><AdminPanelSettingsIcon/></ListItemIcon>
                                    <ListItemText primary={"Administrator"}/>
                                </ListItem>
                            </Link>
                        </div>
                        :
                        null
                }
            </Box>
        </Drawer>
    );
}

export default DrawerComponent;