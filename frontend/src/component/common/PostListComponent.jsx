import React from 'react';
import Grid from "@mui/material/Grid";
import PostComponent from "./PostComponent";

function PostListComponent(props) {

    const Content = () => {
        if (props.postsList.length === 0) {
            return (
                <Grid container spacing={3} direction="column" alignItems="center" style={{paddingTop: "3%"}}>
                    Nothing :(
                </Grid>
            )
        } else {
            return (
                <Grid container spacing={3}>
                    {
                        props.postsList.map(post => (
                            <Grid item xs={props.xs} md={props.md} lg={props.lg}>
                                <PostComponent object={post} height={props.height}/>
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