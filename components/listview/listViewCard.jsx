import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import listViewStyle from './listViewStyle'
import { useSelector } from 'react-redux'
import { AntDesign } from '@expo/vector-icons';
import ListViewOutageCard from './listViewOutageCard'

export default function ListViewCard({outage, outageSub}){
    const [expand, setExpand] = useState(false)
    
    let totalStreets = outageSub.reduce((total, outage) => {
        return total + outage.properties.STREETS.split(',').length;
    }, 0);

    return(
        <View style={listViewStyle.LVStyle_card}>
            <View style={listViewStyle.LVStyle_card_container}>
                <View style={{width:"90%"}}>
                    <Text style={{fontSize:16, fontWeight:600}}>{outage}</Text>
                    <Text style={{color:"#555555", fontSize:10}}>There is <Text style={{color:"#007BFF"}}>{totalStreets}
                        </Text> outage(s) happening in <Text style={{fontWeight:"500"}}>{outage}</Text>
                    </Text>
                </View>
                <Pressable onPress={() => {
                    setExpand(!expand)
                }}>
                    {expand ? <AntDesign name="close" size={15} color="black" /> : <AntDesign name="down" size={15} color="black" />}
                </Pressable>
            </View>
            {expand ?
                <View style={{marginBottom:10}}>
                    {outageSub.map((outageLocation) => { 
                        return outageLocation.properties.STREETS.split(',').map((street, index) => {
                            return (<ListViewOutageCard outage={outageLocation} street={street} key={index}/>)
                        })
                    })}
                </View>
            :
                <></>
            }
        </View>
    )
}