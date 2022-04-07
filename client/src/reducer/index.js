
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
            const allDogs = state.dogs;
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
            const filtro = action.payload === 'ALL' ? Dogs : Dogs.filter(o => o.temperamento && o.temperamento.includes(action.payload))
            return {
                ...state,
                dogsFilter: filtro
            }
        case 'FILTER_AZ':
            const dogsAZ = state.dogs;
            const filtroAZ = action.payload === 'a_z' ? dogsAZ.sort(function (a, b) {
                if (a.raza > b.raza) return 1
                if (b.raza > a.raza) return -1
                return 0
            }) : dogsAZ.reverse()
            return {
                ...state,
                dogsFilter: filtroAZ
            }
        case 'FILTER_PESO':
            const dogsPeso = state.dogs;
            const filtroPeso = action.payload === 'pesomin' ? dogsPeso.sort(function (a, b) {
                if (parseInt(a.peso.slice(0, 2)) > parseInt(b.peso.slice(0, 2))) return 1
                if (parseInt(b.peso.slice(0, 2)) > parseInt(a.peso.slice(0, 2))) return -1
                return 0
            }) : dogsPeso.sort(function (a, b){
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