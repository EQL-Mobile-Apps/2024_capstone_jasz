import React from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import popStyle from '../report/report_style/report_popStyle';


export default function leave_mPop({ visible, onClose, title, content, btnL, btnR }) {
    const router = useRouter();
    const handleLeave = () => {
        onClose();
        router.push("/menu");
    };
    return (
        <Modal
            animationType="none"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={popStyle.popCtn}>
                <View style={popStyle.popView}>
                    {/* Close Button */}
                    <TouchableOpacity onPress={onClose}>
                        <AntDesign name="close" size={24} color="black" />
                    </TouchableOpacity>
                
                    <View style={popStyle.popContent}>
                        {/* Title */}
                        <Text style={popStyle.popTitle}>{title}</Text>

                        {/* Content */}
                        <Text style={popStyle.popTxt}>{content}</Text>

                        {/* Button Row */}
                        <View style={popStyle.tailTwoBtnCtn}>
                            {/* Go Back Button */}
                            <TouchableOpacity 
                                style={[{ marginRight: 5 }, popStyle.btn]} 
                                onPress={onClose}
                            >
                                <Text style={popStyle.twoBtnTxt}>{btnL}</Text>
                            </TouchableOpacity>

                            {/* Leave Button */}
                            <TouchableOpacity 
                                style={[{ marginLeft: 5 }, popStyle.btn, , popStyle.leaveBtn]} 
                                onPress={handleLeave}
                            >
                                <Text style={[popStyle.twoBtnTxt, popStyle.leaveTxt]}>{btnR}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
}
