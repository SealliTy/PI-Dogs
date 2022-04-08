import React from 'react';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getTemperaments, dogCreate} from '../actions';
import style from './DogCreate.module.css';

export default function DogCreate(){
    const dispatch = useDispatch()
    const allTemperaments = useSelector(state => state.temperaments)
    const [dog, setDog] = React.useState({
        raza:'',
        temperaments:[],
        img:'',
        peso:'',
        altura:'',
        añosVida:''
    })

    useEffect(() =>{
        dispatch(getTemperaments())
    }, [dispatch])

    const handleChange = (o) =>{
        setDog({
            ...dog,
            [o.target.name] : o.target.value
        })
    }

    const handleClick = (o) => {
        o.preventDefault();
        dispatch(dogCreate(dog));
    } 

    const handleSelect = (o) => {
        if(!dog.temperaments.includes(o.target.value))
            setDog({
                ...dog,
                temperaments: [...dog.temperaments, o.target.value]
            })
    }

    const handleDelete = (e) => {
        setDog({
          ...dog,
          temperaments: dog.temperaments.filter((o) => o !== e),
        });
      };


    return (
        <div className={style.body}>
            <form className={style.form} onSubmit={(o) => handleClick(o)}>
                <h2 className={style.h2}>Crea tu perro</h2>
                <input className={style.input} placeholder='Raza' type='text' name='raza' value={dog.raza} onChange={handleChange}></input>
                <input className={style.input} placeholder='Imagen del cachorro' name='img' value={dog.img} onChange={handleChange}></input>
                <input className={style.input} placeholder='Peso Kgs' type='number' name='peso' value={dog.peso} onChange={handleChange}></input>
                <input className={style.input} placeholder='Altura Cms' type='number' name='altura' value={dog.altura} onChange={handleChange}></input>
                <input className={style.input} placeholder='Años del cachorro' type='number' name='añosVida' value={dog.añosVida} onChange={handleChange}></input>
                <label>Temperamentos: </label>
                <select onChange={(o) => handleSelect(o)}>
                    {
                        allTemperaments.map(o =>{
                            return <option key={o.id} value={o.name}>{o.name}</option>
                        })
                    }
                </select>
                <ul>
                    {dog.temperaments.map(o => {
                        return (
                    <button key={dog.temperaments.indexOf(o)} onClick={() => handleDelete(o)}>{o}
                    </button>
                    )})}
                </ul>
                <button className={style.create_button} type='submit'>Create</button>
            </form>
        </div>
    )
}