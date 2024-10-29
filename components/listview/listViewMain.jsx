import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import listViewStyle from './listViewStyle'
import { useSelector } from 'react-redux'
import { AntDesign } from '@expo/vector-icons';
import ListViewCard from './listViewCard'
import MaskedView from '@react-native-masked-view/masked-view';
import {LinearGradient} from 'expo-linear-gradient';

function haversineDistance(coords1, coords2) {
    const R = 6371; 
    const lat1 = coords1.latitude * Math.PI / 180; 
    const lat2 = coords2.latitude * Math.PI / 180;
    const deltaLat = (coords2.latitude - coords1.latitude) * Math.PI / 180;
    const deltaLon = (coords2.longitude - coords1.longitude) * Math.PI / 180;
  
    const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
              Math.cos(lat1) * Math.cos(lat2) * 
              Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
    return R * c;
  }

export default function ListViewMain(){
    const {currentPlanned, currentUnPlanned,serviceArea, futurePlanned} = useSelector(state => state.jsonReducer)
    const [groupedData, setGroupedData] = useState([]);
    const [endScrolling, setEndScrolling] = useState(true);
    const {currentLocation} = useSelector((state) => state.locationReducer)

    const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
        const paddingToBottom = 120;
        return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
      };
      
    useEffect(() => {
        let outage = [...(currentPlanned.features || []), ...(currentUnPlanned.features || [])];
        let grouped = outage.reduce((acc, feature) => {
            const suburb = feature.properties.SUBURBS;
            if (!acc[suburb]) {
                acc[suburb] = [];
            }
            acc[suburb].push(feature);
            return acc;
        }, {});

        if(currentLocation.coords){
            const distances = Object.entries(grouped)?.map(([key, value]) => {
                const { coordinates } = (value[0].properties.TYPE === "PLANNED") ? value[0].geometry : value[0].geometry.geometries[0]
                const distance = haversineDistance(
                  { latitude: currentLocation.coords.latitude, longitude: currentLocation.coords.longitude },
                  { latitude: coordinates[1], longitude: coordinates[0] }
                );
                return { key, distance };
            });

            const distanceMap = distances?.reduce((acc, item) => {
                acc[item.key] = item.distance;
                return acc;
              }, {});
            
            Object.keys(grouped)?.forEach(key => {
                const entries = grouped[key];
                entries.forEach(entry => {
                    entry.distance = distanceMap[key].toFixed(2); 
                });
            });

            const dataArray = Object.entries(grouped)?.map(([key, value]) => ({
                key,
                value
              }));

            dataArray.sort((a, b) => {
                const distanceA = parseFloat(a.value[0].distance); 
                const distanceB = parseFloat(b.value[0].distance);
                return distanceA - distanceB;
            });
           
            setGroupedData(dataArray);
        } else {
            const dataArray = Object.entries(grouped)?.map(([key, value]) => ({
                key,
                value
              }));
            setGroupedData(dataArray);
        }
    }, [currentPlanned, currentUnPlanned]);

    return (
        <SafeAreaView style={listViewStyle.LVStyle_container}>
            <Text style={listViewStyle.LVStyle_mainHeading}>Outages</Text>
            <Text style={listViewStyle.LVStyle_heading}>Saved Address(es)</Text>
            <View style={listViewStyle.LVStyle_hr}/>
            <Text style={listViewStyle.LVStyle_SA_text}>No address has been saved</Text>
            <Text style={listViewStyle.LVStyle_heading}>Outage(s) near you</Text>
            <View style={listViewStyle.LVStyle_hr}/>
            <MaskedView
                style={{flex: 1}}
                maskElement={<LinearGradient style={{flex: 1}} colors={endScrolling ? ['white', 'white','white', 'white','transparent'] : ['white','white']} />}
            >
                <ScrollView onScroll ={({nativeEvent}) => {
                    if (isCloseToBottom(nativeEvent)) {
                        setEndScrolling(false);
                    } else { 
                        setEndScrolling(true);
                    }
                    }}
                    scrollEventThrottle={1}
                >
                    {groupedData?.length > 0 &&
                        groupedData?.map((value, index) => {
                            return (<ListViewCard outage={value.key} outageSub={value.value} key={index}/>)
                    })}
                    
                </ScrollView>
            </MaskedView>
        </SafeAreaView>
    )
}