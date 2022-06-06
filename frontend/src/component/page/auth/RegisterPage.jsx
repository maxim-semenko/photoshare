import React, {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Copyright from "../../common/Copyright";
import UserValidator from "../../../validator/UserValidator";
import {Link} from "react-router-dom";
import AuthService from "../../../service/AuthService";
import {Alert, Collapse} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const paper = {
    marginTop: '64px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
}

const avatar = {
    margin: '8px',
    backgroundColor: '#ce93d8',
}

const form = {
    width: '100%',
    marginTop: '24px',
}

const submit = {
    marginTop: '24px',
}

export default function SignUp() {

    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [firstnameError, setFirstnameError] = useState('')
    const [lastnameError, setLastnameError] = useState('')
    const [usernameError, setUsernameError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')

    const [showError, setShowError] = useState(false)
    const [textError, setTextError] = useState('')


    const handlerChangeFirstname = (event) => {
        setFirstname(event.target.value)
        setFirstnameError('');
    }

    const handlerChangeLastname = (event) => {
        setLastname(event.target.value)
        setLastnameError('');
    }


    const handlerChangeUsername = (event) => {
        setUsername(event.target.value)
        setUsernameError('');
    }

    const handlerChangeEmail = (event) => {
        setEmail(event.target.value)
        setEmailError('');
    }

    const handlerChangePassword = (event) => {
        setPassword(event.target.value)
        setPasswordError('');
    }

    const findFormErrors = () => {
        let isErrors = false

        let errors = UserValidator.validateAllForSignUp(firstname, lastname, username, email, password)
        setFirstnameError(errors.firstnameError)
        setLastnameError(errors.lastnameError)
        setUsernameError(errors.usernameError)
        setEmailError(errors.emailError)
        setPasswordError(errors.passwordError)

        for (let key in errors) {
            if (errors[key] !== '') {
                isErrors = true
            }
        }

        return isErrors
    }

    const handlerSignUp = (event) => {
        event.preventDefault()
        if (!findFormErrors()) {
            const request = {
                firstname: firstname,
                lastname: lastname,
                username: username,
                email: email,
                password: password,
            }
            AuthService.register(request)
                .then(response => {
                    console.log(response.data)

                })
                .catch(error => {
                    console.log(error.response.data)
                    setShowError(true)
                    setTextError(error.response.data.message)
                })
        }

    }


    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div style={paper}>
                <Avatar style={avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form style={form} noValidate>
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
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="firstName"
                                variant="outlined"
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                                error={firstnameError !== ''}
                                helperText={firstnameError ? firstnameError : ''}
                                onChange={handlerChangeFirstname}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                error={lastnameError !== ''}
                                helperText={lastnameError ? lastnameError : ''}
                                onChange={handlerChangeLastname}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoComplete="email"
                                error={usernameError !== ''}
                                helperText={usernameError ? usernameError : ''}
                                onChange={handlerChangeUsername}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                error={emailError !== ''}
                                helperText={emailError ? emailError : ''}
                                onChange={handlerChangeEmail}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                error={passwordError !== ''}
                                helperText={passwordError ? passwordError : ''}
                                onChange={handlerChangePassword}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        style={submit}
                        onClick={handlerSignUp}
                    >
                        Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link to={"/login"}>
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright/>
            </Box>
        </Container>
    );
}