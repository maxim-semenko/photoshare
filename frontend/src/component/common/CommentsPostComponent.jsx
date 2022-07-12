import React, {useEffect, useRef, useState} from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import List from "@mui/material/List";
import {Fab, ListItem, ListItemAvatar, ListItemButton, ListItemText, TextField} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import SendIcon from "@mui/icons-material/Send";
import {useDispatch, useSelector} from "react-redux";
import {createComment, getAllCommentsByPostId, getCommentById, setCurrentPage} from "../../redux/comment/CommentAction";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import moment from "moment-timezone";
import RemoveCommentDialog from "./dialog/RemoveCommentDialog";

function CommentPostComponent(props) {
    const dispatch = useDispatch()
    const {comments, currentPage, totalElements} = useSelector(state => state.dataComments)
    const user = JSON.parse(localStorage.getItem("user"))

    const [openRemoveCommentDialog, setOpenRemoveCommentDialog] = useState(false)

    const commentInputRef = useRef(null);

    useEffect(() => {
        console.log(props.postId)
        dispatch(getAllCommentsByPostId(props.postId, 0, 5))
    }, [])

    const fetchMoreData = () => {
        let page = currentPage + 1;
        dispatch(setCurrentPage(page))
        dispatch(getAllCommentsByPostId(props.postId, page, 5))

    };

    const sendComment = () => {
        let request = {
            postId: props.postId,
            userId: user.id,
            content: commentInputRef.current.value
        }

        commentInputRef.current.value = ""
        dispatch(createComment(request))
            .then((response) => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const handleRemoveComment = (id) => {
        dispatch(getCommentById(id))
        setOpenRemoveCommentDialog(true)
    }

    const DisplayDialogs = () => {
        if (openRemoveCommentDialog) {
            return <RemoveCommentDialog
                open={openRemoveCommentDialog}
                close={() => setOpenRemoveCommentDialog(false)}
            />
        }
    }

    return (
        <div>
            {DisplayDialogs()}
            <Grid container style={{paddingTop: '20px', paddingBottom: "20px"}}>
                <Grid item xs={11}>
                    <TextField
                        // onKeyDown={handleEnterKeyDown}
                        type={"text"}
                        label="Type comment"
                        fullWidth
                        autoComplete="off"
                        // value={commentText}
                        inputRef={commentInputRef}
                    />
                </Grid>
                <Grid xs={1} align="right">
                    <Fab color="primary" onClick={() => sendComment()}>
                        <SendIcon/>
                    </Fab>
                </Grid>
            </Grid>
            {/*<hr/>*/}
            <div id="scrollableDiv" style={{maxHeight: 420, overflow: "auto", paddingBottom: "20px"}}>
                <InfiniteScroll
                    dataLength={comments.length}
                    next={fetchMoreData}
                    hasMore={comments.length < totalElements}
                    loader={<h4>Loading...</h4>}
                    scrollableTarget="scrollableDiv"
                >
                    {
                        comments.length !== 0 ?
                            <List sx={{width: '100%', maxWidth: 1200, bgcolor: 'background.paper'}}>
                                <div><b>{totalElements} comments:</b></div>
                                {
                                    comments.map((comment, index) => {
                                        return (
                                            <ListItem
                                                key={index}
                                                disablePadding style={{maxWidth: "100%"}}
                                                secondaryAction={
                                                    comment.user.id === user.id ?
                                                        <IconButton edge="end" aria-label="delete">
                                                            <DeleteIcon
                                                                onClick={() => handleRemoveComment(comment.id)}/>
                                                        </IconButton>
                                                        :
                                                        null
                                                }
                                            >
                                                <ListItemButton>
                                                    <ListItemAvatar>
                                                        <Avatar src={comment.user.image}/>
                                                    </ListItemAvatar>
                                                    <ListItemText
                                                        primary={
                                                            <span>
                                                               <b>{comment.user.username}</b>{' '}
                                                                ({moment(comment.createdAt).format('MMMM D YYYY, h:mm A')})
                                                            </span>
                                                        }
                                                        secondary={
                                                            <React.Fragment>
                                                                {comment.content}
                                                            </React.Fragment>
                                                        }
                                                    />

                                                </ListItemButton>
                                            </ListItem>
                                        )
                                    })
                                }
                            </List>
                            :
                            <div>No comments here...</div>
                    }
                </InfiniteScroll>
            </div>
        </div>
    );
}

export default CommentPostComponent;