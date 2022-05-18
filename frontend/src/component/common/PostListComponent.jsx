import React, {useEffect, useState} from 'react';
import Grid from "@mui/material/Grid";
import PostComponent from "./PostComponent";
import PostService from "../../service/PostService";

function PostListComponent(props) {
    const user = JSON.parse(localStorage.getItem("user"))
    const [bookmarks, setBookmarks] = useState([])
    const [loadingBookmarks, setLoadingBookmarks] = useState(true)

    useEffect(() => {
        console.log("EFFECT")
        PostService.getAllBookmarkPostsByUserId(user.id)
            .then(response => {
                setBookmarks(response.data.content)
                console.log(response.data.content)
            })
            .finally(() => setLoadingBookmarks(false))
    }, [])

    const Content = () => {
        if (loadingBookmarks) {
            return <div>loading...</div>
        } else {
            return (
                <div>
                    {
                        props.postsList.map(post => (
                            <Grid item xs={12} md={12} lg={12}>
                                <PostComponent object={post}
                                               height={400}
                                               bookmarksList={bookmarks}/>
                            </Grid>
                        ))
                    }
                </div>
            )
        }
    }

    return (
        <div>
            {Content()}
        </div>
    );
}

export default PostListComponent;