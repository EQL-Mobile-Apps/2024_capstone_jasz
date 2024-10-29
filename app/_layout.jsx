import { StyleSheet, Text, View } from 'react-native'
import { Slot , Stack } from 'expo-router'
import React from 'react'
import { Provider } from 'react-redux'
import store from '../context/store'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

export default function RootLayout () {
  return (
      <Provider store={store}>
        <GestureHandlerRootView style={{flex:1}}>
          <BottomSheetModalProvider>
            <Stack screenOptions={{headerShown:false}}>
                    <Stack.Screen name="(tabs)" options={{animation: 'slide_from_right'}}/>
                    <Stack.Screen name="menu" options={{animation: 'slide_from_left'}}/>
                    <Stack.Screen name="(menu)" options={{animation: 'slide_from_left'}}/>
            </Stack>
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </Provider>
  )
}
