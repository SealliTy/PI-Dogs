import React, { useState } from 'react';
import reset from '../img/reset.png';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterDogsApiDb, getDogs, getTemperaments, filterTemp, filterPeso, filterAZ } from '../actions/index';
import { Link } from 'react-router-dom';
import Card from './card';
import Paginado from './Paginado';
import style from './HomeDogs.module.css';



export default function HomeDogs() {
    const dispatch = useDispatch()
    const Dogs = useSelector(state => state.dogsFilter)
    const allTemperaments = useSelector(state => state.temperaments)
    const [input] = React.useState({
        raza: '',
        temperaments: '',
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

    // function handleClick(e) {
    //     e.preventDefault();
    //     dispatch(getDogs());
    //     dispatch(getTemperaments(input));
    // }

    // const handleChange = (e) => {
    //     setInput({
    //         ...input,
    //         [e.target.name]: e.target.value
    //     })
    // }

    const handlefilterDogs = (o) => {
        dispatch(filterDogsApiDb(o.target.value))
    }

    const handlefilterTemp = (o) => {
        dispatch(filterTemp(o.target.value))
    }

    const handlefilterPeso = (o) => {
        dispatch(filterPeso(o.target.value))
        setPage(1)
    }

    const handlefilterAZ = (o) => {
        dispatch(filterAZ(o.target.value))
        setPage(1)
    }

    const resetPage = () => {
        dispatch(getDogs())
        dispatch(getTemperaments())
    }


    return (
        <div className={style.body}>
            <div>
                <ul className={style.navegacion}>
                    <li></li>
                    <li>
                        <Link to='/DogCreate' style={{ textDecoration: 'none' }}>
                            <span className={style.link}>Crear dog</span>
                        </Link>
                    </li>
                    <li><input placeholder='Search...' className={style.search} type='text' name='search'></input></li>
                    <li onClick={o => resetPage(o)}><img src={reset} alt='reset' className={style.reset}></img></li>
                </ul>
            </div>


            <div className={style.filtros}>
                <select onChange={o => handlefilterPeso(o)}>
                    <option value='peso'>Peso</option>
                    <option value='pesomin'>Peso Minimo</option>
                    <option value='pesomax'>Peso Maximo</option>
                </select>
                <select onChange={o => handlefilterAZ(o)}>
                    <option value='ordenar'>Ordenar</option>
                    <option value='a_z'>Ordenar A-Z</option>
                    <option value='z_a'>Ordenar Z-A</option>
                </select>
                <select onChange={o => handlefilterDogs(o)}>
                    <option value='api_db'>Todas</option>
                    <option value='db'>Creadas</option>
                    <option value='api'>Existente</option>
                </select>
                <select name='temperamento' value={input.temperaments} onChange={o => handlefilterTemp(o)} >
                    <option value='ALL'>Temperamentos</option>
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
                            <div className={style.cards_dogs} key={o.id}>
                                <Link to={`/HomeDogs/${o.id}`} style={{ textDecoration: 'none' }}>

                                    <Card
                                        raza={o.raza}
                                        img={o.img}
                                        peso={o.peso}
                                        temperaments={o.temperaments} />

                                </Link>
                            </div>
                        )
                    })
                }
            </div>

        </div>
    )
}