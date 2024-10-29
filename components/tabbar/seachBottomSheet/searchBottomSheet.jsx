import BottomSheet, { BottomSheetModal, BottomSheetScrollView, BottomSheetView } from "@gorhom/bottom-sheet";
import { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import { Text, View, Animated, TextInput, TouchableOpacity, ScrollView} from "react-native";
import { useSelector } from 'react-redux';
import searchSheetStyle from "./searchBottomSheetstyle";
import Ionicons from '@expo/vector-icons/Ionicons';
import RecentSearch from "./recentSearch";
import SearchBox from "./searchBox";
import { router, useGlobalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

function expandEventsByStreets(events) {
    const expandedEvents = [];
  
    events?.forEach(event => {
      const baseEvent = { ...event }; // Create a copy of the event to preserve other properties
      const streets = event.properties.STREETS.split(', '); // Split the streets into an array
  
      streets.forEach(street => {
        const newEvent = JSON.parse(JSON.stringify(baseEvent)); // Deep copy the base event
        newEvent.properties.STREETS = street; // Set the street to the current iteration's street
        expandedEvents.push(newEvent); // Add the new event to the expanded events array
      });
    });
  
    return expandedEvents;
  }
  
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


const SearchBottomSheet = forwardRef((props, ref) => {
    const { currentPlanned, currentUnPlanned } = useSelector(state => state.jsonReducer); 
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [outage, setOutage] = useState([]);
    const [text, onChangeText] = useState('');
    const [recentSearch, setRecentSearch] = useState([]);
    
    const snapPoints = useMemo(() => ['95%'],[]);
    const handleDismissPress = () => ref?.current.dismiss();
    const {currentLocation} = useSelector((state) => state.locationReducer)

    const global = useGlobalSearchParams();

    const _retrieveData = async () => {
        try {
            const item = await AsyncStorage.getItem('RecentSearch');
            setRecentSearch(item ? JSON.parse(item) : []);
        } catch (error) {
            console.log(error)
        }
      };

    const _clearData = async() => {
            try {
                await AsyncStorage.removeItem("RecentSearch");
            }
            catch(exception) {
                console.log('Error Occured');
            }
        }
    const searchSelect = (outage) => {
        handleDismissPress(),
        router.setParams({showTabBar: false})
        router.setParams({mapID: outage.properties.EVENT_ID})
    }

    useEffect(() => {
        const results = outage.filter(outage => {
            const streetMatch = outage.properties.STREETS.toLowerCase().includes(text.toLowerCase());
            const suburbMatch = outage.properties.SUBURBS.toLowerCase().includes(text.toLowerCase());
            return streetMatch || suburbMatch;
          }).slice(0, 10); 
          setFilteredEvents(results);
    }, [text])


    useEffect(() =>{
        const allOutages =  [...currentPlanned?.features || [], ...currentUnPlanned?.features || []]
        if(currentLocation.coords){
            const outageData = allOutages?.map(item => {
                const { coordinates } = (item?.properties?.TYPE === "PLANNED") ? item?.geometry : item?.geometry?.geometries[0]
                const distance = haversineDistance(
                    { latitude:  currentLocation.coords.latitude, longitude: currentLocation.coords.longitude },
                    { latitude: coordinates[1], longitude: coordinates[0] }
                );
                return { ...item, distance: `${distance.toFixed(0)} km` }})

            setOutage(expandEventsByStreets(outageData));
        } else {
            setOutage(expandEventsByStreets(allOutages));
        }
        
    },[currentPlanned, currentUnPlanned])

    useEffect(() => { 
        _retrieveData();        
    }, [])


    return (
        <BottomSheetModal ref={ref} index={0} snapPoints={snapPoints} enablePanDownToClose  enableContentPanningGesture={false}>
            <View style={searchSheetStyle.searchSheetContainer}>
                <View style={searchSheetStyle.searchInputContainer}>
                    <View style={searchSheetStyle.searchFilterContainer}>
                        {text ? 
                        <TouchableOpacity onPress={() => {
                            handleDismissPress();
                            onChangeText('');
                        }}>
                            <Ionicons name="arrow-back-outline" size={25} color="#2389C8" />
                        </TouchableOpacity>:
                        <Ionicons name="search-outline" size={25} color="black" />
                    }
                    </View>
                    <TextInput
                        style={searchSheetStyle.search_textInput}
                        onChangeText={text => {
                            onChangeText(text);
                        }}
                        placeholder="Search"
                        value={text}
                    />
                    {text && <View style={searchSheetStyle.searchDeleteContainer}>
                        <TouchableOpacity onPress={() => {onChangeText("")}}><Ionicons name="close-circle-outline" size={25} color="black" /></TouchableOpacity>
                    </View>}
                </View>


                {text? 
                 <View style={searchSheetStyle.recentSearchContainer}>
                    <Text style={searchSheetStyle.recentSearchHeading}>
                        Search
                    </Text>
                    <View style={searchSheetStyle.recentBoxContainer}>
                            {filteredEvents.length > 0 ? 
                                <ScrollView 
                                    showsVerticalScrollIndicator={false}
                                    showsHorizontalScrollIndicator={false}
                                    style={{height:"87%"}}
                                >
                                    {filteredEvents?.map((event, index)=>{
                                        return(
                                            <SearchBox street={event.properties.STREETS} suburb={event.properties.SUBURBS} outage={event} key={index} searchSelect={searchSelect}
                                                recentSearch={recentSearch} setRecentSearch={setRecentSearch}/>
                                        );
                                    })}
                                </ScrollView>
                            :<Text style={{marginVertical:10}}>Unable to find result <Text style={{fontWeight:'bold'}}>{text}</Text></Text>}
                    </View>
                </View>
                :
                <View style={searchSheetStyle.recentSearchContainer}>
                    <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"baseline"}}>
                        <Text style={searchSheetStyle.recentSearchHeading}>
                            Recent
                        </Text>
                        <TouchableOpacity onPress={() => {
                            _clearData
                            setRecentSearch([])
                            }}>

                            <Text style={[searchSheetStyle.recentSearchHeading, {fontSize:13, color:"#2389C8"}]}>
                                Clear All
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={searchSheetStyle.recentBoxContainer}>
                        {recentSearch?.map((value,index) => { 
                            return( <RecentSearch outage={value} key={index} searchSelect={searchSelect}/>)
                        })}
                    </View>
                </View>}
            </View>
        </BottomSheetModal>
    )
})

export default SearchBottomSheet;