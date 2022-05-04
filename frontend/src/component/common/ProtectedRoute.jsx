import React from 'react'
import {Navigate} from 'react-router-dom'
import jwt from "jsonwebtoken"
import {Cookies} from "react-cookie"

const ProtectedRoute = ({children}) => {
        const cookies = new Cookies();
        let token = cookies.get("token")
        jwt.verify(token, 'my_secret_key', function (err) {
            if (err) {
                console.log("NOT VALID JWT token")
                cookies.remove("token", {path: "/"})
                token = false
            }
        });
        const path = window.location.pathname
        if (token) {
            if (path === '/login' || path === '/register') {
                return <Navigate to={"/profile"} replace/>;
            } else {
                return children;
            }
        } else {
            if (path === '/login' || path === '/register') {
                return children;
            } else {
                return <Navigate to={"/login"} replace/>;
            }
        }
    }
;

export default ProtectedRoute