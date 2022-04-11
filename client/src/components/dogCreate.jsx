import React from 'react';
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTemperaments, dogCreate } from '../actions';
import style from './DogCreate.module.css';



export default function DogCreate() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const allTemperaments = useSelector(state => state.temperaments)
    const [errors, setErrors] = React.useState({});
    const [dog, setDog] = React.useState({
        raza: '',
        temperaments: [],
        img: '',
        peso: '',
        altura: '',
        añosVida: ''
    })

    useEffect(() => {
        dispatch(getTemperaments())
    }, [dispatch])

    const validate = (dog) => {
        let errors = {};
        if (dog.raza === '') {
            errors.raza = 'El campo raza es requerido!'
        } else if (!/^[a-zA-Z\s]*$/.test(dog.raza)) {
            errors.raza = 'Solo acepta letras'
        }
        else if (dog.raza.length < 3) {
            errors.raza = 'Debe de tener mas de 3 letras'
        }
        if (dog.peso === '') {
            errors.peso = 'Se requiere su peso'
        }
        if (dog.altura === '') {
            errors.altura = 'Se requiere su altura'
        }
        if (dog.añosVida === '') {
            errors.añosVida = 'Se requiere sus años de vida'
        }
        // if (dog.temperaments === '') {
        //     errors.temperaments = 'Se requiere minimo 1 temperamento'
        // }

        return errors;
    }
    console.log(errors)

    const handleChange = (o) => {
        setDog({
            ...dog,
            [o.target.name]: o.target.value
        })
        setErrors(validate({
            ...dog,
            [o.target.name]: o.target.value
        }));
    }

    const handleClick = (o) => {
        o.preventDefault();
        if (dog.img === '') {
            dog.img = 'https://img.freepik.com/vector-gratis/lindo-perro-sacando-lengua-ilustracion-icono-dibujos-animados_138676-2709.jpg?t=st=1649657053~exp=1649657653~hmac=2ab88b425177ffd4d8190a747c8abf0ca71f4968b7cdef93ecbf2eab61cecae6&w=740'
            setDog({
                ...dog,
                img: '' 
            })
        }
        if (Object.keys(validate(dog)).length) {
            setErrors(validate({
                ...dog,
                [o.target.name]: o.target.value
            }));
        } else {
            dispatch(dogCreate(dog));
            alert('Perro creado con exito!')
            navigate('/HomeDogs')
        }
    }

    const handleSelect = (o) => {
        if (!dog.temperaments.includes(o.target.value))
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
                <div>
                    <input className={style.input} placeholder='Raza' type='text' name='raza' value={dog.raza} onChange={handleChange}></input>
                    {
                        errors.raza &&
                        <p>{errors.raza}</p>
                    }
                </div>
                <div>
                    <input className={style.input} placeholder='Imagen del cachorro' name='img' value={dog.img} onChange={handleChange}></input>
                    {

                    }
                </div>
                <div>
                    <input className={style.input} placeholder='Peso Kgs' type='number' name='peso' value={dog.peso} min={1} max={99} onChange={handleChange}></input>
                    {
                        errors.peso &&
                        <p>{errors.peso}</p>
                    }
                </div>
                <div>
                    <input className={style.input} placeholder='Altura Cms' type='number' name='altura' value={dog.altura} min={1} max={99} onChange={handleChange}></input>
                    {
                        errors.altura &&
                        <p>{errors.altura}</p>
                    }
                </div>
                <div>
                    <input className={style.input} placeholder='Años del cachorro' type='number' name='añosVida' value={dog.añosVida} min={1} max={99} onChange={handleChange}></input>
                    {
                        errors.añosVida &&
                        <p>{errors.añosVida}</p>
                    }
                </div>
                <div className={style.contain_temp}>
                    <p className={style.temperamentos}>Temperamentos:</p>
                    <select className={style.temperaments} onChange={(o) => handleSelect(o)}>
                        {
                            allTemperaments.map(o => {
                                return <option className={style.temperament} key={o.id} value={o.name}>{o.name}</option>
                            })
                        }
                    </select>
                </div>
                <ul>
                    {dog.temperaments.map(o => {
                        return (
                            <button className={style.ul} key={dog.temperaments.indexOf(o)} onClick={() => handleDelete(o)}>{o}
                            </button>
                        )
                    })}
                </ul>
                <button className={style.create_button} type='submit'>Create</button>
            </form>
        </div>
    )
}