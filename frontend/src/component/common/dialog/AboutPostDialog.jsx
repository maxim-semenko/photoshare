import React from 'react';
import {useSelector} from "react-redux";
import {CardContent, CircularProgress, DialogContent} from "@mui/material";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import image from "../../../image/img.png";
import moment from "moment-timezone";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CloseIcon from '@mui/icons-material/Close';
import CommentsPostComponent from "../CommentsPostComponent";

function AboutPostDialog(props) {
    const {post, loadingPost} = useSelector(state => state.dataPosts)

    return (<Dialog open={props.open} onClose={props.close} fullWidth maxWidth="lg">
        <AppBar sx={{position: 'relative'}}>
            <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    onClick={props.close}
                    aria-label="close"
                >
                    <CloseIcon/>
                </IconButton>
                <Typography sx={{ml: 2, flex: 1}} variant="h6" component="div">About post</Typography>
            </Toolbar>
        </AppBar>
        <DialogContent>
            {loadingPost ?
                <Box display="flex" justifyContent="center">
                    <CircularProgress/>
                </Box> :
                <div>
                    <Card>
                        <CardHeader avatar={<Avatar alt="Remy Sharp" src={image}/>}
                                    title={<b>{post.user.username}</b>}
                                    subheader={moment(post.createdDate).format('MMMM D YYYY, h:mm A')}
                        />
                        <div style={{textAlign: "center"}}>
                            <img style={{maxWidth: "100%", height: "auto"}} src={post.image} alt={"upload"}/>
                        </div>
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">{post.description}</Typography>
                        </CardContent>
                    </Card>
                    <CommentsPostComponent postId={post.id}/>
                </div>}
        </DialogContent>
    </Dialog>);
}

export default AboutPostDialog;