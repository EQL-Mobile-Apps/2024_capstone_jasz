import React, { useState } from 'react';
import { SafeAreaView, Alert, TextInput, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { Divider } from '@rneui/themed';
import { useRouter } from 'expo-router';
import * as turf from '@turf/turf';
import AntDesign from '@expo/vector-icons/AntDesign';


import style from './userStyle';
import LeaveModal from './leaveConfirm'; 


export default function MockJsonFileExample() {
  const router = useRouter();
  const [userData, setUserData] = useState({ users: [] });
  const [firstname, setFirst] = useState('');
  const [lastname, setLast] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [NMI, setNMI] = useState(['']);
  const [propertyInputs, setPropertyInputs] = useState(['']);
  const [isOwner, setIsOwner] = useState(false);
  const [hintText, setHintText] = useState('');
  const [hintPropText, setHintPropText] = useState('');
  const [verAddress, setVerAddress] = useState(false);
  const [verifiedProperties, setVerifiedProperties] = useState([]);
  const [editableProperties, setEditableProperties] = useState([]);
  const [hintTexts, setHintTexts] = useState([]);

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



  const toggleEditProperty = (idx) => {
    setEditableProperties((prevState) =>
      prevState.includes(idx)
        ? prevState.filter((i) => i !== idx) // Remove from editable properties if already editable
        : [...prevState, idx] // Add to editable properties if not editable
    );
    
    // Reset verification status when edit is enabled
    if (verifiedProperties.includes(idx)) {
      setVerifiedProperties((prevState) => prevState.filter((i) => i !== idx));
    }
  };
  

  // Handle property input change
  const handlePropertyInputChange = (text, idx) => {
    const newProperties = [...propertyInputs];
    newProperties[idx] = text;
    setPropertyInputs(newProperties);
  };

  // Handle NMI input change
  const handleNMIInputChange = (text, idx) => {
    const newNMIs = [...NMI];
    newNMIs[idx] = text;
    setNMI(newNMIs);
  };

  // Remove property
  const handleRemoveProperty = (idx) => {
    setVerAddress(true);
    setPropertyInputs(propertyInputs.filter((_, i) => i !== idx));
    setNMI(NMI.filter((_, i) => i !== idx));
    
  };

  // Add new property
  const addProperty = () => {
    const lastPropertyIndex = propertyInputs.length - 1;
  
    // Check if the last property is verified
    if (verifiedProperties.includes(lastPropertyIndex)) {
      // If the last property is verified, allow adding a new property
      setPropertyInputs([...propertyInputs, '']);
      setNMI([...NMI, '']);
      setHintPropText(''); // Clear the hint text when a new property is added
      setVerAddress(false)
    } else {
      // If the last property is not verified, show a hint
      setHintPropText('Please verify your address before adding a new property.');
      setVerAddress(false)
    }
  };
  

  // Add custom user
  const addCustomUser = async () => {
    if (!firstname || !lastname || !email || !password) {
      setHintText('All fields must be filled.');
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstname,
          lastname,
          email,
          password,
          NMIs: NMI.filter(input => input.trim() !== ''),
          properties: isOwner ? propertyInputs.filter(input => input.trim() !== '') : [],
        }),
      });
      const data = await response.json();
      Alert.alert('Success!', 'Sign up successful');
      setUserData(prevState => ({
        users: [...prevState.users, data],
      }));
      resetForm();
      router.push('/(user)/signin');
    } catch (error) {
      Alert.alert('Error!', 'Failed to add user.');
      console.error('Error adding user:', error);
    }
  };

  // Check if the point is within the service area using Turf.js
  const checkPointInServiceArea = async (longitude, latitude) => {
    try {
      const response = await fetch(process.env.REACT_APP_SERVICE_AREA);
      const geojsonData = await response.json();
      const point = turf.point([longitude, latitude]);

      for (const feature of geojsonData.features) {
        const polygon = feature.geometry;
        if (turf.booleanPointInPolygon(point, polygon)) {
          setVerAddress(true);
          setHintPropText('');
          return true;
        }
      }
      setVerAddress(false);
      setHintPropText('This address is not in our service area');
      return false;
    } catch (error) {
      console.error('Error checking service area:', error);
      return false;
    }
  };

  // Check the validity of the address
  const checkAddress = async (searchAddress, idx) => {
    try {
      const encodedAddress = encodeURIComponent(searchAddress);
      const response = await fetch(`https://geocode.maps.co/search?q=${encodedAddress}&api_key=66ece8fb3e0ed406497595pmk8ad8a6`);
  
      if (!response.ok) throw new Error('Network response was not ok');
  
      const addresses = await response.json();
  
      if (addresses.length > 0) {
        const { lat, lon } = addresses[0];
        const isInServiceArea = await checkPointInServiceArea(lon, lat);
  
        if (isInServiceArea) {
          // Only lock the input and verify if the address is in the service area
          setVerifiedProperties((prevState) => [...prevState, idx]);
          updateHintText(idx, '');
        } else {
          // If not in the service area, allow input to remain editable
          updateHintText(idx, 'This address is not in our service area.');
        }
      } else {
        updateHintText(idx, 'Address not found.');
        setVerAddress(false)
      }
    } catch (error) {
      console.error('Error fetching address:', error);
      updateHintText(idx, 'An error occurred while verifying the address.');
      setVerAddress(false)
    }
  };
  
  
  // Function to update the hint text for a specific property index
  const updateHintText = (idx, text) => {
    setHintTexts((prevState) => {
      const newHints = [...prevState];
      newHints[idx] = text;
      return newHints;
    });
  };
  

  // Reset the form
  const resetForm = () => {
    setFirst('');
    setLast('');
    setEmail('');
    setPassword('');
    setPropertyInputs(['']);
    setNMI(['']);
    setIsOwner(false);
  };

  return (
    <SafeAreaView style={style.mainCtn}>
      <ScrollView showsVerticalScrollIndicator={false}>
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
        <Text style={style.title}>Sign Up</Text>

        <View style={style.inputRow}>
          <TextInput
            style={[{ marginRight: 10 }, style.halfInput]}
            placeholder="First Name"
            value={firstname}
            onChangeText={setFirst}
          />
          <TextInput
            style={[{ marginLeft: 10 }, style.halfInput]}
            placeholder="Last Name"
            value={lastname}
            onChangeText={setLast}
          />
        </View>

        <TextInput
          style={style.inputBar}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={style.inputBar}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <Divider style={style.divider} />

        <View style={style.propertiesCtn}>
          <Text style={[{ marginBottom: 10 }, style.subPromptTxt]}>Would you like to add your property?</Text>
          <View style={style.inputRow}>
            <TouchableOpacity
              style={[{ marginRight: 5 }, style.btn, !isOwner && style.btnSelected]}
              onPress={() => setIsOwner(false)}
            >
              <Text style={[style.btnTxt, !isOwner && style.txt_btnSelected]}>No</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[{ marginLeft: 5 }, style.btn, isOwner && style.btnSelected]}
              onPress={() => setIsOwner(true)}
            >
              <Text style={[style.btnTxt, isOwner && style.txt_btnSelected]}>Yes</Text>
            </TouchableOpacity>
          </View>

          {isOwner && propertyInputs.map((_, idx) => (
            <View key={idx} style={style.propertyCtn}>
            <Text style={style.hintText}>{hintTexts[idx]}</Text>
            <View style={style.inputRow}>
              <Text style={style.propertyTxt}>Property number {idx + 1}</Text>
          
              {idx !== 0 && (
                <TouchableOpacity onPress={() => handleRemoveProperty(idx)}>
                  <Text style={style.cancelTxt}>Remove</Text>
                </TouchableOpacity>
              )}
            </View>
          
     
           
          
            <TextInput
              style={style.inputBar}
              placeholder={`Enter Property Address ${idx + 1}`}
              value={propertyInputs[idx]}
              onChangeText={(text) => handlePropertyInputChange(text, idx)}
              editable={!verifiedProperties.includes(idx)} // Allow edit if not verified
            />
          
            <TextInput
              style={style.inputBar}
              placeholder="NMI"
              value={NMI[idx]}
              onChangeText={(text) => handleNMIInputChange(text, idx)}
              editable={!verifiedProperties.includes(idx)} // Allow edit if not verified
            />
          
            <View style={style.inputRow}>
              {/* Only show the "Edit" button if the property is verified */}
              {verifiedProperties.includes(idx) ? (
                  <TouchableOpacity onPress={() => toggleEditProperty(idx)}>
                    <Text>Edit</Text>
                  </TouchableOpacity>
                ) : (
                  <Text></Text>  
                )}

          
              <TouchableOpacity
                style={{ justifyContent: 'center', alignItems: 'flex-end' }}
                disabled={verifiedProperties.includes(idx)}
                onPress={() => checkAddress(propertyInputs[idx], idx)}
              >
                <Text style={verifiedProperties.includes(idx) ? style.verifiedTxt : style.propertyTxt}>
                  {verifiedProperties.includes(idx) ? 'Verified' : 'Verify Address'}
                </Text>
              </TouchableOpacity>
            </View>
            <Divider style={style.lightDivider} />
          </View>
          
          
          ))}

          
{isOwner && (
  <>
    <Text style={style.hintText}>{hintPropText}</Text>

    <TouchableOpacity
      style={[style.btn, { marginLeft: 5 }, verAddress ? style.btnSelected : style.btnDisabled]}
      onPress={addProperty}
    >
      <Text style={[verAddress ? style.txt_btnSelected : style.btntxtDisable]}>Add Property</Text>
    </TouchableOpacity>
  </>
)}

        </View>

        <View style={style.endCtn}>
        <Text style={style.hintText}>{hintText}</Text>

          <TouchableOpacity  style={[style.oneSubmitBtn, style.oneBtn, style.btnSelected]} onPress={addCustomUser}>
            <Text style={[style.oneBtnTxt, style.txt_btnSelected]}>Sign up</Text>
          </TouchableOpacity>
          <View style={style.bottomCtn}>
          <TouchableOpacity onPress={() => router.push('/(user)/signin')}>
            <Text >Already have an account? Sign in here</Text>
          </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

    
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
