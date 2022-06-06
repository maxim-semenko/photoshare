import React from 'react';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {DialogActions, DialogContent} from "@mui/material";
import Button from "@mui/material/Button";

function ChangePasswordDialog(props) {
    return (
        <Dialog open={props.open} onClose={props.close} fullWidth maxWidth="sm">
            <DialogTitle>Change password</DialogTitle>
            <DialogContent>

            </DialogContent>
            <DialogActions>
                <Button onClick={props.close}>Close</Button>
            </DialogActions>
        </Dialog>
    );
}

export default ChangePasswordDialog;