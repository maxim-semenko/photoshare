import React from 'react';
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import {Stack} from "@mui/material";
import {styled} from "@mui/material/styles";
import Button from "@mui/material/Button";

const Item = styled(Button)(({theme}) => ({
    padding: theme.spacing(1),
    textAlign: 'center',
    color: 'rgb(33,33,33)'
}));

function AboutProfile(props) {
    const user = JSON.parse(localStorage.getItem("user"))

    return (
        <Grid item xs={12} md={12} lg={10}>
            <b>{user.firstname} {user.lastname} ({user.username})</b>
            <Divider/>
            <Stack
                direction="row"
                divider={<Divider orientation="vertical" flexItem/>}
                spacing={2}
            >
                <Item>Posts {props.totalPosts}</Item>
                <Item>Followers 2</Item>
                <Item>Following 3</Item>
            </Stack>
            <b>{user.about}</b>
        </Grid>
    );
}

export default AboutProfile;