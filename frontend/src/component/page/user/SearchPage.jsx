import React, {useState} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from "@mui/material/Box";
import {CircularProgress, ListItem, ListItemAvatar, ListItemButton, ListItemText, Paper} from "@mui/material";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import {makeStyles} from "@mui/styles";
import {alpha, styled} from "@mui/material/styles";
import HeaderComponent from "../../common/HeaderComponent";
import DrawerComponent from "../../common/DrawerComponent";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import UserService from "../../../service/UserService";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Avatar from "@mui/material/Avatar";


const Search = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.black, 0.10),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.black, 0.15),
    },
    marginRight: theme.spacing(2),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
}));

const useStyles = makeStyles((theme) => ({
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(3),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
}));

function SearchPage() {
    const classes = useStyles();
    const [username, setUsername] = useState('')
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const [isSearched, setIsSearched] = useState(false)

    const changeUsernameHandler = (event) => {
        setUsername(event.target.value)
    }

    const searchHandle = () => {
        setLoading(true)
        setIsSearched(true)
        UserService.getAllByUsername(username)
            .then(response => {
                setUsers(response.data.content)
            })
            .finally(() => setLoading(false))
    }

    const ResultList = () => {
        if (loading) {
            return (
                <Box display="flex" justifyContent="center">
                    <CircularProgress/>
                </Box>
            )
        } else if (users.length === 0 && isSearched) {
            return (
                <Box display="flex" justifyContent="center">
                    Not found...
                </Box>
            )
        } else {
            return (
                <div>
                    {
                        users.map((user, index) => {
                            return (
                                <ListItem key={index} disablePadding>
                                    <ListItemButton>
                                        <ListItemAvatar>
                                            <Avatar src={user.image}/>
                                        </ListItemAvatar>
                                        <ListItemText primary={user.username}/>
                                    </ListItemButton>
                                </ListItem>
                            )
                        })
                    }
                </div>
            )
        }
    }

    return (
        <div>
            <Box sx={{display: 'flex'}}>
                <CssBaseline/>
                <HeaderComponent/>
                <DrawerComponent/>
                <main className={classes.content}>
                    <div className={classes.appBarSpacer}/>
                    <Container maxWidth="lg" className={classes.container}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={12} lg={12}>
                                <Paper className={classes.paper}>
                                    <Grid container style={{padding: '20px'}} alignItems="stretch">
                                        <Grid item xs={11}>
                                            <Search>
                                                <SearchIconWrapper>
                                                    <SearchIcon/>
                                                </SearchIconWrapper>
                                                <StyledInputBase
                                                    placeholder="Search by username…"
                                                    value={username}
                                                    onChange={changeUsernameHandler}
                                                    inputProps={{'aria-label': 'search'}}
                                                />
                                            </Search>
                                        </Grid>
                                        <Grid item xs={1}>
                                            <Button
                                                style={{padding: "11px 15px 11px 15px"}}
                                                variant="contained"
                                                color="primary"
                                                onClick={searchHandle}
                                            >Search</Button>
                                        </Grid>
                                    </Grid>
                                    <div style={{padding: "0 4% 0% 4%"}}>
                                        <List sx={{width: '100%', maxWidth: '92%', bgcolor: 'background.paper'}}>
                                            {ResultList()}
                                        </List>
                                    </div>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Container>
                </main>
            </Box>
        </div>
    );
}

export default SearchPage;