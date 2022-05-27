import React from 'react';
import {Link} from "react-router-dom";

function NotFoundPage(props) {
    return (
        <div>
            <h1>NOT FOUND 404!</h1>
            <Link to="/">Go Home</Link>
        </div>
    );
}

export default NotFoundPage;