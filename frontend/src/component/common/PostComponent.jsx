import * as React from 'react';
import {useEffect, useState} from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import moment from "moment-timezone";
import DeleteIcon from '@mui/icons-material/Delete';
import {useDispatch} from "react-redux";
import {getPostById} from "../../redux/post/PostAction";
import RemovePostDialog from "./dialog/RemovePostDialog";
import AboutPostDialog from "./dialog/AboutPostDialog";
import {Link} from "react-router-dom";
import {CardActions} from "@mui/material";
import PostActionCreateDeleteLike from "./PostActionCreateDeleteLike";
import PostActionCreateDeleteBookmark from "./PostActionCreateDeleteBookmark";

export default function PostComponent(props) {
    const user = JSON.parse(localStorage.getItem("user"))
    const dispatch = useDispatch()
    const [openRemovePostDialog, setOpenRemovePostDialog] = useState(false)
    const [openAboutPostDialog, setOpenAboutPostDialog] = useState(false)

    const [isContainBookmark, setIsContainBookmark] = React.useState(false);
    const [isContainLike, setIsContainLike] = React.useState(false);

    const [isCheckedLike, setIsCheckedLike] = useState(false);
    const [isCheckedBookmark, setIsCheckedBookmark] = useState(false);


    useEffect(() => {
        setIsContainBookmark(checkBookmark(props.object.bookmarks, user.id))
        setIsContainLike(checkLike(props.object.likes, user.id))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const checkBookmark = (bookmarks, userId) => {
        let check = false
        for (let key in bookmarks) {
            if (bookmarks[key].user.id === userId) {
                check = true
                break
            }
        }
        setIsCheckedBookmark(true)
        return check;
    }

    const checkLike = (likes, userId) => {
        let check = false
        for (let key in likes) {
            if (likes[key].user.id === userId) {
                check = true
                break
            }
        }
        setIsCheckedLike(true)
        return check
    }

    const handleRemovePost = (id) => {
        dispatch(getPostById(id))
        setOpenRemovePostDialog(true)
    }

    const handleAboutPost = (id) => {
        dispatch(getPostById(id))
        setOpenAboutPostDialog(true)
    }

    const DisplayDialogs = () => {
        if (openRemovePostDialog) {
            return <RemovePostDialog
                open={openRemovePostDialog}
                close={() => setOpenRemovePostDialog(false)}
            />
        }
        if (openAboutPostDialog) {
            return <AboutPostDialog
                open={openAboutPostDialog}
                close={() => setOpenAboutPostDialog(false)}
            />
        }
    }

    return (
        <div>
            {
                isCheckedLike && isCheckedBookmark ?
                    <Card>
                        {DisplayDialogs()}
                        <CardHeader avatar={
                            <Link
                                to={user.username === props.object.user.username ?
                                    `/profile` :
                                    `/account/${props.object.user.username}`
                                }>
                                <Avatar alt="Remy Sharp" src={props.object.user.image}/>
                            </Link>
                        }
                                    action={user.id === props.object.user.id ?
                                        <IconButton aria-label="settings"
                                                    onClick={() => handleRemovePost(props.object.id)}>
                                            <DeleteIcon/>
                                        </IconButton>
                                        :
                                        null
                                    }
                                    title={<b>{props.object.user.username}</b>}
                                    subheader={moment(props.object.createdDate).format('MMMM D YYYY, h:mm A')}
                        />
                        <CardMedia
                            component="img"
                            height={props.height}
                            image={props.object.image}
                            alt="post-image"
                            style={{cursor: "pointer"}}
                            onClick={() => handleAboutPost(props.object.id)}
                        />
                        <CardActions disableSpacing>
                            <PostActionCreateDeleteLike post={props.object} isContain={isContainLike}/>
                            <PostActionCreateDeleteBookmark post={props.object} isContain={isContainBookmark}/>
                        </CardActions>
                    </Card>
                    :
                    null
            }
        </div>
    );
}
