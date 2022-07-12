// noinspection JSValidateTypes

import React, {useEffect, useState} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from "@mui/material/Box";
import {Alert, Collapse, FormControl, InputLabel, NativeSelect, Paper} from "@mui/material";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import {makeStyles} from "@mui/styles";
import HeaderComponent from "../../common/HeaderComponent";
import DrawerComponent from "../../common/DrawerComponent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FeedbackService from "../../../service/FeedbackService";
import FeedbackValidator from "../../../validator/FeedbackValidator";

const useStyles = makeStyles((theme) => ({
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
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

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [type, setType] = useState(null)

    const [showMessage, setShowMessage] = useState(false)
    const [typeMessage, setTypeMessage] = useState('success')
    const [textMessage, setTextMessage] = useState('')

    // Errors
    const [titleError, setTitleError] = useState('')
    const [contentError, setContentError] = useState('')
    const [typeError, setTypeError] = useState('')

    const [feedbackTypes, setFeedbackTypes] = useState([]);


    useEffect(() => {
        FeedbackService.getAllFeedbackType()
            .then(response => {
                setFeedbackTypes(response.data.content)
            })
    }, [])

    const handlerSendFeedback = (event) => {
        event.preventDefault();
        setShowMessage(false)

        let request = {
            title: title,
            content: content,
            type: type
        }

        if (!findFormErrors(request)) {
            FeedbackService.create(request)
                .then(response => {
                    console.log(response.data);
                    setTextMessage("Your feedback was sent successfully! Thank you.")
                    setTypeMessage("success")
                })
                .catch(error => {
                    console.log(error.response);
                    setTextMessage("Your feedback is not correct! Try again.")
                    setTypeMessage("error")
                })
                .finally(() => setShowMessage(true));
        }
    }

    const findFormErrors = (data) => {
        let errors = FeedbackValidator.validateAll(data)
        setTitleError(errors.titleError)
        setContentError(errors.contentError)
        setTypeError(errors.typeError)

        for (let key in errors) {
            if (errors[key] !== '') {
                return true
            }
        }

        return false
    }

    const changeTitleHandler = (event) => {
        setTitle(event.target.value)
        setTitleError("")
    }

    const changeContentHandler = (event) => {
        setContent(event.target.value)
        setContentError("")
    }

    const changeTypeHandler = (event) => {
        setType(event.target.value)
        setTypeError("")
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
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            error={titleError !== ''}
                                            helperText={titleError ? titleError : ''}
                                            fullWidth
                                            label="Title"
                                            type="text"
                                            autoFocus
                                            autoComplete="off"
                                            onChange={changeTitleHandler}
                                        />
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            error={contentError !== ''}
                                            helperText={contentError ? contentError : ''}
                                            fullWidth
                                            label="Content"
                                            type="text"
                                            onChange={changeContentHandler}
                                            multiline
                                            rows={5}
                                        />
                                        <FormControl fullWidth>
                                            <InputLabel variant="standard">
                                                Feedback type
                                            </InputLabel>
                                            <NativeSelect
                                                defaultValue={null}
                                                error={typeError !== ''}
                                                onChange={changeTypeHandler}
                                            >
                                                <option value={null}>select...</option>
                                                {
                                                    feedbackTypes.map((type, index) => (
                                                        <option key={index} value={type.name}>{type.name}</option>
                                                    ))
                                                }
                                            </NativeSelect>
                                            <p className="MuiFormHelperText-root Mui-error
                                            MuiFormHelperText-sizeMedium MuiFormHelperText-contained
                                            css-1wc848c-MuiFormHelperText-root"
                                               id="mui-2-helper-text">{typeError}</p>
                                        </FormControl>
                                        <Button
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            style={{margin: '24px 0px 16px'}}
                                            onClick={handlerSendFeedback}
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