import React, {useState} from 'react';
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import MailService from "../../../service/MailService";
import {Alert, CircularProgress, Collapse} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import {Link} from "react-router-dom";
import RestorePasswordValidator from "../../../validator/RestorePasswordValidator";
import AuthService from "../../../service/AuthService";

const paper = {
    marginTop: '64px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
}

function RestorePasswordPage(props) {

    const [sendingMail, setSendingMail] = useState(false);
    const [restoringPassword, setRestoringPassword] = useState(false);

    // Values
    const [email, setEmail] = useState('')
    const [code, setCode] = useState('')
    const [password, setPassword] = useState('')

    // Value's errors
    const [emailError, setEmailError] = useState('')
    const [codeError, setCodeError] = useState('')
    const [passwordError, setPasswordError] = useState('')

    const [showMessage, setShowMessage] = useState(false)
    const [typeMessage, setTypeMessage] = useState('success')
    const [textMessage, setTextMessage] = useState('')

    const [isSuccessRestorePassword, setIsSuccessRestorePassword] = useState(false)


    const changeEmailHandler = (event) => {
        setEmail(event.target.value)
        setEmailError('')
    }

    const changeCodeHandler = (event) => {
        setCode(event.target.value)
        setCodeError('')
    }

    const changePasswordHandler = (event) => {
        setPassword(event.target.value)
        setPasswordError('')
    }

    const sendMail = () => {
        setShowMessage(false)
        let error = RestorePasswordValidator.validateEmail(email)
        setEmailError(error)
        if (error === '') {
            setSendingMail(true)
            MailService.send({
                email: email,
                typeMessage: "RESTORE_PASSWORD"
            })
                .then(() => {
                    setTextMessage("Success to sending code! Check your mail.")
                    setTypeMessage("success")
                })
                .catch(error => {
                    setTextMessage("Error to send code! Check email and try again.");
                    setTypeMessage("error")
                })
                .finally(() => {
                    setSendingMail(false)
                    setShowMessage(true);
                })
        }
    }

    const restorePassword = () => {
        setShowMessage(false)
        let request = {
            email: email,
            emailCode: code,
            newPassword: password,
        }
        if (!findFormErrors(request)) {
            setRestoringPassword(true)
            AuthService.restorePassword(request)
                .then(() => {
                    setIsSuccessRestorePassword(true)
                    setTextMessage("Your password was restored successfully!")
                    setTypeMessage("success")
                })
                .catch(error => {
                    setTextMessage("Error: " + error.response.data.message);
                    setTypeMessage("error")
                })
                .finally(() => {
                    setRestoringPassword(false)
                    setShowMessage(true)
                })
        }
    }

    const findFormErrors = (data) => {
        let errors = RestorePasswordValidator.validateAll(data.email, data.emailCode, data.newPassword)
        setEmailError(errors.emailError)
        setCodeError(errors.emailCodeError)
        setPasswordError(errors.passwordError)

        for (let key in errors) {
            if (errors[key] !== '') {
                return true
            }
        }

        return false
    }

    const showFormRestorePassword = () => {
        return (
            <form style={{width: '100%', marginTop: '8px'}} noValidate>
                <Grid container>
                    <Grid item xs={9.9} md={9.9} lg={9.9}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            label="Your email to sending email-code"
                            error={emailError !== ''}
                            helperText={emailError ? emailError : ''}
                            onChange={changeEmailHandler}
                        />
                    </Grid>
                    <Grid item alignItems="stretch" style={{display: "flex", maxHeight: "55px"}}>
                        <Button
                            color="primary"
                            variant="contained"
                            disabled={sendingMail}
                            onClick={!sendingMail ? sendMail : null}
                        >
                            {sendingMail ? <CircularProgress size={'2em'}/> : 'Send'}
                        </Button>
                    </Grid>
                </Grid>
                <TextField
                    variant="outlined"
                    margin="normal"
                    error={codeError !== ''}
                    helperText={codeError ? codeError : ''}
                    fullWidth
                    label="Email code"
                    onChange={changeCodeHandler}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    error={passwordError !== ''}
                    helperText={passwordError ? passwordError : ''}
                    fullWidth
                    label="Your new password"
                    type="password"
                    onChange={changePasswordHandler}
                />
                <Button
                    fullWidth
                    variant="contained"
                    color="success"
                    style={{margin: '24px 0px 16px'}}
                    onClick={restorePassword}
                >
                    Restore password
                </Button>
                <Link to="/login" style={{textDecoration: "none"}}>
                    <Button
                        fullWidth
                        variant="contained"
                        color="error"
                    >
                        Login page
                    </Button>
                </Link>
            </form>
        )
    }

    // noinspection JSValidateTypes
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div style={paper}>
                <Typography component="h1" variant="h5">Restore password</Typography>
                <Collapse in={showMessage}>
                    <Alert
                        severity={typeMessage}
                        action={
                            <IconButton
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setShowMessage(false);
                                }}
                            >
                                <CloseIcon fontSize="inherit"/>
                            </IconButton>
                        }
                        sx={{mb: 2}}
                    >
                        {textMessage}
                    </Alert>
                </Collapse>
                {
                    isSuccessRestorePassword ?
                        <Link to="/login"><h3>Go to login page</h3></Link>
                        :
                        <div>
                            {showFormRestorePassword()}
                        </div>
                }
            </div>
        </Container>
    );
}

export default RestorePasswordPage;