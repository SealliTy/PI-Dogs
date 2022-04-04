import React from 'react';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getTemperaments, dogCreate} from '../actions';

export default function DogCreate(){
    const dispatch = useDispatch()
    const allTemperaments = useSelector(state => state.temperaments)
    const [input, setInput] = React.useState({
        raza:'',
        temperamento:[],
        img:'',
        peso:'',
        altura:'',
        añosVida:''
    })

    useEffect(() =>{
        dispatch(getTemperaments())
    }, [dispatch])

    const handleChange = (e) =>{
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
    }

    function handleClick(e){
        e.preventDefault();
        dispatch(dogCreate(input));
    } 
    return (
        <div>
            <form onSubmit={handleClick}>
                <label>Raza: </label>
                <input name='raza' value={input.raza} onChange={handleChange}></input>
                <label>Temperamentos: </label>
                <select name='temperamento' value={input.temperamento} onChange={handleChange}>
                    {
                        allTemperaments.map(o =>{
                            return <option key={o.id} value={o.name}>{o.name}</option>
                        })
                    }
                </select>
                <label>Imagen: </label>
                <input name='img' value={input.img} onChange={handleChange}></input>
                <label>Peso: </label>
                <input name='peso' value={input.peso} onChange={handleChange}></input>
                <label>Altura: </label>
                <input name='altura' value={input.altura} onChange={handleChange}></input>
                <label>Años de vida: </label>
                <input name='añosVida' value={input.añosVida} onChange={handleChange}></input>
                <button type='submit'>Create</button>
            </form>
        </div>
    )
}