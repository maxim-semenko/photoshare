import React, {useEffect, useState} from 'react';
import clsx from 'clsx';
import CssBaseline from '@mui/material/CssBaseline';
import Box from "@mui/material/Box";
import {Paper} from "@mui/material";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import {makeStyles} from "@mui/styles";
import HeaderComponent from "../common/HeaderComponent";
import DrawerComponent from "../common/DrawerComponent";
import PostComponent from "../common/PostComponent";
import PostService from "../../service/PostService";


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
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
}));

function ProfilePage() {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper);

    const user = JSON.parse(localStorage.getItem("user"))
    const [posts, setPosts] = useState([])

    useEffect(() => {
        PostService.getAllPostsByUserIdSubscribes(user.id).then(resp => {
            setPosts(resp.data.content)
            // setTotalPosts(resp.data.totalElements)
        })
    }, [])

    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <HeaderComponent/>
            <DrawerComponent/>
            <main className={classes.content}>
                <div className={classes.appBarSpacer}/>
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={12} lg={12}>
                            <Paper className={fixedHeightPaper} style={{paddingLeft: "15%", paddingRight: "15%"}}>
                                <Grid container spacing={3}>
                                    {
                                        posts.map(post => (
                                            <Grid item xs={12} md={12} lg={12}>
                                                <PostComponent object={post} height={400}/>
                                            </Grid>
                                        ))
                                    }
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </main>
        </Box>
    );
}

export default ProfilePage;