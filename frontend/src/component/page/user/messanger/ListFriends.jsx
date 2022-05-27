import React from 'react';
import {makeStyles} from "@mui/styles";
import {ListItem, ListItemIcon, ListItemText} from "@mui/material";
import {FixedSizeList} from "react-window";
import PropTypes from 'prop-types';
import Avatar from "@mui/material/Avatar";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: 400,
        maxWidth: 300,
        backgroundColor: theme.palette.background.paper,
    },
}));

const currentUser = JSON.parse(localStorage.getItem("user"))

function ListFriends(props) {
    const classes = useStyles();


    function renderRow({data, index, style}) {
        const user = data[index];
        return (
            <ListItem button style={style} key={index}
                      onClick={() => props.getChatRoom(currentUser.id, user.following.id)}>
                <ListItemIcon>
                    <Avatar alt={user.following.username}
                            src={user.following.image}/>
                </ListItemIcon>
                <ListItemText primary={user.following.username}/>
            </ListItem>
        );
    }

    renderRow.propTypes = {
        index: PropTypes.number.isRequired,
        style: PropTypes.object.isRequired,
    };

    return (
        <div className={classes.root}>
            <FixedSizeList height={440}
                           width={287}
                           itemSize={60}
                           itemCount={props.list.length}
                           itemData={props.list}
            >
                {renderRow}
            </FixedSizeList>
        </div>
    )
}

export default ListFriends;