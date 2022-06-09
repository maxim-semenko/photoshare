import * as React from 'react';
import {useState} from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Button from "@mui/material/Button";
import {DialogActions, DialogContent, TextField} from "@mui/material";
import FileService from "../../../service/FileService";
import {useDispatch} from "react-redux";
import {createPost} from "../../../redux/post/PostAction";
import "../../../style/TextError.css"

export default function CreatePostDialog(props) {
    const dispatch = useDispatch()

    const [image, setImage] = useState("")
    const [description, setDescription] = useState("")

    const [imageError, setImageError] = useState('')
    const [descriptionError, setDescriptionError] = useState("")

    const saveHandler = () => {
        if (image !== "") {
            const request = {
                userId: JSON.parse(localStorage.getItem("user")).id,
                image: image,
                description: description,
            }
            dispatch(createPost(request))
                .then(() => {
                    console.log("SUCCESS")
                    props.close()
                })
        } else {
            setImageError("Please, select your photo!")
            setDescriptionError("Your description is so long")
        }
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
                    <img style={{maxWidth: "100%", height: "auto"}} src={image} alt={"upload"}/>
                </div>
            )
        }
    }

    return (
        <Dialog open={props.open} onClose={props.close} fullWidth maxWidth="lg">
            <DialogTitle>Create a new post</DialogTitle>
            <DialogContent>
                <Button variant="contained" component="label" style={{marginBottom: "10px"}}>
                    Upload image<input type="file" accept=".jpg, .jpeg, .png" hidden onChange={changeImageHandler}/>
                </Button>
                <p className="text-error"
                   style={{visibility: imageError ? 'visible' : 'hidden'}}>{imageError}</p>
                {ShowImage()}
                <TextField
                    autoFocus
                    multiline
                    rows={4}
                    error={descriptionError !== ''}
                    helperText={descriptionError ? descriptionError : ''}
                    margin="dense"
                    label="Description (not optional)"
                    fullWidth
                    variant="standard"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={props.close}>Close</Button>
                <Button onClick={saveHandler}>Create</Button>
            </DialogActions>
        </Dialog>
    );
}