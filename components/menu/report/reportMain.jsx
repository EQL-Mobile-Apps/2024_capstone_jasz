import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';

import { useRouter } from 'expo-router';
import { Divider } from '@rneui/themed';

import mainStyle from './report_style/report_mainStyle';
import sharedStyle from './report_style/report_sharedStyle';

import EmergencyModal from './report_popup/emergency-popup'; 
import LeaveModal from './report_popup/leave-popup'; 
import { ScrollView } from 'react-native-gesture-handler';


export default function ReportMain() {

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
    const leave_show_m = (title, content, btnL, btnR, pageOn) => {
        leave_set_mVis(true);
        leave_set_mTitle(title);
        leave_set_mContent(content);
        leave_set_mBtnL(btnL);
        leave_set_mBtnR(btnR);
        leave_set_mPageOn(pageOn);
    };

    // Emergency Modal States
    const [emerg_mVis, emerg_set_mVis] = useState(false);
    const [emerg_mTitle, emerg_set_mTitle] = useState('');
    const [emerg_mMessage, emerg_set_mMsg] = useState('');
    const [emerg_mTxtCo, emerg_set_mTxtCo] = useState('');

    // Function to show Emergency Modal
    const emerg_show_m = (title, message, color) => {
        emerg_set_mTitle(title);
        emerg_set_mMsg(message);
        emerg_set_mTxtCo(color);
        emerg_set_mVis(true);
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
                <View style={sharedStyle.progressBarCtn}>
                    <View
                        style={{ width: '0%', ...sharedStyle.progressBar }}
/>
                </View>
            </View>

            {/* ---------- Content ---------- */}
            <ScrollView showsVerticalScrollIndicator={false}>
            <View style={sharedStyle.contentCtn}>
                {/* Safety Message */}
                
                <View style={sharedStyle.topContentCtn}> 
                    <Text style={sharedStyle.titleTxt}>Safety First</Text>
                    <Text style={sharedStyle.subTxt}>
                        Your safety is our utmost priority. Before proceeding with your report, please consider the following:
                    </Text>
                </View>

                {/* Questions */}
                <View style={[{marginBottom: 20}, sharedStyle.midContentCtn]}> 
                    {/* Question 1: Life-threatening */}
                    <View style={sharedStyle.subcontentCtn}>
                        <Divider style={sharedStyle.dividerNormal} /> 
                        <Text style={sharedStyle.subPromptTxt}>Are you currently in a life-threatening situation?</Text>
                        <View style={mainStyle.twoBtnCtn}>
                            <TouchableOpacity 
                                style={[ { marginRight: 5 },
                                    mainStyle.btn,  
                                    lifeThreatening === 'No' && mainStyle.btn_selected
                                ]} 
                                onPress={() => setLifeThreatening('No')}>
                                <Text style={[
                                    mainStyle.twoBtnTxt,  
                                    lifeThreatening === 'No' && mainStyle.txt_selected
                                ]}>No</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={[ { marginLeft: 5 }, mainStyle.btn]}
                                onPress={() => { 
                                    setLifeThreatening('Yes'); 
                                    emerg_show_m(
                                        'Emergency Alert', 
                                        <Text>
                                            Please call <Text style={{ color: '#D62839', fontWeight: 'bold' }}>000</Text> immediately. Do not proceed with this report until you are safe.
                                        </Text>, 
                                        'red'
                                    );
                                }}>
                                <Text style={mainStyle.twoBtnTxt}>Yes</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Question 2: Dangerous environment */}
                    <View style={sharedStyle.subcontentCtn}>
                        <Divider style={sharedStyle.dividerNormal} />
                        <Text style={sharedStyle.subPromptTxt}>Are you in a dangerous situation?</Text>
                        <View style={mainStyle.twoBtnCtn}>
                            <TouchableOpacity 
                                style={[ { marginRight: 5 },
                                    mainStyle.btn, 
                                    dangerous === 'No' && mainStyle.btn_selected
                                ]} 
                                onPress={() => setDangerous('No')}>
                                <Text style={[
                                    mainStyle.twoBtnTxt, 
                                    dangerous === 'No' && mainStyle.txt_selected
                                ]}>No</Text>
                            </TouchableOpacity>


                            <TouchableOpacity 
                                style={[{marginLeft: 5}, mainStyle.btn]}
                                onPress={() => { 
                                    setDangerous('Yes');
                                    emerg_show_m(
                                        'Danger Alert', 
                                        <Text>
                                            Stay away from the area. Call <Text style={{ color: '#F3A712', fontWeight: 'bold' }}>13 19 62</Text> or <Text style={{ color: 'red', fontWeight: 'bold' }}>000</Text>.
                                        </Text>, 
                                        '#F3A712'
                                    );
                                }}>
                                <Text style={mainStyle.twoBtnTxt}>Yes</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Question 3: Life-support equipment */}
                    <View style={sharedStyle.subcontentCtn}>
                        <Divider style={sharedStyle.dividerNormal} />
                        <Text style={sharedStyle.subPromptTxt}>Do you rely on life-support equipment?</Text>
                        <View style={mainStyle.twoBtnCtn}>
                            <TouchableOpacity 
                                style={[ { marginRight: 5 },
                                    mainStyle.btn, 
                                    lifeSupport === 'No' && mainStyle.btn_selected
                                ]} 
                                onPress={() => setLifeSupport('No')}>
                                <Text style={[
                                    mainStyle.twoBtnTxt,
                                    lifeSupport === 'No' && mainStyle.txt_selected
                                ]}>No</Text>
                            </TouchableOpacity>

                            <TouchableOpacity 
                                style={[{marginLeft: 5}, mainStyle.btn]}
                                onPress={() => { 
                                    setLifeSupport('Yes');
                                    emerg_show_m(
                                        'Life Support', 
                                        <Text>
                                            Call <Text style={{ color: '#F3A712', fontWeight: 'bold' }}>13 19 62</Text>. If in immediate danger, call <Text style={{ color: 'red', fontWeight: 'bold' }}>000</Text>.
                                        </Text>, 
                                        '#F3A712'
                                    );
                                }}>
                                <Text style={mainStyle.twoBtnTxt}>Yes</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
            </ScrollView>
            {/* ---------- Tail Section ---------- */}
            <View style={sharedStyle.tailCtn}>
                {!allNo && (
                    <View style={sharedStyle.hintTxtCtn}>
                        <Text style={sharedStyle.hintTxt}>Answer all three questions to proceed</Text>
                    </View>
                )}
                <View style={sharedStyle.tailBtnContainer}>
                    <TouchableOpacity 
                        style={[sharedStyle.tailOneBtn, allNo ? mainStyle.btn_active : mainStyle.btn_disabled]}
                        disabled={!allNo}
                        onPress={() => { if (allNo) { router.push('/(report)/r_report01'); } }}>
                        <Text style={[sharedStyle.tailOneBtnTxt, allNo ? mainStyle.txt_active : mainStyle.txt_disabled]}>
                            Start Reporting
                        </Text>
                    </TouchableOpacity>
                </View>
                
            </View>
           
            

            {/* ---------- Modals ---------- */}
            {/* Emergency Modal */}
            <EmergencyModal
                visible={emerg_mVis}
                onClose={() => emerg_set_mVis(false)}
                title={emerg_mTitle}
                message={emerg_mMessage}
                color={emerg_mTxtCo}
            />
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