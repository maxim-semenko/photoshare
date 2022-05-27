import React from 'react';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {
    CircularProgress,
    DialogActions,
    DialogContent,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText
} from "@mui/material";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Avatar from "@mui/material/Avatar";

function AllFollowersDialog(props) {
    return (
        <Dialog open={props.open} onClose={props.close} fullWidth maxWidth="sm">
            <DialogTitle>All your followers</DialogTitle>
            <DialogContent>
                <List sx={{width: '100%', maxWidth: 800, bgcolor: 'background.paper'}}>
                    {
                        props.data.length !== 0 ?
                            <div>
                                {
                                    props.data.map((item, index) => {
                                        return (
                                            <ListItem key={index} disablePadding>
                                                <ListItemButton>
                                                    <ListItemAvatar>
                                                        <Avatar src={item.image}/>
                                                    </ListItemAvatar>
                                                    <ListItemText primary={item.username}/>
                                                </ListItemButton>
                                            </ListItem>
                                        )
                                    })
                                }
                            </div>
                            :
                            <div>
                                <CircularProgress/>
                            </div>
                    }
                </List>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.close}>Close</Button>
            </DialogActions>
        </Dialog>
    );
}

export default AllFollowersDialog;