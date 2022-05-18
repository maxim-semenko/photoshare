import * as React from 'react';
import {useState} from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Button from "@mui/material/Button";
import {DialogActions, DialogContent, TextField} from "@mui/material";
import FileService from "../../../service/FileService";
import Card from "@mui/material/Card";
import PostService from "../../../service/PostService";

export default function CreatePostDialog(props) {
    const [image, setImage] = useState("")
    const [imageError, setImageError] = useState('')
    const user = JSON.parse(localStorage.getItem("user"))


    const saveHandler = () => {
        const request = {
            userId: user.id,
            image: image,
            description: "empty"
        }
        PostService.savePost(request)
            .then(response => {
                console.log(response.data)
            })
    };

    const changeImageHandler = async (event) => {
        const file = event.target.files[0];
        console.log(file.height)
        console.log(file.width)
        const base64 = await FileService.convertBase64(file);
        setImage(await FileService.convertBase64(file))
        setImageError('')


        var img = document.createElement("img")
        img.setAttribute("src", base64)
        setTimeout(function () {
            console.log(img.height, img.width);
        }, 0)
    };

    const ShowImage = () => {
        if (image !== '') {
            return (
                <Card>
                    <img style={{height: 'auto', width: '100%'}} src={image} alt={"upload"}/>
                </Card>

            )
        }
    }

    return (
        <Dialog open={props.open} onClose={props.close} fullWidth>
            <DialogTitle>Create a new post</DialogTitle>
            <DialogContent>
                <Button variant="contained" component="label" style={{marginBottom: "10px"}}>
                    Upload image<input type="file" hidden onChange={changeImageHandler}/>
                </Button>
                {ShowImage()}
                <TextField
                    autoFocus
                    multiline
                    rows={4}
                    margin="dense"
                    label="Description"
                    fullWidth
                    variant="standard"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={props.close}>Cancel</Button>
                <Button onClick={saveHandler}>Save</Button>
            </DialogActions>
        </Dialog>
    );
}