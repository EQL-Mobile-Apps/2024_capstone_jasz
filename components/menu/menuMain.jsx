import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link, router } from 'expo-router'
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import menuStyle from './menuStyle';

import { logoutUser } from '../../context/actions/userAction';
import { useDispatch } from 'react-redux';
import { useRouter } from 'expo-router';

import { useSelector } from 'react-redux';
import LeaveModal from './users/leaveMConfirm'; 

export default function MenuMain () {
    const router = useRouter();
    const dispatch = useDispatch();

    const user = useSelector((state) => state.userReducer.user); 


    const [leave_mVis, leave_set_mVis] = useState(false);
    const [leave_mTitle, leave_set_mTitle] = useState('');
    const [leave_mContent, leave_set_mContent] = useState('');
    const [leave_mBtnL, leave_set_mBtnL] = useState('');
    const [leave_mBtnR, leave_set_mBtnR] = useState('');
    const [leave_mPageOn, leave_set_mPageOn] = useState(0);

  const showLeaveModal = (title, content, btnL, btnR, pageOn) => {
      leave_set_mVis(true);
      leave_set_mTitle(title);
      leave_set_mContent(content);
      leave_set_mBtnL(btnL);
      leave_set_mBtnR(btnR);
      leave_set_mPageOn(pageOn);
  };

    const handleLogout = () => {
        dispatch(logoutUser());
        router.push("/menu"); 
    };

    const handleModalResponse = (response) => {
        if (response === "Leave") {
          handleLogout(); 
        }
        leave_set_mVis(false); 
    };
  return (
    <SafeAreaView style={{flex:1, backgroundColor:"white"}}>
        
        <View style={menuStyle.menu_header}>
            <Image style={menuStyle.menu_image} source={require('../../assets/Energex-logo.png')}/>
            <TouchableOpacity style={menuStyle.menu_backButton} onPress={()=>{
                router.back()
            }}>
                <AntDesign name="close" size={30} color="black" />
            </TouchableOpacity>
        </View>

        <View style={menuStyle.menu_navContainer}>
        <View>
          {/* Checking if there is a user */}
          {user ? (
            user.isGuest ? ( // Check if the user is a guest
              <Text style = {menuStyle.menu_item_welcome}>Welcome</Text>
            ) : ( // If not a guest, it means a regular user is signed in
              <Text style = {menuStyle.menu_item_welcome}>Welcome, {user.firstname}!</Text>
            )
          ) : (
            <Text style = {menuStyle.menu_item_welcome}>Welcome</Text> // Before signing in, show default message
          )}
        </View>
       
            <Link push href="/(menu)/setting" asChild>
            
                <TouchableOpacity style={menuStyle.menu_nav}>
                    <FontAwesome name="cog" size={24} color="black" />
                    <Text style={menuStyle.menu_nav_text}>Setting</Text>
                </TouchableOpacity>
            </Link>
            
            {/* <TouchableOpacity style={menuStyle.menu_nav}>
                <FontAwesome5 name="house-user" size={19} color="black" />
                <Text style={menuStyle.menu_nav_text}>My properties</Text>
            </TouchableOpacity> */}

            <Link push href="/(menu)/report" asChild>
            {/* <Link push href="/(report)/r_report04" asChild> */}
                <TouchableOpacity style={menuStyle.menu_nav}>
                    <MaterialIcons name="report" size={22} color="black" />
                    <Text style={menuStyle.menu_nav_text}>Report an Outage</Text>
                </TouchableOpacity>
            </Link>

            <View style={menuStyle.menu_hr}/>

            <Link push href="/(menu)/link" asChild>
                <TouchableOpacity style={menuStyle.menu_nav}>
                    <AntDesign name="link" size={22} color="black" />
                    <Text style={menuStyle.menu_nav_text}>Links</Text>
                </TouchableOpacity>
            </Link>
            {user ? (
               <View>
           
               <TouchableOpacity 
               style={menuStyle.menu_nav} 
               onPress={() => {
                 showLeaveModal(
                   "Sign off", 
                   "Are you sure you want to sign off your account?",
                   "Stay", "Leave", 0
                 );
               }}
             >
                <FontAwesome name="user" size={24} color="black" />
               <Text style={menuStyle.menu_nav_text}>Sign out</Text>
             </TouchableOpacity>
             </View> 
             
                
            ) : (
                <>
                    <Link push href="/(user)/signin" asChild>
                        <TouchableOpacity style={menuStyle.menu_nav} >
                            <FontAwesome name="user" size={24} color="black" />
                            <Text style={menuStyle.menu_nav_text}>Sign in</Text>
                        </TouchableOpacity>
                    </Link>
                </>
            )}

         


        </View>
        <LeaveModal
                visible={leave_mVis}
                onClose={() => leave_set_mVis(false)}
                title={leave_mTitle}
                content={leave_mContent}
                btnL={leave_mBtnL}
                btnR={leave_mBtnR}
                pageOn={leave_mPageOn}
                onLeftPress={() => handleModalResponse("Stay")}  
                onRightPress={() => handleModalResponse("Leave")} 
            />

    </SafeAreaView>
  )
}