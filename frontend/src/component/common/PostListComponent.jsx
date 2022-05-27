import React, {useEffect, useState} from 'react';
import Grid from "@mui/material/Grid";
import PostComponent from "./PostComponent";
import PostService from "../../service/PostService";
import {CircularProgress} from "@mui/material";

function PostListComponent(props) {
    const user = JSON.parse(localStorage.getItem("user"))
    const [bookmarks, setBookmarks] = useState([])
    const [loadingBookmarks, setLoadingBookmarks] = useState(true)

    useEffect(() => {
        PostService.getAllBookmarkPostsByUserId(user.id)
            .then(response => {
                setBookmarks(response.data.content)
                console.log(response.data.content)
            })
            .finally(() => setLoadingBookmarks(false))
    }, [])

    const Content = () => {
        if (loadingBookmarks || props.postsList.length === 0) {
            return (
                <Grid container spacing={3} direction="column" alignItems="center" style={{paddingTop: "3%"}}>
                    <CircularProgress/>
                </Grid>
            )
        } else {
            return (
                <Grid container spacing={3}>
                    {
                        props.postsList.map(post => (
                            <Grid item xs={props.xs} md={props.md} lg={props.lg}>
                                <PostComponent object={post} bookmarksList={bookmarks} height={props.height}/>
                            </Grid>
                        ))
                    }
                </Grid>
            )
        }
    }

    return (
        <div>{Content()}</div>
    );
}

export default PostListComponent;