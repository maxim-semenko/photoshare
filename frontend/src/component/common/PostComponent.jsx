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
import MoreVertIcon from '@mui/icons-material/MoreVert';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import image from '../../image/img.png'
import image1 from '../../image/img_1.png'
import moment from "moment-timezone";
import {Badge} from "@mui/material";
import LikeService from "../../service/LikeService";

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
    const [isContain, setIsContain] = React.useState(false);
    const [countLikes, setCountLikes] = React.useState(0);

    useEffect(() => {
        setIsContain(checkLike(props.object.likes, user.id))
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

    const addLike = (postId, userId) => {
        setIsContain(true)
        setCountLikes(countLikes + 1)
        LikeService.addLike(postId, userId)
            .then(resp => {
                props.object.likes.push(resp.data)
            })
            .catch(error => {
                console.log(error)
                setIsContain(false)
                setCountLikes(countLikes - 1)
            })
    }

    const deleteLike = (postId, userId) => {
        setIsContain(false)
        setCountLikes(countLikes - 1)
        LikeService.deleteLike(postId, userId)
            .then(resp => {
                props.object.likes.pop(resp.data)
            })
            .catch(error => {
                console.log(error)
                setIsContain(true)
                setCountLikes(countLikes + 1)
            })
    }

    const buttonLike = (post) => {
        return (<IconButton aria-label="add to favorites">
            <Badge badgeContent={countLikes === 0 ? '0' : countLikes} color="primary">
                <FavoriteIcon style={isContain ? {fill: "red"} : null}
                              onClick={isContain ?
                                  () => deleteLike(post.id, user.id) :
                                  () => addLike(post.id, user.id)}/>
            </Badge>
        </IconButton>)
    }

    return (<Card>
        <CardHeader avatar={<Avatar alt="Remy Sharp" src={image}/>}
                    action={<IconButton aria-label="settings"><MoreVertIcon/></IconButton>}
                    title={<b>{props.object.user.username}</b>}
                    subheader={moment(props.object.createdDate).format('MMMM D YYYY, h:mm A')}
        />
        <CardMedia component="img" height={props.height} image={image1} alt="Paella dish"/>
        <CardContent>
            <Typography variant="body2" color="text.secondary">{props.object.description}</Typography>
        </CardContent>
        <CardActions disableSpacing>
            {buttonLike(props.object)}
            <ExpandMore><StarBorderIcon/></ExpandMore>
        </CardActions>
    </Card>);
}
