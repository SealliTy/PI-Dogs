import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDogId } from '../actions/index';
import { useParams } from 'react-router-dom';
import style from './DogDetail.module.css';
import { Link } from 'react-router-dom'

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
                <Link to='/HomeDogs' style={{ textDecoration: 'none' }}>
                    <span className={style.back}>Back</span>
                </Link>
                <div>
                    <div className={style.dog_detail}>
                        <img src={Dog.img} alt='Dog Img' className={style.img} />

                        <h2 className={style.raza}>{Dog.raza}</h2>
                        <p className={style.temperaments}><span>Temperaments:</span>{Dog.temperaments}</p>
                        <div className={style.medidas}>
                            <h4 className={style.altura}>{Dog.altura} cm</h4>
                            <h4 className={style.peso}>{Dog.peso} kg</h4>
                            <h4 className={style.años}>{Dog.añosVida}</h4>
                        </div>

                    </div>
                </div>
            </div>

        )
    }
    else {
        return (
            <div className={style.contain_error}>
                <p className={style.error}>Dont have dog</p>
                <Link to='/HomeDogs' style={{ textDecoration: 'none' }}>
                    <span className={style.back}>Back</span>
                </Link>
            </div>
            
        )
    }



}