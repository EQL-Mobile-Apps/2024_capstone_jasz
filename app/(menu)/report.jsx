import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ListViewMain from '../../components/listview/listViewMain'
import { router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import ReportMain from '../../components/menu/report/reportMain'

export default function Report(){
    return (
        <ReportMain/>
    )
}