import React from 'react';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {CircularProgress, DialogActions, DialogContent} from "@mui/material";
import Button from "@mui/material/Button";
import {useDispatch, useSelector} from "react-redux";
import Box from "@mui/material/Box";
import {deletePostById} from "../../../redux/post/PostAction";

function RemovePostDialog(props) {
    const dispatch = useDispatch()
    const {post, loadingPost} = useSelector(state => state.dataPosts)
    const user = JSON.parse(localStorage.getItem("user"))

    const remove = (id) => {
        dispatch(deletePostById(id, user.id))
            .catch(error => {
                console.log(error)
            })
        props.close()
    }

    return (
        <Dialog open={props.open} onClose={props.close} fullWidth maxWidth="sm">
            <DialogTitle>Delete post</DialogTitle>
            <DialogContent>
                {
                    loadingPost ?
                        <Box display="flex" justifyContent="center">
                            <CircularProgress/>
                        </Box>
                        :
                        <div>
                            Are you really want to delete this post?
                        </div>
                }
            </DialogContent>
            <DialogActions>
                <Button onClick={props.close}>Close</Button>
                <Button onClick={() => remove(post.id)} disabled={loadingPost}>Delete</Button>
            </DialogActions>
        </Dialog>
    );
}

export default RemovePostDialog;