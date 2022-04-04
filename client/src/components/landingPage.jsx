import React from 'react';
import {Link} from 'react-router-dom';

export default function LandingPage(){
    return(
        <div>
            <h1>titulo</h1>
            <Link to='/HomeDogs'>
                <button>iniciar</button>
            </Link>
        </div>
    )
}