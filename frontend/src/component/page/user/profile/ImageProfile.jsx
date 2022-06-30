import React from 'react';
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import image from "../../../../image/icon2.png";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Grid from "@mui/material/Grid";
import {Link} from "react-router-dom";

const linkStyle = {
    textDecoration: 'none',
    color: 'rgb(33,33,33)'
}

function ImageProfile(props) {
    return (
        <Grid item xs={12} md={12} lg={2}>
            <Card sx={{maxWidth: 160}}>

                <CardMedia
                    component="img"
                    height="240"
                    image={props.user.image !== null ? props.user.image : image}
                    alt="Paella dish"
                />
                <Link to={"/edit"} style={linkStyle}>
                    <Button fullWidth
                            variant="contained"
                            color="primary"
                            startIcon={<CloudUploadIcon/>}
                            style={{marginTop: "1px"}}>
                        Edit profile
                    </Button>
                </Link>
            </Card>
        </Grid>
    );
}

export default ImageProfile;