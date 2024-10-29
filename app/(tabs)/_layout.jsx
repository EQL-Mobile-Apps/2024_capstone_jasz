import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import TabBar from '../../components/tabbar/TabBar';



export default function TabLayout () {
  return (
    <Tabs backBehavior="history" tabBar={props => <TabBar {...props}/>}
      screenOptions={{headerShown:false, tabBarHideOnKeyboard: true,}}>
        <Tabs.Screen name="mapview"
        options={{
          title:"Map",
        }}/>

        <Tabs.Screen name="listview"
        options={{
          title:"List",
        }}/>
    </Tabs>
  )
}
