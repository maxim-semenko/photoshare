import React, {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Copyright from "../../common/Copyright";
import UserValidator from "../../../validator/UserValidator";
import AuthService from "../../../service/AuthService";
import {Cookies} from "react-cookie"
import {Link, useNavigate} from 'react-router-dom';

import jwt from 'jwt-decode'

const root = {
    height: '100vh',
}

const image = {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
}

const paper = {
    margin: '64px 32px',
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
    marginTop: '8px',
}

const submit = {
    margin: '24px 0px 16px',
}

export default function LoginPage() {
    const navigate = useNavigate();
    const cookies = new Cookies()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [usernameError, setUsernameError] = useState('')
    const [passwordError, setPasswordError] = useState('')

    const handlerChangeUsername = (event) => {
        setUsername(event.target.value)
        setUsernameError('');
    }

    const handlerChangePassword = (event) => {
        setPassword(event.target.value)
        setPasswordError('');
    }

    const findFormErrors = () => {
        let isErrors = false

        let errors = UserValidator.validateAllForSignIn(username, password)
        setUsernameError(errors.usernameError)
        setPasswordError(errors.passwordError)

        for (let key in errors) {
            if (errors[key] !== '') {
                isErrors = true
            }
        }

        return isErrors
    }

    const handlerSignIn = (event) => {
        event.preventDefault()
        if (!findFormErrors()) {
            const request = {
                username: username,
                password: password,
            }
            AuthService.login(request)
                .then(response => {
                    console.log(response.data)
                    console.log(jwt(response.data.token)); // decode your token here

                    localStorage.setItem("user", JSON.stringify(response.data.user))
                    cookies.set("token", response.data.token, {
                        path: "/",
                        sameSite: "strict",
                        maxAge: 86400000
                    })

                    // addHandler(ChatPage.getMessage)
                    // connect(response.data.user.username)
                    //     .then(() => {
                    //     })
                    setTimeout(function () {
                        navigate('/profile');
                    }, 1000);
                })
                .catch(error => {
                    console.log(error.response.data)
                    // setShowErrorSignUp(error.response.data.message)
                })
        }

    }

    return (
        <Grid container component="main" style={root}>
            <CssBaseline/>
            <Grid item xs={false} sm={4} md={7} style={image}/>
            <Grid item xs={12} sm={8} md={5} elevation={6}>
                <div style={paper}>
                    <Avatar style={avatar}><LockOutlinedIcon/></Avatar>
                    <Typography component="h1" variant="h5">Sign in</Typography>
                    <form style={form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            error={usernameError !== ''}
                            helperText={usernameError ? usernameError : ''}
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            onChange={handlerChangeUsername}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            error={passwordError !== ''}
                            helperText={passwordError ? passwordError : ''}
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={handlerChangePassword}
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            style={submit}
                            onClick={handlerSignIn}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link to={""} variant="body2">Forgot password?</Link>
                            </Grid>
                            <Grid item>
                                <Link to={"/register"} variant="body2">{"Don't have an account? Sign Up"}</Link>
                            </Grid>
                        </Grid>
                        <Box mt={5}>
                            <Copyright/>
                        </Box>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
}