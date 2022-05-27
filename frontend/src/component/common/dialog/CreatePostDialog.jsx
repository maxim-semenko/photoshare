import * as React from 'react';
import {useState} from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Button from "@mui/material/Button";
import {DialogActions, DialogContent, TextField} from "@mui/material";
import FileService from "../../../service/FileService";
import PostService from "../../../service/PostService";
import {useDispatch, useSelector} from "react-redux";
import {createPost} from "../../../redux/post/PostAction";

export default function CreatePostDialog(props) {
    const dispatch = useDispatch()
    const {posts, totalElements} = useSelector(state => state.dataPosts)

    const [image, setImage] = useState("")
    const [imageError, setImageError] = useState('')
    const user = JSON.parse(localStorage.getItem("user"))

    const saveHandler = () => {
        const request = {
            userId: user.id,
            image: image,
            description: "empty"
        }
        dispatch(createPost(request))
            .then(() => {
                console.log("SUCCESS")
            })
    };

    const changeImageHandler = async (event) => {
        const file = event.target.files[0];
        const base64 = await FileService.convertBase64(file);
        setImage(await FileService.convertBase64(file))
        setImageError('')


        const img = document.createElement("img");
        img.setAttribute("src", base64)
        setTimeout(function () {
            console.log(img.height, img.width);
        }, 0)
    };

    const ShowImage = () => {
        if (image !== '') {
            return (
                <div style={{textAlign: "center"}}>
                    <img style={{
                        maxWidth: "100%",
                        height: "auto",
                    }}
                         src={image} alt={"upload"}/>
                </div>
            )
        }
    }

    return (
        <Dialog open={props.open} onClose={props.close} fullWidth maxWidth="lg">
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
                    label="Description (not optional)"
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