import React from 'react';
import clsx from 'clsx';
import CssBaseline from '@mui/material/CssBaseline';
import Box from "@mui/material/Box";
import {Paper} from "@mui/material";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import {makeStyles} from "@mui/styles";
import DrawerComponent from "../../common/DrawerComponent";
import HeaderComponent from "../../common/HeaderComponent";
import Post from "../../common/Post";

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
    fixedHeight: {},
}));

function ProfilePage() {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const user = JSON.parse(localStorage.getItem("user"))

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
                            <Paper className={fixedHeightPaper}>
                                PROFILE
                                <h1>Email: {user.email}</h1>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={12} lg={4}>
                                        <Post/>
                                    </Grid>
                                    <Grid item xs={12} md={12} lg={4}>
                                        <Post/>
                                    </Grid>
                                    <Grid item xs={12} md={12} lg={4}>
                                        <Post/>
                                    </Grid>
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