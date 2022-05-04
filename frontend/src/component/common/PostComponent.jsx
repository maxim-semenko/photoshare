import * as React from 'react';
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

const ExpandMore = styled((props) => {
    const {expand, ...other} = props;
    return <IconButton {...other} />;
})(({theme, expand}) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function PostComponent(props) {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const checkLike = (likes) => {
        const user = JSON.parse(localStorage.getItem("user"))
        for (let key in likes) {
            if (likes[key].user.id === user.id) {
                return true
            }
        }
        return false
    }

    const addLike = () => {

    }

    const deleteLike = () => {

    }

    const buttonLike = (post) => {
        const countLikes = post.likes.length
        const isLiked = checkLike(post.likes)
        return (
            <IconButton aria-label="add to favorites">
                <Badge badgeContent={countLikes === 0 ? '0' : countLikes}
                       color="primary">
                    <FavoriteIcon style={isLiked ? {fill: "red"} : null}
                                  onClick={isLiked ? () => deleteLike() : () => addLike()}/>
                </Badge>
            </IconButton>
        )
    }

    return (
        <Card>
            <CardHeader avatar={<Avatar alt="Remy Sharp" src={image}/>}
                        action={<IconButton aria-label="settings"><MoreVertIcon/></IconButton>}
                        title={<b>{props.object.user.username}</b>}
                        subheader={moment(props.object.createdDate).format('MMMM D YYYY, h:mm A')}
            />
            <CardMedia component="img" height={props.height} image={image1} alt="Paella dish"/>
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {props.object.description}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                {buttonLike(props.object)}
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <StarBorderIcon/>
                </ExpandMore>
            </CardActions>
            {/*<Collapse in={expanded} timeout="auto" unmountOnExit>*/}
            {/*    <CardContent>*/}
            {/*        <Typography paragraph>Method:</Typography>*/}
            {/*        <Typography paragraph>*/}
            {/*            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set*/}
            {/*            aside for 10 minutes.*/}
            {/*        </Typography>*/}
            {/*        <Typography paragraph>*/}
            {/*            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over*/}
            {/*            medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring*/}
            {/*            occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a*/}
            {/*            large plate and set aside, leaving chicken and chorizo in the pan. Add*/}
            {/*            pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,*/}
            {/*            stirring often until thickened and fragrant, about 10 minutes. Add*/}
            {/*            saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.*/}
            {/*        </Typography>*/}
            {/*        <Typography paragraph>*/}
            {/*            Add rice and stir very gently to distribute. Top with artichokes and*/}
            {/*            peppers, and cook without stirring, until most of the liquid is absorbed,*/}
            {/*            15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and*/}
            {/*            mussels, tucking them down into the rice, and cook again without*/}
            {/*            stirring, until mussels have opened and rice is just tender, 5 to 7*/}
            {/*            minutes more. (Discard any mussels that don&apos;t open.)*/}
            {/*        </Typography>*/}
            {/*        <Typography>*/}
            {/*            Set aside off of the heat to let rest for 10 minutes, and then serve.*/}
            {/*        </Typography>*/}
            {/*    </CardContent>*/}
            {/*</Collapse>*/}
        </Card>
    );
}
