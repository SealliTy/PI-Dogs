import React from 'react';
import style from './CardDog.module.css';

export default function Card({ raza, temperaments, peso, img }) {
    return (
        
            <div className={style.dog_card}>
                <img className={style.img} src={img} alt="img" />
                <p className={style.raza}>{raza}</p>
                <p className={style.temperamento}><span>Temperamentos:</span>{temperaments}</p>
                <p className={style.peso}>{peso} Kg</p>
            </div>
        
    )
}