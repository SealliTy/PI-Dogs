import React from 'react';
import style from './CardDog.module.css';

export default function Card({ raza, temperamento, peso, img, altura, añosVida }) {
    return (
        <div className={style.body_card}>
            <div className={style.dog_card}>
                <img className={style.img} src={img} alt="img" />
                <p className={style.raza}>{raza}</p>
                <p className={style.temperamento}><span>Temperamentos:</span> {temperamento}</p>
                <p className={style.altura}>{altura}</p>
                <p className={style.peso}>{peso} Kg</p>
                <p className={style.años}>{añosVida}</p>
            </div>
        </div>
    )
}