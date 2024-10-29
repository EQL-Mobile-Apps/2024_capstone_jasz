import { GET_CURRENT_LOCATION, REMOVE_CURRENT_LOCATION } from "../actions/locationAction";


const initialState = { 
    currentLocation : [],
    
}


export const locationReducer = (state = initialState, action) => { 
    switch(action.type){
        case GET_CURRENT_LOCATION:
            return {...state, currentLocation: action.payload}

        case REMOVE_CURRENT_LOCATION:
            return {...state, currentLocation:action.payload}

        default:
            return state;
    }
}