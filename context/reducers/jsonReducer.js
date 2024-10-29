import { GET_CURRENT_PLANNED, GET_CURRENT_UNPLANNED, GET_FUTURE_PLANNED, GET_SERVICE_AREA } from "../actions/jsonAction"

const initialState = { 
    currentPlanned: [],
    currentUnPlanned: [],
    futurePlanned: [],
    serviceArea: [],
}

export const jsonReducer = (state = initialState, action) => { 
    switch(action.type){
        case GET_CURRENT_PLANNED:
            return {...state, currentPlanned: action.payload}
        case GET_CURRENT_UNPLANNED:
            return {...state, currentUnPlanned: action.payload}    
        case GET_FUTURE_PLANNED:
            return {...state, futurePlanned: action.payload} 
        case GET_SERVICE_AREA:
            return {...state, serviceArea: action.payload}
        default:
            return state;
    }
}