
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
        case 'SEARCH_DOG':
            return{
                ...state,
                dogsFilter: action.payload
            }
    
        case 'FILTER_DB_API':
            const allDogs = state.dogsFilter;
            if (action.payload === 'api') {
                const filtro = allDogs.filter(o => !o.createdAt)
                return {
                    ...state,
                    dogsFilter: filtro
                }
            }
            else if (action.payload === 'db') {
                const filtro = allDogs.filter(o => o.createdAt)
                return {
                    ...state,
                    dogsFilter: filtro
                }
            } else return {
                ...state,
                dogsFilter: state.dogs
            }
        case 'FILTER_TEMP':
            const Dogs = state.dogs;
            const filtro = action.payload === 'ALL' ? Dogs : Dogs.filter(o => o.temperaments && o.temperaments.includes(action.payload))
            return {
                ...state,
                dogsFilter: filtro
            }
        case 'FILTER_AZ':
            const dogsAZ = state.dogsFilter;
            let filtroAz = []
            if(action.payload === 'ordenar') return {...state, dogsFilter: dogsAZ};
            if (action.payload === 'a_z') {
                filtroAz = [...dogsAZ].sort(function (a, b) {
                    if (a.raza > b.raza) return 1
                    if (b.raza > a.raza) return -1
                    return 0
                }
                )
            } else {
                filtroAz = [...dogsAZ].sort(function (a, b) {
                    if (a.raza > b.raza) return -1
                    if (b.raza > a.raza) return 1
                    return 0

                }
                ) 
            }
            return {
                ...state,
                dogsFilter: filtroAz
            }
        case 'FILTER_PESO':
            const dogsPeso = state.dogsFilter;
            if(action.payload === 'peso') return {
                ...state,
                dogsFilter: dogsPeso
            }
            const filtroPeso = action.payload === 'pesomin' ? [...dogsPeso].sort(function (a, b) {
                if (parseInt(a.peso.slice(0, 2)) > parseInt(b.peso.slice(0, 2))) return 1
                if (parseInt(b.peso.slice(0, 2)) > parseInt(a.peso.slice(0, 2))) return -1
                return 0
            }) : [...dogsPeso].sort(function (a, b) {
                if (parseInt(a.peso.slice(0, 2)) > parseInt(b.peso.slice(0, 2))) return -1
                if (parseInt(b.peso.slice(0, 2)) > parseInt(a.peso.slice(0, 2))) return 1
                return 0
            })
            return {
                ...state,
                dogsFilter: filtroPeso
            }
        default:
            return state;
    }
}

export default rootReducer;