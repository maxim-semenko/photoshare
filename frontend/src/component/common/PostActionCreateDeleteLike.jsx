import React, {useEffect} from 'react';
import IconButton from "@mui/material/IconButton";
import {Badge} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LikeService from "../../service/LikeService";

function PostActionCreateDeleteLike(props) {
    const user = JSON.parse(localStorage.getItem("user"))
    const [isContainLike, setIsContainLike] = React.useState(null);
    const [countLikes, setCountLikes] = React.useState(0);

    useEffect(() => {
        setIsContainLike(props.isContain)
        setCountLikes(props.post.likes.length)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const addLike = (postId, userId) => {
        setIsContainLike(true)
        setCountLikes(countLikes + 1)
        LikeService.addLike(postId, userId)
            .then(resp => {
                props.post.likes.push(resp.data)
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
                props.post.likes.pop(resp.data)
            })
            .catch(error => {
                console.log(error)
                setIsContainLike(true)
                setCountLikes(countLikes + 1)
            })
    }

    return (
        <IconButton aria-label="add to favorites">
            {
                isContainLike !== null ?
                    <Badge badgeContent={countLikes === 0 ? '0' : countLikes} color="primary">
                        <FavoriteIcon style={isContainLike ? {fill: "red"} : null}
                                      onClick={isContainLike ?
                                          () => deleteLike(props.post.id, user.id) :
                                          () => addLike(props.post.id, user.id)}
                        />
                    </Badge>
                    :
                    null
            }

        </IconButton>)
}

export default PostActionCreateDeleteLike;