import React, {useEffect, useState} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from "@mui/material/Box";
import {Paper} from "@mui/material";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import {makeStyles} from "@mui/styles";
import HeaderComponent from "../../common/HeaderComponent";
import DrawerComponent from "../../common/DrawerComponent";
import PostComponent from "../../common/PostComponent";
import PostService from "../../../service/PostService";


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
}));

function NewsPage() {
    const classes = useStyles();

    const user = JSON.parse(localStorage.getItem("user"))
    const [posts, setPosts] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
    const [loading, setLoading] = useState(true)
    const [totalElements, setTotalElements] = useState(2)

    useEffect(() => {
        if (loading && posts.length < totalElements) {
            PostService.getAllPostsByUserIdSubscribes(user.id, currentPage, 2)
                .then(response => {
                    setTotalElements(response.data.totalElements)
                    setPosts([...posts, ...response.data.content])
                    setCurrentPage(prevState => prevState + 1)
                })
                .finally(() => setLoading(false))
        }
    }, [loading])

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler, true)
        return function () {
            document.removeEventListener('scroll', scrollHandler, true)
        }
    }, [])

    const scrollHandler = (e) => {
        if (e.target.scrollHeight - (e.target.scrollTop + window.innerHeight) < 100) {
            setLoading(true)
        }
    }

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
                            <Paper className={classes.paper} style={{paddingLeft: "15%", paddingRight: "15%"}}>
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

export default NewsPage;