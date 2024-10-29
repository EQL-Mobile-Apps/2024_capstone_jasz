import { currentPlanned, currentUnplanned, futurePlanned, serviceArea } from "../../constants/constant";

export const GET_CURRENT_PLANNED = "GET_CURRENT_PLANNED";
export const GET_FUTURE_PLANNED = "GET_FUTURE_PLANNED";
export const GET_CURRENT_UNPLANNED = "GET_CURRENT_UNPLANNED";
export const GET_SERVICE_AREA = "GET_SERVICE_AREA";

export const getCurrentPlanned =  () => { 
    try{
        return async dispatch => { 
            const result = await fetch (currentPlanned);
            const json = await result.json();
            if (json) { 
                dispatch({
                    type: GET_CURRENT_PLANNED,
                    payload: json
                });
            }else{ 
                console.error("Unable to fetch data")
            }
        }
    }catch (error){
        console.log(error)
    }
}


export const getFuturePlanned =  () => { 
    try{
        return async dispatch => { 
            const result = await fetch (futurePlanned);
            const json = await result.json();
            if (json) { 
                dispatch({
                    type: GET_FUTURE_PLANNED,
                    payload: json
                });
            }else{ 
                console.error("Unable to fetch data")
            }
        }
    }catch (error){
        console.log(error)
    }
}

export const getCurrentUnPlanned =  () => { 
    try{
        return async dispatch => { 
            const result = await fetch (currentUnplanned);
            const json = await result.json();
            if (json) { 
                dispatch({
                    type: GET_CURRENT_UNPLANNED,
                    payload: json
                });
            }else{ 
                console.error("Unable to fetch data")
            }
        }
    }catch (error){
        console.log(error)
    }
}


export const getServiceArea =  () => { 
    try{
        return async dispatch => { 
            const result = await fetch (serviceArea);
            const json = await result.json();
            if (json) { 
                dispatch({
                    type: GET_SERVICE_AREA,
                    payload: json
                });
            }else{ 
                console.error("Unable to fetch data")
            }
        }
    }catch (error){
        console.log(error)
    }
}
