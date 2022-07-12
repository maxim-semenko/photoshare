import React, {useEffect, useState} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from "@mui/material/Box";
import {CircularProgress, Paper} from "@mui/material";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import {makeStyles} from "@mui/styles";
import DrawerComponent from "../../../common/DrawerComponent";
import HeaderComponent from "../../../common/HeaderComponent";
import AboutProfile from "./AboutProfile";
import ImageProfile from "./ImageProfile";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import CreatePostDialog from "../../../common/dialog/CreatePostDialog";
import PostListComponent from "../../../common/PostListComponent";
import {getAllPostsByUserId} from "../../../../redux/post/PostAction";
import {useDispatch, useSelector} from "react-redux";

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
    const dispatch = useDispatch()
    const {posts, loadingPosts, totalElements} = useSelector(state => state.dataPosts)
    const user = JSON.parse(localStorage.getItem("user"))
    const [openCreatePostDialog, setOpenCreatePostDialog] = useState(false);

    useEffect(() => {
        dispatch(getAllPostsByUserId(user.id))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleClickOpen = () => {
        setOpenCreatePostDialog(true);
    };

    const handleClose = () => {
        setOpenCreatePostDialog(false);
    };

    const DisplayDialogs = () => {
        if (openCreatePostDialog) {
            return <CreatePostDialog open={openCreatePostDialog} close={handleClose}/>
        }
    }

    return (
        <div>
            {DisplayDialogs()}
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
                                        <ImageProfile user={user}/>
                                        <AboutProfile totalPosts={totalElements} user={user}/>
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
        </div>
    );
}

export default ProfilePage;