import React from 'react'
import {Navigate} from 'react-router-dom'
import jwt from "jsonwebtoken"
import {Cookies} from "react-cookie"

const ProtectedRoute = ({redirectPath = '/sign-in', children}) => {
    const cookies = new Cookies();
    let token = cookies.get("token")

    jwt.verify(token, 'my_secret_key', function (err) {
        if (err) {
            console.log("NOT VALID JWT")
            cookies.remove("token", {path: "/"})
            token = false
        }
    });

    if (!token) {
        return <Navigate to={redirectPath} replace/>;
    } else {
        return children;
    }
};

export default ProtectedRoute