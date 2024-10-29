import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack, Tabs } from 'expo-router'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import TabBar from '../../components/tabbar/TabBar';



export default function MenuLayout () {
  return (
    <Stack backBehavior="history" screenOptions={{headerShown:false}}>
        <Stack.Screen name="link" options={{animation: 'slide_from_right'}}/>
        <Stack.Screen name="report" options={{animation: 'slide_from_right'}}/>
        <Stack.Screen name="setting" options={{animation: 'slide_from_right'}}/>
    </Stack>
  )
}

