import React from 'react';
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTemperaments, dogCreate } from '../actions';
import style from './DogCreate.module.css';
import {Link} from 'react-router-dom'



export default function DogCreate() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const allTemperaments = useSelector(state => state.temperaments)
    const [errors, setErrors] = React.useState({});
    const [dog, setDog] = React.useState({
        raza: '',
        temperaments: [],
        img: '',
        pesomin: '',
        pesomax:'',
        alturamin: '',
        alturamax: '',
        añosVidamin: '',
        añosVidamax: ''
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
        if (dog.pesomin === '' || dog.pesomax === '') {
            errors.peso = 'Se requiere su peso'
        }
        if (dog.alturamin === '' || dog.alturamax === '') {
            errors.altura = 'Se requiere su altura'
        }
        if (dog.añosVidamin === '' || dog.añosVidamax === '') {
            errors.añosVida = 'Se requiere sus años de vida'
        }
        if (dog.temperaments.length === 0) {
            errors.temperaments = 'Se requiere minimo 1 temperamento'
        }

        return errors;
    }

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
            <div className={style.link}>
{/* ---------------------------------------INICIA BOTON BACK----------------------------- */}
            <Link to='/HomeDogs' style={{ textDecoration: 'none' }}>
                    <span className={style.back}>Back</span>
                </Link>
                </div>
{/* ---------------------------------------INICIA FORMULARIO Y TITULO----------------------------- */}
            <form className={style.form} onSubmit={(o) => handleClick(o)}>
                <h2 className={style.h2}>Dog Create</h2>
{/* ---------------------------------------INICIA RAZA----------------------------- */}
                <div className={style.input_raza_img} >
                    <input className={style.input} placeholder='Raza' type='text' name='raza' value={dog.raza} onChange={handleChange}></input>
                    {
                        errors.raza &&
                        <p className={style.p} >{errors.raza}</p>
                    }
                </div>
{/* ---------------------------------------INICIA IMG----------------------------- */}
                <div className={style.input_raza_img} >
                    <input className={style.input} placeholder='Imagen del cachorro' name='img' value={dog.img} onChange={handleChange}></input>
                    {

                    }
                </div>
{/* ---------------------------------------INICIA PESO----------------------------- */}
                <div className={style.contain_peso}>
                <div className={style.peso}>
                    <input className={style.input} placeholder='Peso min Kgs' type='number' name='pesomin' value={dog.pesomin} min={1} max={99} onChange={handleChange}></input>
                    {
                        errors.peso &&
                        <p className={style.p} >{errors.peso}</p>
                    }
                </div>
                <div className={style.peso} >
                    <input className={style.input} placeholder='Peso max Kgs' type='number' name='pesomax' value={dog.pesomax} min={1} max={99} onChange={handleChange}></input>
                    {
                        errors.peso &&
                        <p className={style.p} >{errors.peso}</p>
                    }
                </div>
                </div>
{/* ---------------------------------------INICIA ALTURA----------------------------- */}
                <div className={style.contain_altura}>
                <div className={style.altura} >
                    <input className={style.input} placeholder='Altura min Cms' type='number' name='alturamin' value={dog.alturamin} min={1} max={110} onChange={handleChange}></input>
                    {
                        errors.altura &&
                        <p className={style.p} >{errors.altura}</p>
                    }
                </div>
                <div className={style.altura} >
                    <input className={style.input} placeholder='Altura max Cms' type='number' name='alturamax' value={dog.alturamax} min={1} max={110} onChange={handleChange}></input>
                    {
                        errors.altura &&
                        <p className={style.p} >{errors.altura}</p>
                    }
                </div>
                </div>
{/* ---------------------------------------INICIA AÑOS----------------------------- */}
                <div className={style.contain_años}>
                <div className={style.años} >
                    <input className={style.input} placeholder='Años min' type='number' name='añosVidamin' value={dog.añosVidamin} min={1} max={20} onChange={handleChange}></input>
                    {
                        errors.añosVida &&
                        <p className={style.p} >{errors.añosVida}</p>
                    }
                </div>
                <div className={style.años} >
                    <input className={style.input} placeholder='Años max' type='number' name='añosVidamax' value={dog.añosVidamax} min={1} max={20} onChange={handleChange}></input>
                    {
                        errors.añosVida &&
                        <p className={style.p} >{errors.añosVida}</p>
                    }
                </div>
                </div>
{/* ---------------------------------------INICIA TEMPERAMENTOS----------------------------- */}
                <div className={style.contain_temp}>
                    {/* <p className={style.temperamentos}>Temperamentos:</p> */}
                    <select className={style.temperaments} onChange={(o) => handleSelect(o)}>
                        <option>Temperaments:</option>
                        {
                            allTemperaments.map(o => {
                                return <option key={o.id} value={o.name}>{o.name}</option>
                            })
                        }
                    </select>
                        {
                            errors.temperaments &&
                            <p className={style.p} >{errors.temperaments}</p>
                        }
                </div>
{/* ---------------------------------------INICIA TEMPERAMENTOS BORRAR----------------------------- */}
                <ul>
                    {dog.temperaments.map(o => {
                        return (
                            <button className={style.button_temp} key={dog.temperaments.indexOf(o)} onClick={() => handleDelete(o)}>{o}
                            </button>
                        )
                    })}
                </ul>
{/* ---------------------------------------INICIA BOTON CREAR----------------------------- */}
                <button className={style.create_button} type='submit'>Create</button>
            </form>
        </div>
    )
}