import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import AntDesign from '@expo/vector-icons/AntDesign';
import menuStyle from '../menuStyle';

export default function LinkMain(){
    return (
        <SafeAreaView style={{flex:1, backgroundColor:"white"}}>
            <View style={{margin:20}}>
            <TouchableOpacity style={menuStyle.menu_item_back} onPress={() => {router.back()}}>
                    <AntDesign name="left" size={35} color="black" />
                </TouchableOpacity>
                <Text style={menuStyle.menu_item_heading}>Links</Text>
            </View>
        </SafeAreaView>
    )
}