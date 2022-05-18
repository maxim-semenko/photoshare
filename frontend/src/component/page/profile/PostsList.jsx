import React from 'react';
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Grid from "@mui/material/Grid";
import PostComponent from "../../common/PostComponent";

function PostsList(props) {
    return (
        <div>
            <Grid container spacing={3}>
                {
                    props.posts.map(post => (
                        <Grid item xs={12} md={12} lg={4}>
                            <PostComponent object={post} height={360}/>
                        </Grid>
                    ))
                }
            </Grid>
        </div>
    )
}

export default PostsList;

