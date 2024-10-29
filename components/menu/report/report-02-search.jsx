import React, { useState, useEffect } from 'react';
import { ScrollView, SafeAreaView, Text, TouchableOpacity, View, TextInput, Keyboard } from 'react-native';
import { useSelector } from 'react-redux';
import { useRouter } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Divider } from '@rneui/themed';

import mainStyle from './report_style/report_mainStyle';
import sharedStyle from './report_style/report_sharedStyle';

import LeaveModal from './report_popup/leave-popup';

export default function Report04() {
    const router = useRouter(); 

    // State for search input and outages
    const [searchQuery, setSearchQuery] = useState('');
    const [searchExist, setSearchExist] = useState(true);
    const [selectedOutage, setSelectedOutage] = useState(null);
    const [selectedStreet, setSelectedStreet] = useState(null);
    const [selectedSuburb, setSelectedSuburb] = useState(null);
    const [isSearching, setIsSearching] = useState(false);
    const [isSearchComplete, setIsSearchComplete] = useState(false);
    const [searched, setSearched] = useState(false);

    const [isKeyboardVisible, setKeyboardVisible] = useState(false);


    // Modal states for leave/back confirmation
    const [leaveModalVisible, setLeaveModalVisible] = useState(false);
    const [leaveModalDetails, setLeaveModalDetails] = useState({ title: '', content: '', btnL: '', btnR: '', pageOn: 0 });

    // Redux state for outages
    const { currentPlanned, currentUnPlanned, serviceArea } = useSelector(state => state.jsonReducer); 
    const allOutages = [...(currentPlanned?.features || []), ...(currentUnPlanned?.features || [])];

    // Keyboard visibility listener
    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));
        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    // Handle search and filter outages
    const handleSearch = (text) => {
        setSearchQuery(text);
        setIsSearchComplete(false);
        setSearchExist(true);
        setTimeout(() => {
            setIsSearchComplete(true);
        }, 500);
    };

    const handleSelectSuggestion = (matchingStreet, suburb, outage) => {
        setSearchQuery(matchingStreet);
        setSelectedOutage(outage);
        setSelectedStreet(matchingStreet);
        setSelectedSuburb(suburb);
        setSearchExist(false);
        setIsSearchComplete(true);
    };

    const filteredOutages = allOutages.filter(outage => {
        const streetList = (outage.properties?.STREETS || '').toLowerCase().split(',').map(s => s.trim());
        return streetList.some(st => st.startsWith(searchQuery.toLowerCase())) && outage.properties?.SUBURBS;
    });

    // Show leave confirmation modal
    const showLeaveModal = (title, content, btnL, btnR, pageOn) => {
        setLeaveModalVisible(true);
        setLeaveModalDetails({ title, content, btnL, btnR, pageOn });
    };

    useEffect(() => {
        if (isSearchComplete && (!searchExist || selectedOutage)) {
            setSearched(true);
        }
    }, [isSearchComplete, searchExist, selectedOutage]);


    useEffect(() => {
        if (searchQuery.length > 0 && filteredOutages.length === 0) {
            setSearched(true);
        }
    }, [searchQuery, filteredOutages]);

    return ( 
        <SafeAreaView style={sharedStyle.mainCtn}>
            {/* Header */}
            <View style={sharedStyle.headCtn}>
                <TouchableOpacity 
                    style={sharedStyle.closeBtn}
                    onPress={() => showLeaveModal(
                        "Leave Report", 
                        "Are you sure you want to end the report process? Your progress will not be saved.",
                        "Go back", "Leave", 0
                    )}>
                    <AntDesign name="close" size={40} color="black" />
                </TouchableOpacity>
                <View style={sharedStyle.progressBarCtn}>
                    <View style={{ width: '40%', ...sharedStyle.progressBar }} />
                </View>
            </View>

            {/* Content */}
            <ScrollView showsVerticalScrollIndicator={false}> 
                <View style={sharedStyle.contentCtn}>
                    {/* Prompt */}
                    <Text style={sharedStyle.promptTxt}>What is the location of the incident?</Text>

                    {/* Search Bar */}
                    <View style={sharedStyle.midContentCtn}>
                        <Text style={sharedStyle.subPromptTxt}>Search street name and suburb:</Text>
                        <TouchableOpacity 
                            style={[mainStyle.searchBar, isSearching || searchQuery.length > 0 ? mainStyle.searchBarActive : mainStyle.searchBarInactive]}
                            onPressIn={() => setIsSearching(true)}
                            onPressOut={() => setIsSearching(false)}
                            activeOpacity={0.8}
                        >
                            <AntDesign name="search1" size={20} color="black" style={mainStyle.searchIcon} />
                            <TextInput
                                style={mainStyle.searchInput}
                                placeholder='Search here' 
                                value={searchQuery}
                                onChangeText={handleSearch}
                                onSubmitEditing={() => setIsSearchComplete(true)}
                            />
                        </TouchableOpacity>

                        {/* Display filtered results */}
                        {searchQuery.length > 0 && searchExist && filteredOutages.length > 0 && (
                            <ScrollView style={[mainStyle.suggCtn, mainStyle.shadow]}>
                                {filteredOutages.map((outage, index) => {
                                    const matchingStreet = outage.properties.STREETS.split(',')
                                        .map(st => st.trim())
                                        .find(st => st.toLowerCase().startsWith(searchQuery.toLowerCase()));

                                    return matchingStreet && (
                                        <View key={index} style={{ marginBottom: 10 }}>
                                            <TouchableOpacity onPress={() => handleSelectSuggestion(matchingStreet, outage.properties.SUBURBS, outage)}>
                                                <Text><Text style={{ fontWeight: 'bold' }}>{matchingStreet}</Text>, {outage.properties.SUBURBS}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    );
                                })}
                            </ScrollView>
                        )}

                        {searchQuery.length > 0 && filteredOutages.length === 0 && (
                            <Text style={sharedStyle.subTxt}>Sorry, we are not aware of any outage in this area</Text>
                            
                        )}

                        {/* Display selected outage */}
                        {isSearchComplete && !searchExist && selectedOutage && (
   
   <ScrollView style={mainStyle.outageCtn}>
       
               <Text style={[{marginTop: 10}, sharedStyle.subTxt]}>
                   Existing outage on <Text style={{fontWeight: 'bold'}}> {selectedStreet}, {selectedOutage?.properties?.SUBURBS}</Text>:
               </Text>
               <TouchableOpacity style={mainStyle.outageCard}
                   onPress={() => {
                    console.log("id sending: ", selectedOutage?.properties?.EVENT_ID)

                    // router.setParams({mapID: selectedOutage?.properties?.EVENT_ID , showTabBar: false} )
                    // router.navigate('../(tabs)/mapview')
                    // router.navigate
                    router.navigate(`../(tabs)/mapview/?mapID=${selectedOutage?.properties?.EVENT_ID}&showTabBar=false`);}
                    // router.navigate('../(tabs)/mapview', 
                    //     {param:
                    //         {mapID: selectedOutage?.properties?.EVENT_ID , showTabBar: false}
                    //     }
                            

                    // )
                    // }
                    }
                  > 
                   <View style = {mainStyle.cardContent}>
                       <View style={{flex: 1}}>
                           <Text style={mainStyle.typeTxt}>{selectedOutage?.properties?.TYPE} Outage</Text>

                           
                           <Text style={mainStyle.locTxt}>
                               {selectedStreet}, {selectedOutage?.properties?.SUBURBS}
                           </Text>                           
                           <Text style={mainStyle.contentTxt}><Text style={{fontWeight: 'bold'}}>Reason:</Text> {selectedOutage?.properties?.REASON}</Text>
                           <Text style={mainStyle.contentTxt}><Text style={{fontWeight: 'bold'}}>Est. Power on:</Text> {selectedOutage?.properties?.EST_FIX_TIME}</Text>
                           </View>
                       <AntDesign name="right" size={20} color="black" style={{padding: 10}} />

               {/* <ListViewOutageCard outage={selectedOutage} street={selectedStreet} /> */}
                   </View>
               </TouchableOpacity>
   </ScrollView>
)}


                    </View>
                </View>
                </ScrollView>
                {/* Footer */}
                {!isKeyboardVisible && (
                <View style={sharedStyle.tailCtn}>

<View style = {[{marginBottom: 10,},sharedStyle.hintTxtCtn]}> 
<Text style={sharedStyle.hintTxt}>
    {searched ? "if the outage you're looking for is not here, choose NEXT to continue"
     : "Please search to continue"}
</Text>
</View>


<View style={[sharedStyle.tailTwoBtnCtn, sharedStyle.tailBtnContainer]}>
    <TouchableOpacity 
        style={[sharedStyle.tailTwoBtn, sharedStyle.tailBackBtn]} 
        onPress={() => router.push("/(report)/r_report01")}
        
    >
        <Text style={[sharedStyle.tailTwoBtnTxt, sharedStyle.tailBackBtnTxt]}>Back</Text>
    </TouchableOpacity>

    <TouchableOpacity 
        style={[sharedStyle.tailTwoBtn, sharedStyle.nextBtn, 
            
            searched ? mainStyle.btn_selected : mainStyle.btn_disabled]} 
        onPress={() => router.push("/(report)/r_report03")}
        disabled = {!searched}
    >
        <Text style={[sharedStyle.tailTwoBtnTxt, sharedStyle.tailNextBtn, searched ? mainStyle.txt_selected : mainStyle.txt_disabled]}>Next</Text>
    </TouchableOpacity>
</View>

</View>   )}
           

            {/* Leave Confirmation Modal */}
            <LeaveModal 
                visible={leaveModalVisible}
                onClose={() => setLeaveModalVisible(false)}
                title={leaveModalDetails.title}
                content={leaveModalDetails.content}
                btnL={leaveModalDetails.btnL}
                btnR={leaveModalDetails.btnR}
                pageOn={leaveModalDetails.pageOn}
            />
        </SafeAreaView>
    );
}
