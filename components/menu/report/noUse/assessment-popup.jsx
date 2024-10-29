import React from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import reportPopStyle from '../report_style/reportPopStyle';
import reportStyle from '../report_style/reportStyle';
import { useRouter } from 'expo-router';

export default function asse_mPop({ visible, onClose, title, msg, page  }) {
    const router = useRouter();

    return (
        <Modal
            animationType="none"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={reportPopStyle.pop_mCtnr}>
                <View style={reportPopStyle.pop_mView}>
                    {/* Close Button */}
                    <TouchableOpacity onPress={onClose}>
                        <AntDesign name="close" size={24} color="black" />
                    </TouchableOpacity>

                    <View style={reportPopStyle.pop_mCnt}>
                        {/* Emergency Alert Title */}
                        <Text style={reportPopStyle.pop_mTitle}>{title}</Text>

                        {/* Alert Description */}
                        <Text style={reportPopStyle.pop_mTxt}>{msg}</Text>

        
                         {/* Button Row */}
                         <View style={reportStyle.btnCtn}>
                            {/* Go Back Button */}
                            <TouchableOpacity 
                                style={[reportStyle.btn, reportStyle.leftBtn]} 
                                onPress={() => {router.push("/(menu)/report") }}
                            >
                                <Text style={reportStyle.btnTxt}>Back to home</Text>
                            </TouchableOpacity>

                            {/* Leave Button */}
                            <TouchableOpacity 
                                style={[reportStyle.selectedBtn, reportStyle.rightBtn, reportStyle.btn]}
                                onPress={() => {(router.push("/(report)/r_report08"))}}
                            >
                                <Text style={reportStyle.selectedBtnTxt}>Continue</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
}
