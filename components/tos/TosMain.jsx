import { Button, StyleSheet, Text, TouchableOpacity, View, BackHandler } from 'react-native'
import React, { useState } from 'react'
import TosScrollView from './TosScrollView'
import tosStyle from './tosStyle.js'
import MaskedView from '@react-native-masked-view/masked-view';
import {LinearGradient} from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Link } from 'expo-router';


export default function TosMain(){
    const [endScrolling, setEndScrolling] = useState(true)
    const _storeData = async () => {
        try {
            await AsyncStorage.setItem(
            'TOS',
            "TRUE",
            );
        } catch (error) {
            console.log(error)
        }
        };
    return (
        <View style={tosStyle.tos_container}>
            <View style={tosStyle.tos_header}>

                <Text style={tosStyle.tos_heading}>Term of service</Text>
                <Text style={tosStyle.tos_subHeading}>Last update January 21</Text>
            </View>
            <MaskedView
                style={{ flex: 1 }}
                maskElement={<LinearGradient style={{ flex: 1}} colors={endScrolling ? ['white', 'white','white', 'white','transparent'] : ['white','white']} />}
            >
                <TosScrollView setEndScrolling={setEndScrolling}/>
            </MaskedView>


            <View style={tosStyle.tos_footer}>
                <Link href="/mapview" asChild>
                    <TouchableOpacity disabled={endScrolling} 
                        onPress={() => { 
                            _storeData();
                        }}>
                        <View style={[tosStyle.tos_button, endScrolling ? {backgroundColor:"rgba(35,137,200,0.5)"} : {backgroundColor:"rgba(35,137,200,1)"}]}>
                            <Text style={[tosStyle.tos_buttonText, {color: "white"}]}>Accept</Text>
                        </View>
                    </TouchableOpacity>
                </Link>

                <TouchableOpacity style={[tosStyle.tos_button, {borderColor:"#2389C8", borderWidth:4}]} 
                    onPress={()=> {BackHandler.exitApp()}}>
                    <Text style={[tosStyle.tos_buttonText, {color: "#044770"}]}>Decline</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}