import { Image, StyleSheet, Text, View} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import { Redirect } from 'expo-router'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentPlanned, getCurrentUnPlanned, getFuturePlanned, getServiceArea } from '../context/actions/jsonAction'
import Tos from './tos'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as Location from 'expo-location'
import { getCurrentLocaiton } from '../context/actions/locationAction'


export default function App(){
    const {currentPlanned, currentUnPlanned,serviceArea, futurePlanned} = useSelector(state => state.jsonReducer)
    const [isLoading, setIsLoading] = useState(true)
    const dispatch = useDispatch();
    const [TOS_READ, setTOS_READ] = useState("FALSE")

    const _retrieveData = async () => {
        try {
            setTOS_READ(await AsyncStorage.getItem('TOS'));
        } catch (error) {
            setTOS_READ(false);
        }
      };

    useEffect(() => { 
        dispatch(getCurrentPlanned());
        dispatch(getCurrentUnPlanned());
        dispatch(getServiceArea());
        dispatch(getFuturePlanned());
        dispatch(getCurrentLocaiton());
        _retrieveData();
        setIsLoading(false)
    }, []);

    if(isLoading){
        return (
            <SafeAreaView>
                <View style={{display:"flex", justifyContent:'center', alignItems:'center', height:"100%"}}>
                    <Image source={require('../assets/Energex-logo.png')}/>
                </View>
            </SafeAreaView>
    )}else{
        if(TOS_READ === "TRUE"){
            return(<Redirect href={"/mapview"}/>)
        }else{
            return(
                <SafeAreaView>
                    <Tos/>
                </SafeAreaView>
        )}
    }
}
