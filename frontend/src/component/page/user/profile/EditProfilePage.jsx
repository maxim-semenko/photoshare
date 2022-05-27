import React from 'react';
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import HeaderComponent from "../../../common/HeaderComponent";
import DrawerComponent from "../../../common/DrawerComponent";

function EditProfilePage(props) {
    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <HeaderComponent/>
            <DrawerComponent/>
            {/*<main className={classes.content}>*/}
            {/*    <div className={classes.appBarSpacer}/>*/}
            {/*    <Container maxWidth="lg" className={classes.container}>*/}
            {/*        <Grid container spacing={3}>*/}
            {/*            <Grid item xs={12} md={12} lg={12}>*/}
            {/*                <Paper className={classes.paper} style={{paddingLeft: "15%", paddingRight: "15%"}}>*/}
            {/*                    <Grid container spacing={3}>*/}
            {/*                        <PostListComponent postsList={posts}/>*/}
            {/*                    </Grid>*/}
            {/*                </Paper>*/}
            {/*            </Grid>*/}
            {/*        </Grid>*/}
            {/*    </Container>*/}
            {/*</main>*/}
        </Box>
    );
}

export default EditProfilePage;