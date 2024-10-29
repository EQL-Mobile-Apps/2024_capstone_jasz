import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import listViewStyle from './listViewStyle'
import { useSelector } from 'react-redux'
import { AntDesign } from '@expo/vector-icons';
import { Link, router } from 'expo-router'


export default function ListViewOutageCard({outage, street}){
    return(
        <View style={{
            borderColor: "#C6C6C6", 
            borderWidth:1, 
            borderRadius:15, 
            marginVertical:4,
            marginHorizontal:17,
            flexDirection:"row",
            justifyContent:"space-between",
            alignItems:"center",
            paddingHorizontal:10,
            paddingVertical:8
        }}>
            <View style={{width:"60%", 
            flexDirection:"row"}}>
                <View style={{
                    width:60,
                    height:60,
                    backgroundColor: outage.properties.TYPE === "PLANNED" ? "#D19E39" : "#E78C8C",
                    display:"flex",
                    justifyContent:"center",
                    alignItems:"center",
                    marginRight:9,
                    borderRadius:11,
                    paddingLeft:1
                }}>
                    {outage.properties.TYPE === "PLANNED" ? 
                        <AntDesign name="tool" size={35} color="white" /> 
                        : <AntDesign name="exclamationcircleo" size={35} color="white" />}
                </View>
                <View>
                    <Text style={{fontSize:11, fontWeight:'bold', color:"#333333"}}>{outage.properties.TYPE.charAt(0).toUpperCase() + outage.properties.TYPE.slice(1).toLowerCase()} Outage</Text>
                    <Text style={{fontSize:9, color:"#555555"}}>{street.trim().charAt(0).toUpperCase() + street.trim().slice(1).toLowerCase()}</Text>
                    <Text style={{fontSize:9, color:"#555555"}}><Text style={{fontWeight:'bold'}}>Reason:</Text> {outage.properties.REASON}</Text>
                    <Text style={{fontSize:9, color:"#555555"}}><Text style={{fontWeight:'bold'}}>Est. Power on:</Text> {outage.properties.EST_FIX_TIME}</Text>
                </View>
            </View>
           
            <TouchableOpacity onPress={() => {
                router.navigate("/mapview");
                router.setParams({mapID: outage.properties.EVENT_ID});
                router.setParams({showTabBar: false });
                
            }}>
                <AntDesign name="right" size={15} color="black" />
            </TouchableOpacity>
        </View>
    )
}