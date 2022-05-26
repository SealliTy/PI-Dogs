import React from 'react';
import style from './Paginado.module.css';

export default function Paginado({dogsPerPage, DogsCount, paginado}){
    let pages = []

    for (let i= 0; i <= Math.ceil(DogsCount/dogsPerPage); i++) {
        pages.push(i)
    }
    pages.shift()
    return(
        <nav className={style.nav}>
            <ul className={style.paginado_flex}>
                {
                    pages && pages.map(n =>(
                        <li key={n} className={style.paginado_item}>
                            <button onClick={() => paginado(n)}>{n}</button>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}