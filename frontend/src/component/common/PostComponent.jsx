import * as React from 'react';
import {useEffect, useState} from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import image from '../../image/img.png'
import moment from "moment-timezone";
import DeleteIcon from '@mui/icons-material/Delete';
import {useDispatch} from "react-redux";
import {getPostById, setIsOpenAbout} from "../../redux/post/PostAction";
import PostActionCreateDeleteLike from "./PostActionCreateDeleteLike";
import PostActionCreateDeleteBookmark from "./PostActionCreateDeleteBookmark";
import RemovePostDialog from "./dialog/RemovePostDialog";
import AboutPostDialog from "./dialog/AboutPostDialog";

export default function PostComponent(props) {
    const user = JSON.parse(localStorage.getItem("user"))
    const dispatch = useDispatch()
    const [openRemovePostDialog, setOpenRemovePostDialog] = useState(false)
    const [openAboutPostDialog, setOpenAboutPostDialog] = useState(false)

    const [isContainBookmark, setIsContainBookmark] = React.useState(false);
    const [isContainLike, setIsContainLike] = React.useState(false);


    useEffect(() => {
        setIsContainBookmark(checkBookmark(props.object.bookmarks, user.id))
        setIsContainLike(checkLike(props.object.likes, user.id))
    }, [])

    const checkBookmark = (bookmarks, userId) => {
        for (let key in bookmarks) {
            if (bookmarks[key].user.id === userId) {
                return true
            }
        }
        return false
    }

    const checkLike = (likes, userId) => {
        for (let key in likes) {
            if (likes[key].user.id === userId) {
                return true
            }
        }
        return false
    }

    const handleRemovePost = (id) => {
        dispatch(getPostById(id))
        setOpenRemovePostDialog(true)
    }

    const handleAboutPost = (id) => {
        dispatch(getPostById(id))
        dispatch(setIsOpenAbout(true))
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
        <Card>
            {DisplayDialogs()}
            <CardHeader avatar={<Avatar alt="Remy Sharp" src={image}/>}
                        action={user.id === props.object.user.id ?
                            <IconButton aria-label="settings" onClick={() => handleRemovePost(props.object.id)}>
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
            {/*<CardContent>*/}
            {/*    <Typography variant="body2" color="text.secondary">{props.object.description}</Typography>*/}
            {/*</CardContent>*/}
            <CardActions disableSpacing>
                <PostActionCreateDeleteLike post={props.object} isContain={isContainLike}/>
                <PostActionCreateDeleteBookmark post={props.object} isContain={isContainBookmark}/>
            </CardActions>
        </Card>
    );
}
