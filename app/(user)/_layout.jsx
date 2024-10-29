import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack, Tabs } from 'expo-router'
import FontAwesome from '@expo/vector-icons/FontAwesome';



export default function UserLayout () {
  return (
    <Stack backBehavior="history" screenOptions={{headerShown:false}}>
        <Stack.Screen name="profile" options={{animation: 'slide_from_right'}}/>
        <Stack.Screen name="sign" options={{animation: 'slide_from_right'}}/>
        <Stack.Screen name="signin" options={{animation: 'slide_from_right'}}/>
        <Stack.Screen name="signup" options={{animation: 'slide_from_right'}}/>
   </Stack>
  )
}
