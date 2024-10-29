import { Text, TouchableOpacity, View } from "react-native";
import searchSheetStyle from "./searchBottomSheetstyle";
import Entypo from '@expo/vector-icons/Entypo';
import { Link, router } from "expo-router";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

function containsObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i] === obj) {
            return true;
        }
    }

    return false;
}

export default function SearchBox({street, suburb, outage, searchSelect, recentSearch, setRecentSearch}){

    const _storeData = async (item) => {
        try {
            const jsonValue = JSON.stringify(item);
            await AsyncStorage.setItem('RecentSearch', jsonValue);
        } catch (error) {
            console.log(error)
        }
        };


    return(
        <TouchableOpacity style={searchSheetStyle.recentSearchBox} onPress={() => {
            router.navigate("/mapview")
            searchSelect(outage);
            if(!containsObject(outage, recentSearch)){
                const updatedSearch = [outage, ...recentSearch || {}].slice(0,10);
                setRecentSearch(updatedSearch); 
                _storeData(updatedSearch); 
            }            
        }}>
            <View style={{display:"flex", alignItems:"center"}}>
                <Entypo name="location-pin" size={outage.distance ? 23:35} color="black" style={{paddingTop:3}}/>
                {outage.distance ? <Text style={{fontSize:10, fontWeight:"200"}}>{outage.distance}</Text>: <></>}
            </View>
            <View style={{marginLeft:18, width:"80%"}}>
                <Text style={{fontSize:20, fontWeight:"500"}}>{street.trim().charAt(0).toUpperCase() + street.trim().slice(1).toLowerCase()}</Text>
                <Text style={{fontSize:10, fontWeight:"300"}}>{suburb}</Text>
            </View>
        </TouchableOpacity>
    )
}