import React from 'react';
import { Link } from 'react-router-dom';
import huella from '../img/huella.png'
import style from './LandingPage.module.css';

export default function LandingPage() {
    return (
        <div className={style.body}>
            <div>
                <Link to='/HomeDogs' style={{ textDecoration: 'none' }}>
                    <div className={style.content}>
                        <img className={style.huella} src={huella} alt="huella_perro" />
                        <h1 className={style.h1}>Start</h1>
                    </div>
                    
                </Link>
            </div>
        </div>
    )
}