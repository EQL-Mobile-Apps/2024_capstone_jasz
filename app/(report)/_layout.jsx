import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack, Tabs } from 'expo-router'
import FontAwesome from '@expo/vector-icons/FontAwesome';


export default function ReportLayout () {
  return (
    <Stack backBehavior="history" screenOptions={{headerShown:false}}>
        <Stack.Screen name="r_report01" options={{animation: 'slide_from_right'}}/>
        <Stack.Screen name="r_report02" options={{animation: 'slide_from_right'}}/>
        <Stack.Screen name="r_report03" options={{animation: 'slide_from_right'}}/>
        <Stack.Screen name="r_report04" options={{animation: 'slide_from_right'}}/>
        <Stack.Screen name="r_report05" options={{animation: 'slide_from_right'}}/>
        <Stack.Screen name="r_report10" options={{animation: 'slide_from_right'}}/>
    </Stack>
  )
}
