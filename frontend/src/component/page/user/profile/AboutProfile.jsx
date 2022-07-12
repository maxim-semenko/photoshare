import React, {useEffect, useState} from 'react';
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import {Stack} from "@mui/material";
import {styled} from "@mui/material/styles";
import Button from "@mui/material/Button";
import AllFollowersDialog from "../../../common/dialog/AllFollowersDialog";
import AllFollowingDialog from "../../../common/dialog/AllFollowingDialog";
import UserService from "../../../../service/UserService";

const Item = styled(Button)(({theme}) => ({
    padding: theme.spacing(1),
    textAlign: 'center',
    color: 'rgb(33,33,33)'
}));

function AboutProfile(props) {
    const [followersList, setFollowersList] = useState([])
    const [followingsList, setFollowingsList] = useState([])
    const [openAllFollowersDialog, setOpenAllFollowersDialog] = useState(false)
    const [openAllFollowingDialog, setOpenAllFollowingDialog] = useState(false)

    useEffect(() => {
        UserService.getAllFollowersByUserId(props.user.id)
            .then(response => {
                setFollowersList(response.data.content)
            })
        UserService.getAllFollowingsByUserId(props.user.id)
            .then(response => {
                setFollowingsList(response.data.content)
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Grid item xs={12} md={12} lg={10}>
            <AllFollowersDialog
                open={openAllFollowersDialog}
                close={() => setOpenAllFollowersDialog(false)}
                data={followersList}
            />
            <AllFollowingDialog
                open={openAllFollowingDialog}
                close={() => setOpenAllFollowingDialog(false)}
                data={followingsList}
            />
            <b>{props.user.firstname} {props.user.lastname} ({props.user.username})</b>
            <Divider/>
            <Stack
                direction="row"
                divider={<Divider orientation="vertical" flexItem/>}
                spacing={2}
            >
                <Item>Posts {props.totalPosts}</Item>
                <Item onClick={() => setOpenAllFollowersDialog(true)}>Followers {followersList.length}</Item>
                <Item onClick={() => setOpenAllFollowingDialog(true)}>Following {followingsList.length}</Item>
            </Stack>
            <b>{props.user.about}</b>
        </Grid>
    );
}

export default AboutProfile;