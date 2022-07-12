import React, {useState} from 'react';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {Alert, Collapse, DialogActions, DialogContent} from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import UserService from "../../../service/UserService";
import UserValidator from "../../../validator/UserValidator";

function ChangePasswordDialog(props) {

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
        <Dialog open={props.open} onClose={props.close} fullWidth maxWidth="sm">
            <DialogTitle>Change password</DialogTitle>
            <DialogContent>
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
                        color="success"
                        style={{margin: '24px 0px 16px'}}
                        onClick={handlerChangePassword}
                    >
                        Change password
                    </Button>
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.close}>Close</Button>
            </DialogActions>
        </Dialog>
    );
}

export default ChangePasswordDialog;