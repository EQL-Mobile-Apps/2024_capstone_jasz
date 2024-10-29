import { ScrollView, SafeAreaView, Text, TouchableOpacity, View, TextInput, Keyboard } from 'react-native';
import React, { useState, useEffect } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Link, useRouter } from 'expo-router';
import { Divider } from '@rneui/themed';

import mainStyle from './report_style/report_mainStyle';
import sharedStyle from './report_style/report_sharedStyle';

// Modal component for leaving the report process
import LeaveModal from './report_popup/leave-popup'; 

export default function Report04() {
    const router = useRouter(); 
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    const [isChecked, setIsChecked] = useState(false);
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));
        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    // State variables for storing input values
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [allFilled, setAllFilled] = useState(false);

    // Function to check if all required fields are filled
    const checkIfAllFilled = () => {
        if (name.trim() !== '' && phoneNumber.trim() !== '' && email.trim() !== '') {
            setAllFilled(true);
        } else {
            setAllFilled(false);
        }
    };

    useEffect(() => {
        checkIfAllFilled();
    }, [name, phoneNumber, email]);

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
                    <Text style={sharedStyle.promptTxt}>Your Detail</Text>
                    <Divider style={sharedStyle.lightdivider} />

                    <Text style={sharedStyle.subSubPromptTxt}>Name<Text style = {{color: 'red'}}>* </Text>: </Text>
                    <TextInput
                        style={[{height: 60, textAlignVertical: 'center'}, mainStyle.inputBox]}
                        value={name}
                        onChangeText={setName}
                        placeholder="Enter your name"
                    />

                    <Text style={sharedStyle.subSubPromptTxt}>Phone Number<Text style = {{color: 'red'}}>* </Text>: </Text>
                    <TextInput
                        style={[{height: 60, textAlignVertical: 'center'}, mainStyle.inputBox]}
                        value={phoneNumber}
                        onChangeText={setPhoneNumber}
                        placeholder="Enter your phone number"
                        keyboardType="phone-pad"
                    />

                    <Text style={sharedStyle.subSubPromptTxt}>Email<Text style = {{color: 'red'}}>* </Text>: </Text>
                    <TextInput
                        style={[{height: 60, textAlignVertical: 'center'}, mainStyle.inputBox]}
                        value={email}
                        onChangeText={setEmail}
                        placeholder="Enter your email"
                        keyboardType="email-address"
                    />


                    <Text style={sharedStyle.subSubPromptTxt}>Special Instruction or Notes (max. 300 char)(optional)</Text>
                    <TextInput
                        style={[{height: 120, textAlignVertical: 'top'}, mainStyle.inputBox]}
                        placeholder="Enter any special instructions or notes"
                        multiline
                    />


                    <View style={{ flexDirection: 'row', position: 'flex', marginVertical: 10, marginTop: 20 }}> 
                    <TouchableOpacity onPress={handleCheckboxChange}>
                    <AntDesign
                        name={isChecked ? "checksquare" : "checksquareo"}
                        size={24}
                        color={isChecked ? "black" : "gray"}
                    />
                    </TouchableOpacity>

                    <Text style={{     fontSize: 15,
      fontWeight: 'bold',
    marginLeft: 10, 
      color: '#000',}}>By submitting this form, you agree to:</Text>
                    </View>

                    
                    <View style={sharedStyle.list}>
                        <Text style={sharedStyle.listItem}>• Our Terms and Conditions (T&Cs)</Text>
                        <Text style={sharedStyle.listItem}>• Receive SMS/email/call related to this report</Text>
                    </View>
               

                    
                </View>
            </ScrollView>

            {/* ---------- Tail (Buttons & Hints) ---------- */}
            {!isKeyboardVisible && (
                <View style={sharedStyle.tailCtn}>
                    {/* Hint Text */}
                    <View style={[{marginBottom: 10}, sharedStyle.hintTxtCtn]}>
                        <Text style={sharedStyle.hintTxt}>
                            {allFilled ? '' : 'Please fill all required fields to continue'}
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
                            style={[sharedStyle.tailTwoBtn, sharedStyle.nextBtn, allFilled ? mainStyle.btn_selected : mainStyle.btn_disabled]} 
                            disabled={!allFilled}
                            onPress={() => router.push("/(report)/r_report05")}
                        >
                            <Text style={[sharedStyle.tailTwoBtnTxt, sharedStyle.tailNextBtn, allFilled ? mainStyle.btn_selected : mainStyle.txt_disabled]}>
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
