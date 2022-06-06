import React from 'react';
import DialogTitle from "@mui/material/DialogTitle";
import {DialogActions, DialogContent} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";

function DeleteAccountDialog(props) {
    return (
        <Dialog open={props.open} onClose={props.close} fullWidth maxWidth="sm">
            <DialogTitle>Delete account</DialogTitle>
            <DialogContent>

            </DialogContent>
            <DialogActions>
                <Button onClick={props.close}>Close</Button>
            </DialogActions>
        </Dialog>
    );
}

export default DeleteAccountDialog;