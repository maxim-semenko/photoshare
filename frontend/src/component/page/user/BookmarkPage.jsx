import React, {useEffect, useState} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import {makeStyles} from "@mui/styles";
import HeaderComponent from "../../common/HeaderComponent";
import DrawerComponent from "../../common/DrawerComponent";
import PostService from "../../../service/PostService";
import VirtualizedListComponent from "../../common/VirtualizedListComponent";


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

function BookmarkPage() {
    const classes = useStyles();

    const user = JSON.parse(localStorage.getItem("user"))
    const [posts, setPosts] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
    const [totalElements, setTotalElements] = useState(2)

    useEffect(() => {
        if (posts.length < totalElements) {
            PostService.getAllBookmarkPostsByUserId(user.id, currentPage, 2)
                .then(response => {
                    setTotalElements(response.data.totalElements)
                    setPosts([...posts, ...response.data.content])
                })
        }
    }, [currentPage])

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
                            <Grid
                                container
                                spacing={3}
                                direction="column"
                                style={{paddingTop: "2%", paddingLeft: "21%"}}
                            >
                                <VirtualizedListComponent
                                    list={posts}
                                    scrollEvent={() => setCurrentPage(prevState => prevState + 1)}
                                    hasNext={posts.length < totalElements}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </main>
        </Box>
    );
}

export default BookmarkPage;