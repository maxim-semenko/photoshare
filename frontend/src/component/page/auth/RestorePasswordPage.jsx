import React, {useState} from 'react';
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import MailService from "../../../service/MailService";
import {Alert, Collapse} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import {Link} from "react-router-dom";

const paper = {
    marginTop: '64px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
}

function RestorePasswordPage(props) {

    const [sendingMail, setSendingMail] = useState(false);

    // Values
    const [email, setEmail] = useState('')
    const [code, setCode] = useState('')
    const [password, setPassword] = useState('')

    // Value's errors
    const [emailError, setEmailError] = useState('')
    const [codeError, setCodeError] = useState('')
    const [passwordError, setPasswordError] = useState('')

    const [showMessage, setShowMessage] = useState(false)
    const [typeMessage, setTypeMessage] = useState('')
    const [textMessage, setTextMessage] = useState('')


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
        let request = {
            email: email,
            typeMessage: "RESTORE_PASSWORD",
        }
        if (email.length === 0) {
            setEmailError("email can't be empty")
        } else {
            setSendingMail(true)
            MailService.send(request)
                .then((resp) => {
                    console.log(resp.data)
                    setSendingMail(false)
                    setTextMessage("Success to sending email code! Check your mail account.")
                    setTypeMessage("success")
                    setShowMessage(true)
                })
                .catch(error => {
                    console.log(error.response.data)
                    setSendingMail(false)
                    setTextMessage("Error to send email message! Try again.");
                    setTypeMessage("error")
                    setShowMessage(true);
                })
        }
    }

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
                <form style={{width: '100%', marginTop: '8px'}} noValidate>
                    <Grid container>
                        <Grid item xs={9.9} md={9.9} lg={9.9}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                label="Your email to sending email-code"
                                // error={passwordError !== ''}
                                // helperText={passwordError ? passwordError : ''}
                                onChange={changeEmailHandler}
                            />
                        </Grid>
                        <Grid item alignItems="stretch" style={{display: "flex"}}>
                            <Button
                                color="primary"
                                variant="contained"
                                disabled={sendingMail}
                                onClick={!sendingMail ? sendMail : null}
                            >
                                Send
                            </Button>
                        </Grid>
                    </Grid>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        // error={passwordError !== ''}
                        // helperText={passwordError ? passwordError : ''}
                        fullWidth
                        label="Email code"
                        // onChange={handlerChangePassword}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        // error={passwordError !== ''}
                        // helperText={passwordError ? passwordError : ''}
                        fullWidth
                        label="Your new password"
                        type="password"
                        // onChange={handlerChangePassword}
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        color="success"
                        style={{margin: '24px 0px 16px'}}
                        // onClick={handlerSignIn}
                    >
                        Change password
                    </Button>
                    <Link to="/login" style={{textDecoration: "none"}}>
                        <Button
                            fullWidth
                            variant="contained"
                            color="error"
                            // onClick={handlerSignIn}
                        >
                            Login page
                        </Button>
                    </Link>
                </form>
            </div>
        </Container>
    );
}

export default RestorePasswordPage;