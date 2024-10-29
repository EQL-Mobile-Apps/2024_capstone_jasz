

import { SafeAreaView, Text, TouchableOpacity, View, TextInput, ScrollView  } from 'react-native';
import React, { useState } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import reportSubStyle from '../report_style/reportSubStyle';
import reportStyle from '../report_style/reportStyle';
import { Link, useRouter } from 'expo-router';
import { Divider } from '@rneui/themed';

// Modal component for leaving the report process
import LeaveModal from '../report_popup/leave-popup'; 
import sharedStyle from '../report_style/report_sharedStyle';


export default function Report06() {
    const router = useRouter(); 



    // ----- Modal for assessmnet ----- //
    const [asse_mVis, asse_set_mVis] = useState(false);
    const [asse_mTitle, asse_set_mTitle] = useState('');
    const [asse_mMessage, asse_set_mMessage] = useState('');
    const [asse_mToPage, asse_set_mToPage] = useState('');

    const asse_show_m = (title, msg, page) => {
        asse_set_mVis(true);
        asse_set_mTitle(title);
        asse_set_mMessage(msg);
        asse_set_mToPage(page);
        
    };

    // ----- Modal states for leave confirmation ----- //
    const [leave_mVis, leave_set_mVis] = useState(false);
    const [leave_mTitle, leave_set_mTitle] = useState('');
    const [leave_mContent, leave_set_mContent] = useState('');
    const [leave_mBtnL, leave_set_mBtnL] = useState('');
    const [leave_mBtnR, leave_set_mBtnR] = useState('');
    const [leave_mPageOn, leave_set_mPageOn] = useState(0);
 
    
    

        // Drop-down option state
        const [optionSelect, setOptionSelect] = useState(false);
        const [selectedOption, setSelectedOption] = useState('');
        const [selectedVal, setSelectedval] = useState(null);

    
        const picked = selectedVal !== null;  // Instead of checking for 'po', use null to signify no selection

        
        console.log("Unhandled asd:", selectedVal);
        
        const options = [
            'Switches are all on but no power',  // check your meter
            'Safety switch keep turning off', // switch board 1
            'My power is restored', // yay 2
            'None of the above' // final 3 
        ];

        const handleAssessment = () => {
            if (selectedVal === 0) { 
                router.push("/(report)/r_report08");
            } else if (selectedVal === 1) {
                asse_show_m(
                    "Our Assessment", 
                    "A faulty appliance might be tripping your safety switch. Unplug your appliances, then plug each back in one by one to find the issue. Check the switchboard as you go. If unresolved, call an electrician.", 
                    "home"
                );
            } else if (selectedVal === 2) {
                asse_show_m(
                    "Our Assessment", 
                    "Thanks for letting us know. Happy that your power is back on:)", 
                    "home"
                );
            } else if (selectedVal === 3) {
                router.push("/(report)/r_report08");
            } else {
                console.log("Unhandled pageOn value:", selectedVal);
            }
        };
    // Function to show the leave confirmation modal
    const leave_show_m = (title, content, btnL, btnR, pageOn) => {
        leave_set_mVis(true);
        leave_set_mTitle(title);
        leave_set_mContent(content);
        leave_set_mBtnL(btnL);
        leave_set_mBtnR(btnR);
        leave_set_mPageOn(pageOn);
    };
    return ( 
        <SafeAreaView  style={reportSubStyle.bigContainer}>
        

            {/* ---------- Header ---------- */}
            <View style={reportSubStyle.headerCtnr}> 
                
                {/* Close button */}
                <TouchableOpacity 
                    style={reportSubStyle.closeBtn}
                    onPress={() => {
                        leave_show_m(
                            "Leave Report", 
                            "Are you sure you want to end the report process? Your progress will not be saved.",
                            "Go back", "Leave", 0 
                        );
                    }}>
                    <AntDesign name="close" size={40} color="black" />
                </TouchableOpacity>
                {/* Progress bar */}
                {/* CODE HERE */}
            </View>

            {/* ---------- Content ---------- */}

            {/* --- Prompt --- */}
            <View style = {reportSubStyle}> 
                
                <Text style={{fontSize: 43, fontWeight: 'bold', marginVertical: 5, marginTop: 10 }}>Things you can try</Text>
                <Text style = {{fontSize: 17}}>You might be able to resolve this issue quickly by checking a few things yourself!</Text>
                 
                <View style  = {{marginTop: 15,}}> 
                <Divider style={reportSubStyle.nondivider} />
                <Text style = {{fontSize: 20, fontWeight: 'bold'}}>Important Safety Notice</Text>
                <Text style = {{fontSize: 16, marginTop: 5}}>If something doesn't look safe, there are any sparks, burning smells, unusual noice or exposed wires stop immediately and call an electrician.</Text>
                </View>
                
                <View style  = {{marginTop: 15,}}> 
                <Divider style={reportSubStyle.nondivider} />

                <Text style = {{fontSize: 20, fontWeight: 'bold'}}>Troubleshooting</Text>
                <Text style = {{fontSize: 16, marginTop: 5}}>Open your switchboard and make sure all the switches are facing up or in "on" position</Text>
                </View>
                <View style  = {{marginTop: 15,}}>
                <Divider style={reportSubStyle.nondivider} />
    
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>Select an option that best describes your switchboard:</Text>

                {/* Drop-down Component */}
                <View style={sharedStyle.midContentCtn}> 
                <TouchableOpacity onPress={() => setOptionSelect(!optionSelect)}>
                    <View style={reportSubStyle.dropdownBox}>
                        <Text style={[reportSubStyle.dropdownText, reportSubStyle.dropdownSelectedText]}>
                            {selectedOption || 'Select an option'}
                        </Text>
                        <AntDesign name="down" size={20} color="black" style={reportSubStyle.dropIcon}/>
                    </View>
                </TouchableOpacity>

                {/* Show drop-down options */}
                {optionSelect && (
                    <View style={reportSubStyle.dropdownMenu}>
                        {options.map((option, index) => (
                            <View> 
                            <TouchableOpacity 
                                key={index} 
                                style={reportSubStyle.dropdownItem} 
                                onPress={() => {
                                    setSelectedOption(option);
                                    setOptionSelect(false);
                                    setSelectedval(index);  // Make sure this correctly sets the numerical value
                                }}>
                                <Text style={reportSubStyle.dropdownText}>{option}</Text>
                            </TouchableOpacity>

                            <Divider style={reportSubStyle.lightdivider} />

                            </View>
                            
                        ))}
                    </View>
                )}
                </View>
            </View>
            </View>
            {/* ---------- Tail (Buttons & Hints) ---------- */}
            <View style={reportSubStyle.tailCtn}>
                {/* Buttons */}
                <View style={reportSubStyle.btnCtn}> 
                    {/* Back Button */}
                    <TouchableOpacity 
                        style={[reportSubStyle.tailBtn, reportSubStyle.backBtn]} 
                        onPress={() => {
                            // leave_show_m(
                            //     "Go back", 
                            //     "Are you sure you want to go back? Your progress on this page will not be saved.",
                            //     "Continue", "Go back", 5                            );
                            router.push("/(report)/r_report04")
                        }}>
                        <Text style={reportSubStyle.tailBtnTxt}>Back</Text>
                    </TouchableOpacity>

                    {/* Next Button */}
                    <TouchableOpacity 
                        style={[reportSubStyle.tailBtn, reportSubStyle.nextBtn, picked ? reportSubStyle.activeBigBtn : reportSubStyle.disabledBigBtn]} 
                        disabled={!picked}
                        onPress={handleAssessment}> 
                        <Text style={[reportSubStyle.tailBtnTxt, picked ? reportSubStyle.activebigBtnTxt : reportSubStyle.disabledBigBtnText]}>
                            Next
                        </Text>
                    </TouchableOpacity>


                </View>
            </View>
            

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
            <AsseModel 
                visible={asse_mVis}
                onClose={() => asse_set_mVis(false)}
                title = {asse_mTitle}
                msg = {asse_mMessage}
                page = {asse_mToPage}
            />
        </SafeAreaView>

    )}