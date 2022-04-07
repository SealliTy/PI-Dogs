import React from 'react';
import {Link} from 'react-router-dom';
import huella from '../img/huella.png'
import style from './LandingPage.module.css'; 

export default function LandingPage(){
    return(
        <div className={style.body}>
        <div>
            <h1 className={style.h1}>API DOGS</h1>
            
            
            <Link to='/HomeDogs'>
                <img className={style.huella} src={huella} alt="huella_perro" />
            </Link>
        </div>
        </div>
    )
}