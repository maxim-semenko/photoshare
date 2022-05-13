import React from 'react';
import {makeStyles} from "@mui/styles";
import {ListItem, ListItemText} from "@mui/material";
import {FixedSizeList} from "react-window";
import PropTypes from 'prop-types';
import Avatar from "@mui/material/Avatar";
import image from "../../../image/img.png";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: 400,
        maxWidth: 300,
        backgroundColor: theme.palette.background.paper,
    },
}));

function renderRow({data, index, style}) {
    const user = data[index];
    console.log(user)
    return (
        <ListItem button style={style} key={index}>
            <Avatar alt="Remy Sharp" src={image} style={{marginRight: "15px"}}/>
            <p>{user.following.username}</p>
        </ListItem>
    );
}

renderRow.propTypes = {
    index: PropTypes.number.isRequired,
    style: PropTypes.object.isRequired,
};

function ListFriends(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <FixedSizeList height={500}
                           width={291}
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