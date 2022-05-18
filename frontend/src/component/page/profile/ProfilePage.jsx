import React, {useEffect, useState} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from "@mui/material/Box";
import {Paper} from "@mui/material";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import {makeStyles} from "@mui/styles";
import DrawerComponent from "../../common/DrawerComponent";
import HeaderComponent from "../../common/HeaderComponent";
import PostService from "../../../service/PostService";
import PostsList from "./PostsList";
import AboutProfile from "./AboutProfile";
import ImageProfile from "./ImageProfile";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import CreatePostDialog from "../../common/dialog/CreatePostDialog";

const useStyles = makeStyles((theme) => ({
    appBarSpacer: theme.mixins.toolbar,
    button: {
        margin: theme.spacing(1),
    },
}));

const containerStyle = {
    paddingTop: '32px',
    paddingBottom: '32px',
}

const contentStyle = {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
}

const paperStyle = {
    padding: '24px 24px 24px 24px',
}

function ProfilePage() {
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem("user"))
    const [posts, setPosts] = useState([])
    const [totalPosts, setTotalPosts] = useState(0)
    const [openCreatePostDialog, setOpenCreatePostDialog] = useState(false);


    useEffect(() => {
        PostService.getAllPostsByUserId(user.id).then(resp => {
            setPosts(resp.data.content)
            setTotalPosts(resp.data.totalElements)
        })
    }, [])

    const handleClickOpen = () => {
        setOpenCreatePostDialog(true);
    };

    const handleClose = () => {
        setOpenCreatePostDialog(false);
    };

    return (
        <div>
            <CreatePostDialog open={openCreatePostDialog} close={handleClose}/>
            <Box sx={{display: 'flex'}}>
                <CssBaseline/>
                <HeaderComponent/>
                <DrawerComponent/>
                <main style={contentStyle}>
                    <div className={classes.appBarSpacer}/>
                    <Container maxWidth="lg" style={containerStyle}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={12} lg={12}>
                                <Paper style={paperStyle}>
                                    <Grid container spacing={3}>
                                        <ImageProfile/>
                                        <AboutProfile totalPosts={totalPosts}/>
                                    </Grid>
                                    <br/>
                                    <b>All posts:</b>
                                    <Button fullWidth
                                            variant="contained"
                                            startIcon={<AddIcon/>}
                                            style={{marginBottom: "10px"}}
                                            onClick={handleClickOpen}
                                            color="success">
                                        New post
                                    </Button>
                                    <PostsList posts={posts}/>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Container>
                </main>
            </Box>
        </div>
    );
}

export default ProfilePage;