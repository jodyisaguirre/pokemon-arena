import {TYPES} from "./actions";

export const initialState ={
    pokemon: [],
    roster:[],
    arena:[]
}




export default function reducer(state={}, action) {
    switch (action.type) {
        case TYPES.FETCH_POKEMON:
            return {
                ...state,
                pokemon: action.payload
            }
        case TYPES.SET_ROSTER:
            return {
                ...state,
                roster: action.payload
            }
        case TYPES.ADD_TO_ROSTER:
            return {
                ...state,
                roster: [...state.roster,action.payload]
            }
        case TYPES.REMOVE_FROM_ROSTER:
            return {
                ...state,
                roster: state.roster.filter(pokemon => pokemon.name !== action.payload.name)
            }
        default:
            return state
    }
}