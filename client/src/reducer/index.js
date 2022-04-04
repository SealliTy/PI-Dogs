
const initialState = {
    dogsFilter: [],
    dogs: [],
    dog: {},
    temperaments: []
}


function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'DOGS':
            return {
                ...state,
                dogsFilter: action.payload,
                dogs: action.payload
            }
        case 'DOG_ID':
            return {
                ...state,
                dog: action.payload
            }
        case 'DOG_CREATE':
            return {
                ...state,
                dogs: action.payload
            }
        case 'TEMPERAMENT':
            return {
                ...state,
                temperaments: action.payload
            }
        case 'FILTER_DB_API':
            const allDogs = state.dogs
            if (action.payload === 'api') {
                const filtro = allDogs.filter(o => !o.createdAt)
                return {
                    ...state,
                    dogsFilter: filtro
                }
            }
            else if(action.payload === 'db'){
                const filtro = allDogs.filter(o => o.createdAt) 
                return {
                    ...state,
                    dogsFilter: filtro
                }
            } else return {
                ...state,
                dogsFilter: state.dogs
            }
        default:
            return state;
    }
}

export default rootReducer;