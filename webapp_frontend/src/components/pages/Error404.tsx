import React from 'react';
import { Link } from 'react-router-dom';

export default function Error404() {
    return <div>
        <p style={{textAlign:"center"}}>
            <Link to="/">Go to Home </Link>
        </p>
    </div>;
}