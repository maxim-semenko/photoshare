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
    const user = JSON.parse(localStorage.getItem("user"))
    const [followersList, setFollowersList] = useState([])
    const [followingsList, setFollowingsList] = useState([])
    const [openAllFollowersDialog, setOpenAllFollowersDialog] = useState(false)
    const [openAllFollowingDialog, setOpenAllFollowingDialog] = useState(false)

    useEffect(() => {
        UserService.getAllFollowersByUserId(user.id)
            .then(response => {
                console.log(response.data)
                setFollowersList(response.data.content)
            })
        UserService.getAllFollowingsByUserId(user.id)
            .then(response => {
                console.log(response.data)
                setFollowingsList(response.data.content)
            })
    }, [])

    const handleOpenAllFollowersDialog = () => {
        setOpenAllFollowersDialog(true);
    };

    const handleCloseAllFollowersDialog = () => {
        setOpenAllFollowersDialog(false);
    };

    const handleOpenAllFollowingDialog = () => {
        setOpenAllFollowingDialog(true);
    };

    const handleCloseAllFollowingsDialog = () => {
        setOpenAllFollowingDialog(false);
    };

    return (
        <Grid item xs={12} md={12} lg={10}>
            <AllFollowersDialog
                open={openAllFollowersDialog}
                close={handleCloseAllFollowersDialog}
                data={followersList}
            />
            <AllFollowingDialog
                open={openAllFollowingDialog}
                close={handleCloseAllFollowingsDialog}
                data={followingsList}
            />
            <b>{user.firstname} {user.lastname} ({user.username})</b>
            <Divider/>
            <Stack
                direction="row"
                divider={<Divider orientation="vertical" flexItem/>}
                spacing={2}
            >
                <Item>Posts {props.totalPosts}</Item>
                <Item onClick={handleOpenAllFollowersDialog}>Followers {followersList.length}</Item>
                <Item onClick={handleOpenAllFollowingDialog}>Following {followingsList.length}</Item>
            </Stack>
            <b>{user.about}</b>
        </Grid>
    );
}

export default AboutProfile;