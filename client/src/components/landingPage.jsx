import React from 'react';
import { Link } from 'react-router-dom';
import huella from '../img/huella.png'
import style from './LandingPage.module.css';

export default function LandingPage() {
    return (
        <div className={style.content}>
            <h1 className={style.h1}>Dogs APP</h1>
            <Link to='/HomeDogs' style={{ textDecoration: 'none' }}>
                <button className={style.titulo}>
                    <img className={style.huella} src={huella} alt="huella_perro"></img>
                    Start
                </button>

            </Link>

        </div>
    )
}