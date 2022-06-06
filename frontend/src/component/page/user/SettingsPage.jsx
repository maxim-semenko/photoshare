import React, {useState} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from "@mui/material/Box";
import {Paper} from "@mui/material";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import {makeStyles} from "@mui/styles";
import HeaderComponent from "../../common/HeaderComponent";
import DrawerComponent from "../../common/DrawerComponent";
import Button from "@mui/material/Button";
import ChangePasswordDialog from "../../common/dialog/ChangePasswordDialog";
import DeleteAccountDialog from "../../common/dialog/DeleteAccountDialog";
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const useStyles = makeStyles((theme) => ({
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(3),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    button: {
        margin: theme.spacing(1),
    },
}));

function SettingsPage() {
    const classes = useStyles();
    const [openChangePasswordDialog, setOpenChangePasswordDialog] = useState(false)
    const [openDeleteAccountDialog, setOpenDeleteAccountDialog] = useState(false)


    return (
        <div>
            <ChangePasswordDialog
                open={openChangePasswordDialog}
                close={() => setOpenChangePasswordDialog(false)}
            />
            <DeleteAccountDialog
                open={openDeleteAccountDialog}
                close={() => setOpenDeleteAccountDialog(false)}
            />
            <Box sx={{display: 'flex'}}>
                <CssBaseline/>
                <HeaderComponent/>
                <DrawerComponent/>
                <main className={classes.content}>
                    <div className={classes.appBarSpacer}/>
                    <Container maxWidth="lg" className={classes.container}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={12} lg={12}>
                                <Paper className={classes.paper}>
                                    <Button
                                        variant="contained"
                                        startIcon={<ChangeCircleIcon/>}
                                        size="large"
                                        onClick={() => setOpenChangePasswordDialog(true)}
                                        style={{marginTop: "1px", justifyContent: "flex-start"}}
                                    >
                                        Change password
                                    </Button>
                                    <br/>
                                    <Button
                                        variant="contained"
                                        startIcon={<DeleteForeverIcon/>}
                                        size="large"
                                        onClick={() => setOpenDeleteAccountDialog(true)}
                                        style={{marginTop: "1px", justifyContent: "flex-start"}}
                                    >
                                        Delete account
                                    </Button>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Container>
                </main>
            </Box>
        </div>
    );
}

export default SettingsPage;