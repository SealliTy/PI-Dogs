import axios from 'axios';

export function getDogs(){
    return async function(dispatch){
        const json = await axios.get('http://localhost:3001/dogs')
        return dispatch({
            type: 'DOGS',
            payload: json.data
        })
    }
}

export function getTemperaments(){
    return async function(dispatch){
        const json = await axios.get('http://localhost:3001/temperament')
        return dispatch({
            type: 'TEMPERAMENT',
            payload: json.data
        })
    }
}

export function getDogId(id){
    return async function(dispatch){
        const json = await axios.get(`http://localhost:3001/dogs/${id}`)
        return dispatch({
            type: 'DOG_ID',
            payload: json.data
        })
    }
}

export function dogCreate(dog){
    return async function(dispatch){
        const json = await axios.post('http://localhost:3001/dog', dog)
        return dispatch({
            type: 'DOG_CREATE',
            payload: json
        })
    }
}

export function filterDogsApiDb(payload){
    return {
        type: 'FILTER_DB_API',
        payload: payload
    }
}

export function filterTemp(payload){
    return {
        type: 'FILTER_TEMP',
        payload: payload
    }
}
