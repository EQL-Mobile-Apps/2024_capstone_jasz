import * as Location from 'expo-location'

export const GET_CURRENT_LOCATION = "GET_CURRENT_LOCATION"
export const REMOVE_CURRENT_LOCATION = "REMOVE_CURRENT_LOCATION"

export const getCurrentLocaiton = () => { 
    try{
        return async dispatch => { 
            let {status} = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted"){
                console.log("Please grant location permissions")
                return
            }

            let currentLocation = await Location.getCurrentPositionAsync({});
            if (currentLocation) { 
                dispatch({
                    type: GET_CURRENT_LOCATION,
                    payload: currentLocation
                });
            }else{ 
                console.error("Unable to fetch data")
            }
        }
    }catch(error){
        console.log(error)
    }
}


export const removeCurrentLocaiton = () => { 
    try{
        return async dispatch => { 

        dispatch({
            type: REMOVE_CURRENT_LOCATION,
            payload:[],
        });

        }
    }catch(error){
        console.log(error)
    }
}

