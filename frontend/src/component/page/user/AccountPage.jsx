import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import HeaderComponent from "../../common/HeaderComponent";
import DrawerComponent from "../../common/DrawerComponent";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import {makeStyles} from "@mui/styles";
import {CircularProgress, Paper} from "@mui/material";
import ImageProfile from "./profile/ImageProfile";
import AboutProfile from "./profile/AboutProfile";
import PostListComponent from "../../common/PostListComponent";
import {useDispatch} from "react-redux";
import UserService from "../../../service/UserService";
import {useParams} from "react-router-dom";
import PostService from "../../../service/PostService";

const useStyles = makeStyles((theme) => ({
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
}));

const containerStyle = {
    paddingTop: '32px',
    paddingBottom: '32px',
}

const contentStyle = {
    flexGrow: 1,
    overflow: 'auto',
}

function AccountPage(props) {
    const classes = useStyles();
    let {username} = useParams();

    const dispatch = useDispatch()
    const [posts, setPosts] = useState([])
    const [loadingPosts, setLoadingPosts] = useState(false)
    const [currentPage, setCurrentPage] = useState(0)
    const [totalElements, setTotalElements] = useState(2)

    const [user, setUser] = useState(null)

    useEffect(() => {
        // dispatch(getAllPostsByUserId(user.id))
        UserService.getUserByUsername(username)
            .then(response => {
                setUser(response.data)
                PostService.getAllPostsByUserId(response.data.id)
                    .then(response => {
                        setPosts(response.data.content)
                    })
            })
        // .finally(setLoadingPosts)

    }, [])

    const showImageProfile = () => {
        if (user !== null) {
            return <ImageProfile user={user}/>
        }
    }

    const showAboutProfile = () => {
        if (user !== null) {
            return <AboutProfile totalPosts={totalElements} user={user}/>
        }
    }



    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <HeaderComponent/>
            <DrawerComponent/>
            <main style={contentStyle}>
                <div className={classes.appBarSpacer}/>
                <Container maxWidth="lg" style={containerStyle}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={12} lg={12}>
                            <Paper style={{padding: '24px 24px 24px 24px'}}>
                                <Grid container spacing={3}>
                                    {showImageProfile()}
                                    {showAboutProfile()}
                                </Grid>
                                <br/>
                                <b>All posts:</b>
                                <div>
                                    {
                                        loadingPosts ?
                                            <Grid container spacing={3} direction="column" alignItems="center"
                                                  style={{paddingTop: "3%"}}>
                                                <CircularProgress/>
                                            </Grid>
                                            :
                                            <PostListComponent xs={12} md={12} lg={4} postsList={posts}
                                                               height={360}/>
                                    }
                                </div>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </main>
        </Box>
    );
}

export default AccountPage;