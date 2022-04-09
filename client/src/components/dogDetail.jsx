import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDogId } from '../actions/index';
import { useParams } from 'react-router-dom';
import style from './DogDetail.module.css';

export default function DogDetail() {
    const dispatch = useDispatch()
    const params = useParams()
    const Dog = useSelector(state => state.dog)

    useEffect(() => {
        dispatch(getDogId(params.id))
    }, [dispatch, params.id])

    if (Dog) {
        return (
            <div className={style.container}>
            <div className={style.dog_detail}>
                <img src={Dog.img} alt='Dog Img' className={style.img}/>
                
                <h2 className={style.raza}>{Dog.raza}</h2>
                <p className={style.temperaments}><span>Temperamentos:</span>{Dog.temperaments}</p>
                <div className={style.medidas}>
                <h4 className={style.altura}>{Dog.altura} cm</h4>
                <h4 className={style.peso}>{Dog.peso} kg</h4>
                <h4 className={style.años}>{Dog.añosVida}</h4>
                </div>
               
            </div>
            </div>
        )
    }
    else {
        return 'Dont have dog'
    }



}