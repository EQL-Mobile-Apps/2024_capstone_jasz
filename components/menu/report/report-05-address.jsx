import { ScrollView, SafeAreaView, Text, TouchableOpacity, View, TextInput, Keyboard, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';

import { useRouter } from 'expo-router';
import { Divider } from '@rneui/themed';
import * as turf from '@turf/turf';

import mainStyle from './report_style/report_mainStyle';
import sharedStyle from './report_style/report_sharedStyle';

// Modal component for leaving the report process
import LeaveModal from './report_popup/leave-popup'; 


export default function Report05() {
    const router = useRouter(); 
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));
        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    // State variables for storing input values
    const [address, setAddress] = useState('');
    const [NIM, setNIM] = useState('');
    const [allFilled, setAllFilled] = useState(false);

    // Verification related states
    const [verAddress, setVerAddress] = useState(false);
    const [hintText, setHintText] = useState('Please verify address');
    const [verified, setVerified] = useState(false); // New state for tracking if the address is verified
    const [editableAddresses, setEditableAddresses] = useState([]);

    const toggleEditAddress = () => {
        setEditableAddresses((prevState) =>
            prevState.includes(address)
                ? prevState.filter((addr) => addr !== address) // Remove from editable if already editable
                : [...prevState, address] // Add to editable if not already editable
        );

        // When edit is enabled, reset the verified status
        setVerified(false);
        setHintText('Please verify the address.');
    };

    // Function to check if all required fields are filled
    const checkIfAllFilled = () => {
        if (address.trim() !== '') {
            setAllFilled(true);
        } else {
            setAllFilled(false);
        }
    };

    useEffect(() => {
        checkIfAllFilled();
    }, [address]);

    // ----- Modal states for leave confirmation ----- //
    const [leave_mVis, leave_set_mVis] = useState(false);
    const [leave_mTitle, leave_set_mTitle] = useState('');
    const [leave_mContent, leave_set_mContent] = useState('');
    const [leave_mBtnL, leave_set_mBtnL] = useState('');
    const [leave_mBtnR, leave_set_mBtnR] = useState('');
    const [leave_mPageOn, leave_set_mPageOn] = useState(0);

    // Function to show the leave confirmation modal
    const showLeaveModal = (title, content, btnL, btnR, pageOn) => {
        leave_set_mVis(true);
        leave_set_mTitle(title);
        leave_set_mContent(content);
        leave_set_mBtnL(btnL);
        leave_set_mBtnR(btnR);
        leave_set_mPageOn(pageOn);
    };

    // Check if the point is within the service area using Turf.js
    const checkPointInServiceArea = async (longitude, latitude) => {
        try {
            const response = await fetch(process.env.REACT_APP_SERVICE_AREA); // Replace with your actual geoJSON service area URL
            const geojsonData = await response.json();
            const point = turf.point([longitude, latitude]);

            for (const feature of geojsonData.features) {
                const polygon = feature.geometry;
                if (turf.booleanPointInPolygon(point, polygon)) {
                    setVerAddress(true);
                    return true;
                }
            }
            setVerAddress(false);
            setHintText('This address is not in our service area');
            return false;
        } catch (error) {
            console.error('Error checking service area:', error);
            setVerAddress(false);
            setHintText('An error occurred while verifying the address.');
            return false;
        }
    };

    // Check the validity of the address
    const checkAddress = async (searchAddress) => {
        try {
            const encodedAddress = encodeURIComponent(searchAddress);
            const response = await fetch(`https://geocode.maps.co/search?q=${encodedAddress}&api_key=66ece8fb3e0ed406497595pmk8ad8a6`);

            if (!response.ok) throw new Error('Network response was not ok');

            const addresses = await response.json();

            if (addresses.length > 0) {
                const { lat, lon } = addresses[0];
                const isInServiceArea = await checkPointInServiceArea(lon, lat);

                if (isInServiceArea) {
                    // Mark the address as verified if it's in the service area
                    setVerified(true);
                    setHintText('');
                } else {
                    setHintText('This address is not in our service area.');
                }
            } else {
                setHintText('Address not found.');
                setVerified(false);
            }
        } catch (error) {
            console.error('Error fetching address:', error);
            setHintText('An error occurred while verifying the address.');
            setVerified(false);
        }
    };

    return ( 
        <SafeAreaView style={sharedStyle.mainCtn}>
            {/* ---------- Header ---------- */}
            <View style={sharedStyle.headCtn}>
                {/* Close button */}
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
                    <View style={{ width: '80%', ...sharedStyle.progressBar }} />
                </View>
            </View>

            {/* ---------- Content ---------- */}
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* --- Prompt --- */}
                <View style={sharedStyle.contentCtn}> 
                    <Text style={sharedStyle.promptTxt}>Address Detail</Text>
                    <Divider style={sharedStyle.lightdivider} />

                    <Text style={sharedStyle.subSubPromptTxt}>Address<Text style = {{color: 'red'}}>* </Text>: </Text>
                    <TextInput
                        style={[{height: 60, textAlignVertical: 'center'}, mainStyle.searchBar]}
                        value={address}
                        onChangeText={setAddress}
                        placeholder="Enter your address"
                        // editable={editableAddresses.includes(address) || !verified} // Editable if in edit mode or not verified
                        editable={ !verified} 
                    />
                    <View style={{ marginTop: 10 }}>
                        {/* {verified && !editableAddresses.includes(address) } */}
                        {verified? (
                            <View style={{ flexDirection: 'row', position: 'flex',justifyContent: 'space-between' }}>
                                <TouchableOpacity disabled> 
                                    <Text style = {{color: "green"}}>Verified</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={toggleEditAddress}>
                                    <Text>Edit</Text>
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <TouchableOpacity
                                onPress={() => checkAddress(address)}
                                disabled={verified && !editableAddresses.includes(address)} // Disable if verified and not in edit mode
                            >
                                <Text style={verified && !editableAddresses.includes(address) ? mainStyle.btn_selected : mainStyle.propertyTxt}>
                                    {verified && !editableAddresses.includes(address) ? '' : 'Verify Address'}
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>
                    <Text style={{ color: 'red' }}>{hintText}</Text>

                    <Text style={sharedStyle.subSubPromptTxt}>NIM (optional): </Text>
                    <TextInput
                        style={[{height: 60, textAlignVertical: 'center'}, mainStyle.searchBar]}
                        value={NIM}
                        onChangeText={setNIM}
                        placeholder="Enter NIM (optional)"
                        keyboardType="phone-pad"
                    />
                </View>
            </ScrollView>

            {/* ---------- Tail (Buttons & Hints) ---------- */}
            {!isKeyboardVisible && (
                <View style={sharedStyle.tailCtn}>
                    {/* Hint Text */}
                    <View style={[{marginBottom: 10}, sharedStyle.hintTxtCtn]}>
                        <Text style={sharedStyle.hintTxt}>
                            {allFilled && !verified ? 'Please verify the address.' : ''}
                        </Text>
                    </View>

                    {/* Buttons */}
                    <View style={[sharedStyle.tailTwoBtnCtn, sharedStyle.tailBtnContainer]}> 
                        {/* Back Button */}
                        <TouchableOpacity 
                            style={[sharedStyle.tailTwoBtn, sharedStyle.tailBackBtn]} 
                            onPress={() => router.push("/(report)/r_report03")}
                        >
                            <Text style={[sharedStyle.tailTwoBtnTxt, sharedStyle.tailBackBtnTxt]}>Back</Text>
                        </TouchableOpacity>

                        {/* Next Button */}
                        <TouchableOpacity 
                            style={[sharedStyle.tailTwoBtn, sharedStyle.nextBtn, verified ? mainStyle.btn_selected : mainStyle.btn_disabled]} 
                            disabled={!verified} // Disable the Next button until address is verified
                            onPress={() => router.push("/(report)/r_report10")}
                        >
                            <Text style={[sharedStyle.tailTwoBtnTxt, sharedStyle.tailNextBtn, verified ? mainStyle.btn_selected : mainStyle.txt_disabled]}>
                                Next
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}

            {/* ---------- Modal ---------- */}
            <LeaveModal 
                visible={leave_mVis}
                onClose={() => leave_set_mVis(false)}
                title={leave_mTitle}
                content={leave_mContent}
                btnL={leave_mBtnL}
                btnR={leave_mBtnR}
                pageOn={leave_mPageOn}
            />
        </SafeAreaView>
    );
}
