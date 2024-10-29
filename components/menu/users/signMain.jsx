

import React from 'react';
import { useRouter } from 'expo-router';
import { SafeAreaView, Text, TouchableOpacity, Image, StyleSheet, View } from 'react-native';
import style from './userStyle';


export default function SignPage() {
  const router = useRouter();
  return (
    <SafeAreaView style={[{justifyContent: 'center', alignItems: 'center',}, style.mainCtn]}>
      {/* Logo Section */}
      <View style={style.imgCtn}>
        <Image style={style.logo} source={require('../../../assets/Energex-logo.png')} />
      </View>

      {/* Buttons Section */}
      <View style={style.btnCtn}>
        <TouchableOpacity style={[style.optionOneBtn, style.oneBtn]} onPress={() => { router.push("/(user)/signin") }}>
          <Text style={style.oneBtnTxt}>Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[style.optionOneBtn, style.oneBtn]} onPress={() => { router.push("/(user)/signup") }}>
          <Text style={style.oneBtnTxt}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[style.oneSubmitBtn, style.oneBtn, style.btnSelected]} onPress={() => { router.push("/(tabs)/mapview")}}>
          <Text style={[ style.oneBtnTxt, style.txt_btnSelected]}>Continue as guess</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}