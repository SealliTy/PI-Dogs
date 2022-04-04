import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterDogsApiDb, getDogs, getTemperaments } from '../actions/index';
import { Link } from 'react-router-dom';
import Card from './card';
import Paginado from './Paginado';
import style from './HomeDogs.module.css';

export default function HomeDogs() {
    const dispatch = useDispatch()
    const Dogs = useSelector(state => state.dogsFilter)
    const allTemperaments = useSelector(state => state.temperaments)
    const [input, setInput] = React.useState({
        raza: '',
        temperamento: '',
        peso: ''
    })
    const [currentPage, setPage] = useState(1)
    const dogsPerPage = 8;
    const indexOfLastDog = currentPage * dogsPerPage
    const indexOffirstDog = indexOfLastDog - dogsPerPage
    const currentDogs = Dogs.slice(indexOffirstDog, indexOfLastDog)
    const paginado = (pages) => {
        setPage(pages)
    }

    useEffect(() => {
        dispatch(getDogs())
        dispatch(getTemperaments())
    }, [dispatch])

    function handleClick(e) {
        e.preventDefault();
        dispatch(getDogs());
        dispatch(getTemperaments(input));
    }

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const handlefilterDogs = (o) => {
        dispatch(filterDogsApiDb(o.target.value))
    }




    return (
        <body>
            <h1 className={style.title}>Dogs</h1>
            <div>
                <Link to='/DogCreate' style={{ textDecoration: 'none' }}>
                    <span className={style.dog_create}>Crear dog</span>
                </Link>
            </div>
            <div className={style.search}>
                <select>
                    <option value='a_z'>Ordenar A-Z</option>
                    <option value='z_a'>Ordenar Z-A</option>
                    <option value='peso'>Peso</option>
                </select>
                <select onChange={o => handlefilterDogs(o)}>
                    <option value='api_db'>Todas</option>
                    <option value='db'>Creadas</option>
                    <option value='api'>Existente</option>
                </select>
                <label>Temperamentos: </label>
                <select name='temperamento' value={input.temperamento} onChange={handleChange} onSubmit={handleClick}>
                    <option value='ALL'>Todos</option>
                    {
                        allTemperaments.map(o => {
                            return <option key={o.id} value={o.name}>{o.name}</option>
                        })
                    }
                </select>
            </div>
            <div className={style.paginado}>
                <Paginado
                    dogsPerPage={dogsPerPage}
                    DogsCount={Dogs.length}
                    paginado={paginado}
                />
            </div>
            <div className={style.card_container}>
                {
                    currentDogs && currentDogs.map(o => {
                        return (
                            <div className={style.card}>
                                <Link to={`/HomeDogs/${o.id}`} key={o.id} style={{ textDecoration: 'none' }}>

                                    <Card
                                        raza={o.raza}
                                        img={o.img}
                                        peso={o.peso}
                                        temperamento={o.temperamento} />

                                </Link>
                            </div>
                        )
                    })
                }
            </div>

        </body>
    )
}