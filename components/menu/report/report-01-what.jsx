import { ScrollView, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from 'expo-router';

import mainStyle from './report_style/report_mainStyle';
import sharedStyle from './report_style/report_sharedStyle';
import LeaveModal from './report_popup/leave-popup'; 

export default function Report01() {
    const router = useRouter(); 
    const changePage = () => {
        if (fallenLine === 'yes') {
            router.push("/(report)/r_report01"); //  add link to fallen power line portal
        } else if (powerOutage === 'yes') {
            router.push("/(report)/r_report02");
        } else if (othersOption === 'yes') {
            router.push("/(report)/r_report04");
        } else {
            console.log("Unhandled pageOn value");
        }
    };

    // ----- Option states ----- // 
    const [fallenLine, setFallenLine] = useState('no');
    const [powerOutage, setPowerOutage] = useState('no');
    const [othersOption, setOthersOption] = useState('no');

    // Condition to enable the "Next" button only if one option is selected
    const notPick = fallenLine === 'no' && powerOutage === 'no' && othersOption === 'no';
    const onePick = fallenLine === 'yes' || powerOutage === 'yes' || othersOption === 'yes';

    // ----- Modal states for leave confirmation ----- //
    const [leave_mVis, leave_set_mVis] = useState(false);
    const [leave_mTitle, leave_set_mTitle] = useState('');
    const [leave_mContent, leave_set_mContent] = useState('');
    const [leave_mBtnL, leave_set_mBtnL] = useState('');
    const [leave_mBtnR, leave_set_mBtnR] = useState('');
    const [leave_mPageOn, leave_set_mPageOn] = useState(0);

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
        <SafeAreaView style={sharedStyle.mainCtn}>
            {/* ---------- Header ---------- */}
            <View style={sharedStyle.headCtn}> 
                {/* Close button */}
                <TouchableOpacity 
                    style={sharedStyle.closeBtn}
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
                <View style={sharedStyle.progressBarCtn}>
                    <View style={[sharedStyle.progressBar, { width: '20%' }]} />
                </View>
                
            </View>

            {/* ---------- Content ---------- */}
            <ScrollView showsVerticalScrollIndicator={false}>
            <View style={sharedStyle.contentCtn}> 
                {/* Report question */}
                <View style={sharedStyle.topContentCtn}> 
                <Text style={sharedStyle.promptTxt}>What are you reporting?</Text>
                </View>
                {/* Options for the report */}
                <View style={sharedStyle.midContentCtn}>
                    {/* Option 1 - Fallen Power Line */}
                    <TouchableOpacity 
                        style={[
                            mainStyle.oneBtn,
                             
                            fallenLine === 'yes' && mainStyle.btn_selected
                        ]} 
                        onPress={() => {
                            setFallenLine('yes'); 
                            setPowerOutage('no');
                            setOthersOption('no');
                        }}>
                        <Text style={[
                            mainStyle.oneBtnTxt, 
                            fallenLine === 'yes' && mainStyle.txt_selected
                        ]}>
                            Fallen Power Line
                        </Text>
                    </TouchableOpacity>

                    {/* Option 2 - Power Outage */}
                    <TouchableOpacity 
                        style={[
                            mainStyle.oneBtn, 
                            powerOutage === 'yes' && mainStyle.btn_selected
                        ]}
                        onPress={() => {
                            setFallenLine('no'); 
                            setPowerOutage('yes');
                            setOthersOption('no');
                        }}>
                        <Text style={[
                            mainStyle.oneBtnTxt, 
                            powerOutage === 'yes' && mainStyle.txt_selected
                        ]}>
                            Power Outage
                        </Text>
                    </TouchableOpacity>

                    {/* Option 3 - Others */}
                    <TouchableOpacity 
                        style={[
                            mainStyle.oneBtn, 
                            othersOption === 'yes' && mainStyle.btn_selected
                        ]}
                        onPress={() => {
                            setFallenLine('no'); 
                            setPowerOutage('no');
                            setOthersOption('yes');
                        }}>
                        <Text style={[
                            mainStyle.oneBtnTxt, 
                            othersOption === 'yes' && mainStyle.txt_selected
                        ]}>
                            Others
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            </ScrollView>
            {/* ---------- Tail (Buttons & Hints) ---------- */}
            <View style={sharedStyle.tailCtn}>
                {/* Hint Text */}
                
                <View style={[{marginBottom: 10,}, sharedStyle.hintTxtCtn]}>
                    <Text style={sharedStyle.hintTxt}>
                        {onePick ? '' : 'Pick an option to proceed'}
                    </Text>
                </View>

                {/* Buttons */}
                <View style={[sharedStyle.tailTwoBtnCtn, sharedStyle.tailBtnContainer]}> 
                    {/* Back Button */}
                    <TouchableOpacity 
                        style={[sharedStyle.tailTwoBtn, sharedStyle.tailBackBtn]} 
                        // onPress={() => {
                        //     leave_show_m(
                        //         "Go back", 
                        //         "Are you sure you want to go back? Your progress on this page will not be saved.",
                        //         "Continue", "Go back", 1
                        //     );
                        onPress={() => {router.push("/(menu)/report");}
                        }>
                        <Text style={[sharedStyle.tailTwoBtnTxt, sharedStyle.tailBackBtnTxt]}>Back</Text>
                    </TouchableOpacity>

                    {/* Next Button */}
                    <TouchableOpacity 
                        style={[sharedStyle.tailTwoBtn, sharedStyle.nextBtn, onePick ? mainStyle.btn_selected : mainStyle.btn_disabled]} 
                        disabled={notPick}
                        onPress={() => router.push("/(report)/r_report02")} >
                        <Text style={[sharedStyle.tailTwoBtnTxt, sharedStyle.tailNextBtn, onePick ? mainStyle.btn_selected : mainStyle.txt_disabled]}>
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
        </SafeAreaView> 
    );
}
