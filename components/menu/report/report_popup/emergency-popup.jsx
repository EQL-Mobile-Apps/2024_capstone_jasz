import React from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Modal, View, Text, TouchableOpacity } from 'react-native';

import popStyle from '../report_style/report_popStyle';

export default function emrg_mPop({ visible, onClose, title, message, color }) {

    
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
                        {/* Emergency Alert Title */}
                        <Text style={popStyle.popTitle}>{title}</Text>

                        {/* Alert Description */}
                        <Text style={popStyle.popTxt}>{message}</Text>

                        {/* Call 000 Button */}
                        <TouchableOpacity
                            style={[
                                popStyle.popBtn,
                                { backgroundColor: color || 'red', borderColor: color || 'red' },
                            ]}
                            onPress={onClose}
                        >
                            <Text style={popStyle.popBtnTxt}>Call 000</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}
