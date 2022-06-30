import React, {useState} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from "@mui/material/Box";
import {Alert, Collapse, Paper} from "@mui/material";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import {makeStyles} from "@mui/styles";
import HeaderComponent from "../../common/HeaderComponent";
import DrawerComponent from "../../common/DrawerComponent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import UserService from "../../../service/UserService";
import UserValidator from "../../../validator/UserValidator";

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

function FeedbackPage() {
    const classes = useStyles();


    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')

    const [showSuccess, setShowSuccess] = useState(false)
    const [successText, setTextSuccess] = useState('')

    const [showError, setShowError] = useState(false)
    const [textError, setTextError] = useState('')

    // Errors
    const [oldPasswordError, setOldPasswordError] = useState('')
    const [newPasswordError, setNewPasswordError] = useState('')

    const handlerChangePassword = (event) => {
        event.preventDefault();
        setShowSuccess(false)
        if (!findFormErrorsForUpdatePassword()) {
            let request = {
                oldPassword: oldPassword,
                newPassword: newPassword
            }
            UserService.updatePasswordById(request, JSON.parse(localStorage.getItem("user")).id)
                .then((response) => {
                    console.log(response.data);
                    setTextSuccess("Your password was edited successfully!")
                    setShowSuccess(true)
                }).catch(function (error) {
                    console.log(error.response);
                    setShowError(true)
                    setTextError("Your old password is not correct! Try again.")
                }
            );
        }
    }

    const findFormErrorsForUpdatePassword = () => {
        let isErrors = false

        // oldPassword errors
        let error = UserValidator.validatePassword(oldPassword)
        if (error !== "") {
            setOldPasswordError(error);
            isErrors = true
        }

        // newPassword errors
        error = UserValidator.validatePassword(newPassword)
        if (error !== "") {
            setNewPasswordError(error);
            isErrors = true
        }

        return isErrors
    }

    const changeOldPasswordHandler = (event) => {
        setOldPassword(event.target.value)
        setOldPasswordError("")
    }

    const changeNewPasswordHandler = (event) => {
        setNewPassword(event.target.value)
        setNewPasswordError("")
    }

    return (
        <div>
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
                                    <form style={{
                                        width: '100%',
                                        marginTop: '8px',
                                    }} noValidate>
                                        <Collapse in={showError}>
                                            <Alert
                                                severity="error"
                                                action={
                                                    <IconButton
                                                        color="inherit"
                                                        size="small"
                                                        onClick={() => {
                                                            setShowError(false);
                                                        }}
                                                    >
                                                        <CloseIcon fontSize="inherit"/>
                                                    </IconButton>
                                                }
                                                sx={{mb: 2}}
                                            >
                                                {textError}
                                            </Alert>
                                        </Collapse>
                                        <Collapse in={showSuccess}>
                                            <Alert
                                                severity="success"
                                                action={
                                                    <IconButton
                                                        color="inherit"
                                                        size="small"
                                                        onClick={() => {
                                                            setShowSuccess(false);
                                                        }}
                                                    >
                                                        <CloseIcon fontSize="inherit"/>
                                                    </IconButton>
                                                }
                                                sx={{mb: 2}}
                                            >
                                                {successText}
                                            </Alert>
                                        </Collapse>
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            error={oldPasswordError !== ''}
                                            helperText={oldPasswordError ? oldPasswordError : ''}
                                            fullWidth
                                            label="Old password"
                                            type="password"
                                            autoComplete="username"
                                            autoFocus
                                            onChange={changeOldPasswordHandler}
                                        />
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            error={newPasswordError !== ''}
                                            helperText={newPasswordError ? newPasswordError : ''}
                                            fullWidth
                                            label="New password"
                                            type="password"
                                            id="password"
                                            autoComplete="current-password"
                                            onChange={changeNewPasswordHandler}
                                        />
                                        <Button
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            style={{margin: '24px 0px 16px'}}
                                            onClick={handlerChangePassword}
                                        >
                                            Send feedback
                                        </Button>
                                    </form>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Container>
                </main>
            </Box>
        </div>
    );
}

export default FeedbackPage;