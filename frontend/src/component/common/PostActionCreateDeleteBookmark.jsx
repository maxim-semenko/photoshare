import React, {useEffect} from 'react';
import StarIcon from "@mui/icons-material/Star";
import BookmarkService from "../../service/BookmarkService";
import {styled} from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";

const ExpandMore = styled((props) => {
    const {expand, ...other} = props;
    return <IconButton {...other} />;
})(({theme}) => ({
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

function PostActionCreateDeleteBookmark(props) {
    const user = JSON.parse(localStorage.getItem("user"))
    const [isContainBookmark, setIsContainBookmark] = React.useState(false);

    useEffect(() => {
        setIsContainBookmark(checkBookmark(props.post.bookmarks, user.id))
    }, [props.post.bookmarks, user.id])

    const checkBookmark = (bookmarks, userId) => {
        for (let key in bookmarks) {
            if (bookmarks[key].user.id === userId) {
                return true
            }
        }
        return false
    }

    const addBookmark = (postId, userId) => {
        setIsContainBookmark(true)
        BookmarkService.addBookmark(postId, userId)
            .then(resp => {
                props.post.bookmarks.push(resp.data)
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
                props.post.bookmarks.pop(resp.data)
            })
            .catch(error => {
                console.log(error)
                setIsContainBookmark(true)
            })
    }

    return (
        <ExpandMore>
            <StarIcon
                style={isContainBookmark ? {fill: "#ffe900"} : null}
                onClick={isContainBookmark ?
                    () => deleteBookmark(props.post.id, user.id) :
                    () => addBookmark(props.post.id, user.id)}
            />
        </ExpandMore>
    )
}

export default PostActionCreateDeleteBookmark;