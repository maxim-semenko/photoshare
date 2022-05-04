import React from 'react';
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import image from "../../../image/img.png";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Grid from "@mui/material/Grid";

function ImageProfile(props) {
    return (
        <Grid item xs={12} md={12} lg={2}>
            <Card sx={{maxWidth: 160}}>
                <CardMedia
                    component="img"
                    height="240"
                    image={image}
                    alt="Paella dish"
                />
                <Button fullWidth
                        variant="contained"
                        color="primary"
                        startIcon={<CloudUploadIcon/>}
                        style={{marginTop: "1px"}}>
                    Edit profile
                </Button>
            </Card>
        </Grid>
    );
}

export default ImageProfile;