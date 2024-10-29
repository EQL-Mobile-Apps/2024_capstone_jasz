import { Pressable, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import AntDesign from '@expo/vector-icons/AntDesign';
import menuStyle from '../menuStyle';
import settingStyle from './settingStyle';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentLocaiton, removeCurrentLocaiton } from '../../../context/actions/locationAction';

export default function SettingMain(){
    const {currentLocation} = useSelector((state) => state.locationReducer)
    const [isEnabledLocation, setIsEnabledLocation] = useState(currentLocation.length != 0? true : false);
    const toggleSwitchLocation = () => 
        {setIsEnabledLocation(previousState => !previousState);
            if (!isEnabledLocation){
                dispatch(getCurrentLocaiton())
               
            } else{
                dispatch(removeCurrentLocaiton())
                
            }
                console.log("augh", isEnabledLocation)
                console.log("augh", currentLocation)

        }

    const [isEnabledNotifcation, setIsEnabledNotifcation] = useState(false);
    const toggleSwitchNotifcation = () => setIsEnabledNotifcation(previousState => !previousState);
   

    const dispatch = useDispatch();
    return (
        <SafeAreaView style={{flex:1, backgroundColor:"white"}}>
            <View style={{margin:20}}>
                <TouchableOpacity style={menuStyle.menu_item_back} onPress={() => {router.back()}}>
                    <AntDesign name="left" size={35} color="black" />
                </TouchableOpacity>
                <Text style={menuStyle.menu_item_heading}>Setting</Text>
                <Text style={settingStyle.setting_heading}>Manage sharing location</Text>
                <Text style={settingStyle.setting_description}>We prioritise user privacy by not disclosing or selling location data. Location information is solely utilised to enhance app functionality and maximise user experience </Text>
                <View style={settingStyle.setting_hr}/>
                <View style={settingStyle.setting_buttonContainer}>

                    <Text style={settingStyle.setting_buttonText}>Location Sharing</Text>
                    <Switch
                        trackColor={{false: 'black', true: '#2389C8'}}
                        thumbColor={isEnabledLocation ? 'white' : 'white'}
                        ios_backgroundColor="black"
                        onValueChange={toggleSwitchLocation}
                        value={isEnabledLocation}
                    />
                </View>


                <View style={settingStyle.setting_buttonContainer}>
                    <Text style={settingStyle.setting_buttonText}>Notification</Text>
                    <Switch
                        trackColor={{false: 'black', true: '#2389C8'}}
                        thumbColor={isEnabledNotifcation ? 'white' : 'white'}
                        ios_backgroundColor="black"
                        onValueChange={toggleSwitchNotifcation}
                        value={isEnabledNotifcation}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}