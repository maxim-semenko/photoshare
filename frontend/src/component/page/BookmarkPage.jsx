import React, {useEffect, useState} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from "@mui/material/Box";
import {Paper} from "@mui/material";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import {makeStyles} from "@mui/styles";
import Button from "@mui/material/Button";
import {styled} from "@mui/material/styles";
import HeaderComponent from "../common/HeaderComponent";
import DrawerComponent from "../common/DrawerComponent";

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
    button: {
        margin: theme.spacing(1),
    },
}));

const Item = styled(Button)(({theme}) => ({
    padding: theme.spacing(1),
    textAlign: 'center',
    color: 'rgb(33,33,33)'
}));

function BookmarksPage() {
    const classes = useStyles();

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
                                    <h1>BOOKMARKS PAGE</h1>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Container>
                </main>
            </Box>
        </div>
    );
}

export default BookmarksPage;