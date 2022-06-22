import React from 'react';
import DialogTitle from "@mui/material/DialogTitle";
import {DialogActions, DialogContent} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";

const form = {
    width: '100%',
    marginTop: '8px',
}

const submit = {
    margin: '24px 0px 16px',
}

function DeleteAccountDialog(props) {
    return (
        <Dialog open={props.open} onClose={props.close} fullWidth maxWidth="sm">
            <DialogTitle>Delete account</DialogTitle>
            <DialogContent>
                <form style={form} noValidate>
                    <Grid container>
                        <Grid item xs={10.49} md={10.49} lg={10.49}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                label="Email code"
                                // error={passwordError !== ''}
                                // helperText={passwordError ? passwordError : ''}
                                // onChange={handlerChangePassword}
                            />
                        </Grid>
                        <Grid item alignItems="stretch" style={{display: "flex"}}>
                            <Button color="primary" variant="contained">Send</Button>
                        </Grid>
                    </Grid>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        // error={passwordError !== ''}
                        // helperText={passwordError ? passwordError : ''}
                        fullWidth
                        label="Your password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        // onChange={handlerChangePassword}
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        color="error"
                        style={submit}
                        // onClick={handlerSignIn}
                    >
                        Delete account
                    </Button>
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.close}>Close</Button>
            </DialogActions>
        </Dialog>
    );
}

export default DeleteAccountDialog;