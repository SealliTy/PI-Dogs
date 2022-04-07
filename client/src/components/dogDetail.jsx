import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDogId } from '../actions/index';
import Card from './card';
import {useParams} from 'react-router-dom';

export default function DogDetail() {
    const dispatch = useDispatch()
    const params = useParams()
    const Dog = useSelector(state => state.dog)

    useEffect(() => {
        dispatch(getDogId(params.id))
    }, [dispatch, params.id])

        if(Dog)
            return (
                <Card
                    key={Dog.id}
                    raza={Dog.raza}
                    img={Dog.img}
                    peso={Dog.peso}
                    altura={Dog.altura}
                    añosVida={Dog.añosVida}
                    temperamento={Dog.temperamento}
                    />
            )
            else{
                return 'Dont have dog'
            }
    

    
}