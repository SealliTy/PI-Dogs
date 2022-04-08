import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDogId } from '../actions/index';
import {useParams} from 'react-router-dom';

export default function DogDetail() {
    const dispatch = useDispatch()
    const params = useParams()
    const Dog = useSelector(state => state.dog)

    useEffect(() => {
        dispatch(getDogId(params.id))
    }, [dispatch, params.id])

        if(Dog){
            return (
                <div>
                    <h2>{Dog.raza}</h2>
                    <img src={Dog.img} />
                    <h4>{Dog.peso}</h4>
                    <h4>{Dog.altura}</h4>
                    <h4>{Dog.añosVida}</h4>
                    {Dog.temperaments}
                </div>
            )}
            else{
                return 'Dont have dog'
            }
    

    
}