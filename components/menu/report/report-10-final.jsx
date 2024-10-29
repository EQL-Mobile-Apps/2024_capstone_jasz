import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from 'expo-router';
import { Divider } from '@rneui/themed';


import mainStyle from './report_style/report_mainStyle';
import sharedStyle from './report_style/report_sharedStyle';

// Modals
import LeaveModal from './report_popup/leave-popup'; 

export default function Report10() {
    // Router for navigation
    const router = useRouter(); 

    // Safety questions' states
    const [lifeThreatening, setLifeThreatening] = useState(null);
    const [dangerous, setDangerous] = useState(null);
    const [lifeSupport, setLifeSupport] = useState(null);

    // Condition to check if all answers are "No"
    const allNo = lifeThreatening === 'No' && dangerous === 'No' && lifeSupport === 'No';

    // Leave & Back Modal States
    const [leave_mVis, leave_set_mVis] = useState(false);
    const [leave_mTitle, leave_set_mTitle] = useState('');
    const [leave_mContent, leave_set_mContent] = useState('');
    const [leave_mBtnL, leave_set_mBtnL] = useState('');
    const [leave_mBtnR, leave_set_mBtnR] = useState('');
    const [leave_mPageOn, leave_set_mPageOn] = useState(0);

    // Function to show Leave Modal
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
                    <View style={{ width: '100%', ...sharedStyle.progressBar }} />
                </View>
            </View>

             {/* ---------- Confirmation Content ---------- */}
             <View style={{ alignItems: 'center', justifyContent: 'center', padding: 20, marginTop: 50 }}>
                <AntDesign name="checkcircle" size={100} color="green" style={{ marginBottom: 30 }} />
                <Text style={[sharedStyle.subPromptTxt, { textAlign: 'center' }]}>
                    Thank you for letting us know about the outage, our team will contact you shortly
                </Text>
            </View>


            {/* ---------- Tail Section ---------- */}
            <View style={sharedStyle.tailCtn}>
       
                <View style={sharedStyle.tailBtnContainer}>
                    <TouchableOpacity 
                        style={[sharedStyle.tailOneBtn, mainStyle.btn_selected]}
                        onPress={() => {  router.push('/(tabs)/mapview'); }}>
                        <Text style={[sharedStyle.tailOneBtnTxt, mainStyle.txt_selected]}>
                            Back to Home
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* ---------- Modals ---------- */}
            {/* Emergency Modal */}
    
            {/* Leave Modal */}
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
