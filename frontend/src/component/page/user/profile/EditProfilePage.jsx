import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import HeaderComponent from "../../../common/HeaderComponent";
import DrawerComponent from "../../../common/DrawerComponent";
import {Alert, Collapse} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import UserValidator from "../../../../validator/UserValidator";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import image from "../../../../image/icon2.png";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const paper = {
    marginTop: '-20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
}

const form = {
    width: '100%',
    marginTop: '24px',
}

const submit = {
    marginTop: '24px',
}

function EditProfilePage(props) {
    const user = JSON.parse(localStorage.getItem("user"))

    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [about, setAbout] = useState('')

    const [firstnameError, setFirstnameError] = useState('')
    const [lastnameError, setLastnameError] = useState('')
    const [usernameError, setUsernameError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [aboutError, setAboutError] = useState('')

    const [showError, setShowError] = useState(false)
    const [textError, setTextError] = useState('')


    useEffect(() => {
        setFirstname(user.firstname)
        setLastname(user.lastname)
        setUsername(user.username)
        setEmail(user.email)
        setAbout(user.about)
    }, [])

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

    const findFormErrors = () => {
        let isErrors = false

        let errors = UserValidator.validateForEditUser(firstname, lastname, username, email, about)
        setFirstnameError(errors.firstnameError)
        setLastnameError(errors.lastnameError)
        setUsernameError(errors.usernameError)
        setEmailError(errors.emailError)
        setAboutError(errors.aboutError)

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
                about: about,
                image: image
            }
            // AuthService.register(request)
            //     .then(response => {
            //         console.log(response.data)
            //
            //     })
            //     .catch(error => {
            //         console.log(error.response.data)
            //         setShowError(true)
            //         setTextError(error.response.data.message)
            //     })
        }

    }

    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <HeaderComponent/>
            <DrawerComponent/>
            <Container component="main" style={{marginTop: "8%"}}>
                <CssBaseline/>
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
                <Grid container spacing={3}>
                    <Grid item xs={12} md={12} lg={2}>
                        <Card sx={{maxWidth: 160}}>
                            <CardMedia
                                component="img"
                                height="240"
                                image={user.image !== null ? user.image : image}
                                alt="Paella dish"
                            />
                            <Button fullWidth
                                    variant="contained"
                                    color="primary"
                                    startIcon={<CloudUploadIcon/>}
                                    style={{marginTop: "1px"}}>
                                Load image
                            </Button>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={12} lg={10}>
                        <div style={paper}>
                            <form style={form} noValidate>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={12}>
                                        <TextField
                                            name="firstName"
                                            variant="outlined"
                                            fullWidth
                                            id="firstName"
                                            label="First Name"
                                            autoFocus
                                            autoComplete="off"
                                            value={firstname}
                                            error={firstnameError !== ''}
                                            helperText={firstnameError ? firstnameError : ''}
                                            onChange={handlerChangeFirstname}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <TextField
                                            variant="outlined"
                                            fullWidth
                                            id="lastName"
                                            label="Last Name"
                                            name="lastName"
                                            value={lastname}
                                            autoComplete="off"
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
                                            value={username}
                                            autoComplete="off"
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
                                            value={email}
                                            autoComplete="off"
                                            error={emailError !== ''}
                                            helperText={emailError ? emailError : ''}
                                            onChange={handlerChangeEmail}
                                        />
                                    </Grid>
                                </Grid>
                            </form>
                        </div>
                    </Grid>
                </Grid>
                <TextField
                    variant="outlined"
                    margin="normal"
                    // error={contentError !== ''}
                    // helperText={contentError ? contentError : ''}
                    fullWidth
                    label="About"
                    type="text"
                    value={about}
                    // onChange={changeContentHandler}
                    multiline
                    rows={5}
                />
                <Button
                    fullWidth
                    variant="contained"
                    color="success"
                    style={submit}
                    onClick={handlerSignUp}
                >
                    Edit
                </Button>

                <Button
                    fullWidth
                    variant="contained"
                    color="error"
                    style={submit}
                    onClick={handlerSignUp}
                >
                    Cancel
                </Button>
            </Container>
        </Box>
    );
}

export default EditProfilePage;