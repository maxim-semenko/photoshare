import * as React from 'react';
import {useEffect} from 'react';
import {styled} from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import image from '../../image/img.png'
import moment from "moment-timezone";
import {Badge} from "@mui/material";
import LikeService from "../../service/LikeService";
import StarIcon from '@mui/icons-material/Star';
import BookmarkService from "../../service/BookmarkService";
import DeleteIcon from '@mui/icons-material/Delete';
import {useDispatch} from "react-redux";
import {deletePostById} from "../../redux/post/PostAction";

const ExpandMore = styled((props) => {
    const {expand, ...other} = props;
    return <IconButton {...other} />;
})(({theme}) => ({
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function PostComponent(props) {
    const user = JSON.parse(localStorage.getItem("user"))
    const [isContainLike, setIsContainLike] = React.useState(false);
    const [isContainBookmark, setIsContainBookmark] = React.useState(false);
    const [countLikes, setCountLikes] = React.useState(0);
    const dispatch = useDispatch()

    useEffect(() => {
        setIsContainLike(checkLike(props.object.likes, user.id))
        setIsContainBookmark(checkBookmark(props.bookmarksList, props.object.id))
        setCountLikes(props.object.likes.length)
    }, [])

    const checkLike = (likes, userId) => {
        for (let key in likes) {
            if (likes[key].user.id === userId) {
                return true
            }
        }
        return false
    }

    const checkBookmark = (bookmarks, postId) => {
        for (let key in bookmarks) {
            if (bookmarks[key].id === postId) {
                return true
            }
        }
        return false
    }

    const addLike = (postId, userId) => {
        setIsContainLike(true)
        setCountLikes(countLikes + 1)
        LikeService.addLike(postId, userId)
            .then(resp => {
                props.object.likes.push(resp.data)
            })
            .catch(error => {
                console.log(error)
                setIsContainLike(false)
                setCountLikes(countLikes - 1)
            })
    }

    const deleteLike = (postId, userId) => {
        setIsContainLike(false)
        setCountLikes(countLikes - 1)
        LikeService.deleteLike(postId, userId)
            .then(resp => {
                props.object.likes.pop(resp.data)
            })
            .catch(error => {
                console.log(error)
                setIsContainLike(true)
                setCountLikes(countLikes + 1)
            })
    }

    const addBookmark = (postId, userId) => {
        setIsContainBookmark(true)
        BookmarkService.addBookmark(postId, userId)
            .then(resp => {
                props.bookmarksList.push(resp.data)
            })
            .catch(error => {
                console.log(error)
                setIsContainBookmark(false)
            })
    }

    const deleteBookmark = (postId, userId) => {
        setIsContainBookmark(false)
        BookmarkService.deleteBookmark(postId, userId)
            .then(resp => {
                props.bookmarksList.pop(resp.data)
            })
            .catch(error => {
                console.log(error)
                setIsContainBookmark(true)
            })
    }

    const buttonLike = (post) => {
        return (<IconButton aria-label="add to favorites">
            <Badge badgeContent={countLikes === 0 ? '0' : countLikes} color="primary">
                <FavoriteIcon style={isContainLike ? {fill: "red"} : null}
                              onClick={isContainLike ?
                                  () => deleteLike(post.id, user.id) :
                                  () => addLike(post.id, user.id)}
                />
            </Badge>
        </IconButton>)
    }

    const buttonBookmark = (post) => {
        return (
            <ExpandMore>
                <StarIcon
                    style={isContainBookmark ? {fill: "#ffe900"} : null}
                    onClick={isContainBookmark ?
                        () => deleteBookmark(post.id, user.id) :
                        () => addBookmark(post.id, user.id)}
                />
            </ExpandMore>
        )
    }

    const remove = (id) => {
        dispatch(deletePostById(id, user.id))
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <Card>
            <CardHeader avatar={<Avatar alt="Remy Sharp" src={image}/>}
                        action={user.id === props.object.user.id ?
                            <IconButton aria-label="settings" onClick={() => remove(props.object.id)}>
                                <DeleteIcon/>
                            </IconButton>
                            :
                            null
                        }
                        title={<b>{props.object.user.username}</b>}
                        subheader={moment(props.object.createdDate).format('MMMM D YYYY, h:mm A')}
            />
            <CardMedia component="img" height={props.height} image={props.object.image} alt="user"/>
            <CardContent>
                <Typography variant="body2" color="text.secondary">{props.object.description}</Typography>
            </CardContent>
            <CardActions disableSpacing>
                {buttonLike(props.object)}
                {buttonBookmark(props.object)}
            </CardActions>
        </Card>
    );
}
