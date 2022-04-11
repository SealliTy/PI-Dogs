import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { SearchDog } from '../actions/index';
import style from '../components/SearchBar.module.css';

export default function SearchBar() {
  const [state, setState] = useState('');
  const dispatch = useDispatch();

    const handleChange = (o) => {
      o.preventDefault();
      setState(o.target.value);
    };

    const handleSubmit = (o) => {
    o.preventDefault();
    if (state !== '') {
      dispatch(SearchDog(state));
      setState('');
    }
  };

  return (
    <form onSubmit={o => handleSubmit(o)}>
      <input
        className={style.search}
        type="text"
        placeholder="Busca por Raza..."
        value={state}
        onChange={o => handleChange(o)}
      />

      <input type='submit' value='' />
    </form>
  );
}