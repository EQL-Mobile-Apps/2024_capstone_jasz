import { View, SafeAreaView, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'expo-router';

import AntDesign from '@expo/vector-icons/AntDesign';

import { setUser } from '../../../context/actions/userAction';

import style from './userStyle';
import LeaveModal from './leaveConfirm'; 


export default function SignInPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

  // Function for regular sign-in
  const handleSignIn = async () => {
    await fetch(`${process.env.REACT_APP_API_URL}`)
      .then((response) => response.json())
      .then((users) => {
        const user = users.find(u => u.email === email);
        if (user) {
          if (user.password === password) {
            Alert.alert('Success', `Welcome back, ${user.firstname}!`);
            
            // Dispatch authenticated user data to Redux
            dispatch(setUser(user));
            router.push("/menu");
          } else {
            Alert.alert('Error', 'Invalid password.');
          }
        } else {
          Alert.alert('Error', 'User not found.');
        }
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
        Alert.alert('Error', 'There was a problem with the sign-in.');
      });
  };

  // Function for guest sign-in
  const handleGuestSignIn = () => {
    // Option 1: Dispatch a "guest" object to Redux
    const guestUser = {
      firstname: "Guest",
      isGuest: true,
    };
    dispatch(setUser(guestUser));
    
    // Option 2: Dispatch null to indicate no user signed in
    // dispatch(setUser(null));
    
    // Navigate to mapview
    router.push("/(tabs)/mapview");
  };


  return (
    <SafeAreaView style={[{ justifyContent: "center" }, style.mainCtn]}>
      

      <View style={style.headCtn}> 
            {/* Close button */}
            <TouchableOpacity 
                style={style.closeBtn}
                onPress={() => {
                  showLeaveModal(
                        "Leave Sign in", 
                        "Are you sure you want to leave the sign in page",
                        "Stay", "Leave", 0 
                    );
                }}>
                <AntDesign name="close" size={40} color="black" />
            </TouchableOpacity>
            
        </View>

      <Text style={style.title}>Sign In</Text>

      {/* Email Input */}
      <TextInput
        style={style.inputBar}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      {/* Password Input */}
      <TextInput
        style={style.inputBar}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
        autoCorrect={false}
      />

      {/* Sign In Button */}
      <TouchableOpacity style={[style.oneSubmitBtn, style.oneBtn]} onPress={handleSignIn}>
        <Text style={style.oneBtnTxt}>Sign In</Text>
      </TouchableOpacity>
      
      {/* Continue as Guest Button */}
      <TouchableOpacity style={[style.oneSubmitBtn, style.oneBtn, style.btnSelected]} onPress={handleGuestSignIn}>
        <Text style={[style.oneBtnTxt, style.txt_btnSelected]}>Continue as Guest</Text>
      </TouchableOpacity>

      {/* Links for Forgot Password and Sign Up */}
      <View style={style.bottomCtn}> 
        <TouchableOpacity onPress={() => { router.push("/(user)/signup") }}>
          <Text>Don't have an account? Sign up here!</Text> 
        </TouchableOpacity>
        <TouchableOpacity style={style.link}> 
          <Text>Forgot Password?</Text> 
        </TouchableOpacity>
      </View>

      <LeaveModal
    visible={leave_mVis}
    onClose={() => leave_set_mVis(false)}
    title={leave_mTitle}
    content={leave_mContent}
    btnL={leave_mBtnL}
    btnR={leave_mBtnR}
    onLeftPress={() => handleModalResponse("Stay")}  // Handle the "Stay" button
    onRightPress={() => handleModalResponse("Leave")} // Handle the "Leave" button
  />

  
    </SafeAreaView>
  );
}
