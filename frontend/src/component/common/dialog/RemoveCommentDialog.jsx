import React from 'react';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {CircularProgress, DialogActions, DialogContent} from "@mui/material";
import Button from "@mui/material/Button";
import {useDispatch, useSelector} from "react-redux";
import Box from "@mui/material/Box";
import {deleteCommentByCommentIdAndUserId} from "../../../redux/comment/CommentAction";

function RemovePostDialog(props) {
    const dispatch = useDispatch()
    const {comment, loadingComment} = useSelector(state => state.dataComments)
    const user = JSON.parse(localStorage.getItem("user"))

    const remove = (commentId) => {
        dispatch(deleteCommentByCommentIdAndUserId(commentId, user.id))
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
                    loadingComment ?
                        <Box display="flex" justifyContent="center">
                            <CircularProgress/>
                        </Box>
                        :
                        <div>
                            Are you really want to delete this comment?
                        </div>
                }
            </DialogContent>
            <DialogActions>
                <Button onClick={props.close}>Close</Button>
                <Button onClick={() => remove(comment.id)} disabled={loadingComment}>Delete</Button>
            </DialogActions>
        </Dialog>
    );
}

export default RemovePostDialog;