import { ScrollView, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from 'expo-router';
import { Divider } from '@rneui/themed';
import mainStyle from './report_style/report_mainStyle';
import sharedStyle from './report_style/report_sharedStyle';

// Modal component for leaving the report process
import LeaveModal from './report_popup/leave-popup';
  
export default function Report03() {
    const router = useRouter(); 

    // State for which property option is selected
    const [urProperty, setUrProperty] = useState('');
    const [ownedProp, setOwnProp] = useState(null);

    // Modal states for leave confirmation
    const [leave_mVis, leave_set_mVis] = useState(false);
    const [leave_mTitle, leave_set_mTitle] = useState('');
    const [leave_mContent, leave_set_mContent] = useState('');
    const [leave_mBtnL, leave_set_mBtnL] = useState('');
    const [leave_mBtnR, leave_set_mBtnR] = useState('');
    const [leave_mPageOn, leave_set_mPageOn] = useState(0);

    const [hintText, setHintText] = useState('');


    // Situation dropdown states
    const [optionSitSelect, setOptionSitSelect] = useState(false);
    const [selectedSitOption, setSelectedSitOption] = useState('');
    const [selectedSitVal, setSelectedSitVal] = useState('');

    // Switchboard dropdown states
    const [showSwitch, setShowSwitch] = useState(false);
    const [optionSwitchSelect, setOptionSwitchSelect] = useState(false);
    const [selectedSwitchOption, setSelectedSwitchOption] = useState('');
    const [selectedSwitchVal, setSelectedSwitchVal] = useState('');

    // 
    const [showNext, setShowNext] = useState(false); 

    const [nextRoute, setNextRoute] = useState("/(report)/r_report04");


    // 
    const [asseNoPower, setAsseNoPower] = useState(false);
    const [assePay, setAssePay] = useState(false);
    const [billPaid, setBillPaid] = useState();


    const sitPicked = selectedSitVal !== ''; 
    const switchPicked = selectedSwitchVal !== ''; 

    // Situation options
    const options_situation = [
        'Whole Property is without power', // switch
        'Part of property is without power',  // switch
        'Power goes on and off',  // final
        'Lights are dim or flickering', // final
        'None of the above' // final
    ];

    // Switchboard options
    const options_switch = [
        'Switches are all on but no power', // try to switch them on -> final
        'Safety switch keeps turning off', // // try to switch them on -> still check for faulty appliance-> final
        'Dial or meter not running', // paying bill -> no - final 
        'I am unsure', // final
        'My power is restored', // yay
        'None of the above' // final
    ];



    // Function to show the leave confirmation modal
    const showLeaveModal = (title, content, btnL, btnR, pageOn) => {
        leave_set_mVis(true);
        leave_set_mTitle(title);
        leave_set_mContent(content);
        leave_set_mBtnL(btnL);
        leave_set_mBtnR(btnR);
        leave_set_mPageOn(pageOn);
    };

    // const handleNext = () => {
    //     if (urProperty === '0') { 
    //         router.push("/(report)/r_report08"); // Go to warning first
    //     } else if (urProperty === '1') {
    //         router.push("/(report)/r_report04"); // Proceed to next report page
    //     } else {
    //         console.log("Unhandled pageOn value:", urProperty);
    //     }
    // };

    const handleSituation = (index) => {
        if (index === 0 || index === 1) { 
            setShowSwitch(true); 
            setAssePay(false);
            setBillPaid(true);
            setHintText("please choose your switchboard's status")
        } else {
            setHintText("please choose Next to continue")
            setNextRoute("/(report)/r_report04")
            setShowSwitch(false); 
            setShowNext(true);
            setAssePay(false)
            setBillPaid(true)
        }
    };
    const handleNext = () => {
        router.push(nextRoute);

    };

    const handleSwitch = (index) => {
        if (index === 1) { 
            setHintText("if you are unsure! Please choose Next to continue")
            setAsseNoPower(true)
            setShowNext(true);
        } 
        else if (index === 2) {
            setHintText("")
            setAssePay(true)
            setAsseNoPower(false);
            setShowNext(false);
        }
        
        else {
            setHintText("Please choose Next to continue")
            setAsseNoPower(false)
            setShowNext(true);
            setAssePay(false)
            setBillPaid(true)
        }

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
                    <View style={{ width: '50%', ...sharedStyle.progressBar }} />
                </View>
            </View>

            {/* ------- Content ------- */}
            <ScrollView showsVerticalScrollIndicator={false}> 
                <View style={sharedStyle.contentCtn}> 
                    <Text style={sharedStyle.promptTxt}>Fault Detail</Text>
                    <View style={sharedStyle.subcontentCtn}> 
                        <Text style={sharedStyle.subPromptTxt}>Are you reporting an issue relating to your property?</Text>
                        <View style={mainStyle.twoBtnCtn}>
                            <TouchableOpacity 
                                style={[ { marginRight: 5 }, mainStyle.btn, ownedProp === false && mainStyle.btn_selected ]} 
                                onPress={() => {setOwnProp(false); setShowSwitch(false); setShowNext(true);}}>
                                <Text style={[ mainStyle.twoBtnTxt, ownedProp === false && mainStyle.txt_selected ]}>No</Text>
                            </TouchableOpacity>

                            <TouchableOpacity 
                                style={[{ marginLeft: 5 }, mainStyle.btn, ownedProp === true && mainStyle.btn_selected ]}
                                onPress={() => {setOwnProp(true); setShowNext(false);}}>
                                <Text style={[ mainStyle.twoBtnTxt, ownedProp === true && mainStyle.txt_selected ]}>Yes</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Situation dropdown */}
                    {ownedProp && (
                        <>
                            <Divider style={sharedStyle.dividerNormal} /> 
                            <View style={sharedStyle.subcontentCtn}> 
                           
                                <Text style={sharedStyle.subPromptTxt}>Select an option that best describes your situation:</Text>
                                
                                {/* Drop-down button */}
                                <TouchableOpacity onPress={() => {setOptionSitSelect(!optionSitSelect); setShowSwitch(false)}}>
                                    <View style={mainStyle.dropdownBox}>
                                        <Text style={[mainStyle.dropdownText, mainStyle.dropdownSelectedText]}>
                                            {selectedSitOption || 'Select an option'}
                                        </Text>
                                        <AntDesign name="down" size={20} color="black" style={mainStyle.dropIcon}/>
                                    </View>
                                </TouchableOpacity>

                                {/* Show drop-down options */}
                                {optionSitSelect && (
                                    <ScrollView style={[mainStyle.dropdownMenu, mainStyle.shadow]}>
                                        {options_situation.map((option, index) => (
                                            <View key={index}>
                                                <TouchableOpacity 
                                                    style={mainStyle.dropdownItem} 
                                                    onPress={() => {
                                                        setSelectedSitOption(option);
                                                        setOptionSitSelect(false);
                                                        setSelectedSitVal(index); 
                                                        handleSituation(index);
                                                    }}
                                                >
                                                    <Text style={mainStyle.dropdownText}>{option}</Text>
                                                </TouchableOpacity>
                                                {index < options_situation.length - 1 ? ( 
                                                    <Divider style={sharedStyle.lightdivider} />
                                                ): 
                                                <Divider style={sharedStyle.nodivider} />}
                                            
                                            </View>
                                        ))}
                                    </ScrollView>
                                )}
                            </View>
                        </>
                    )}

                    {/* Switchboard dropdown */}
                      {showSwitch && (
            <>
                <Divider style={sharedStyle.dividerNormal} /> 
                <View style={[{marginBottom: 30}, sharedStyle.subcontentCtn]}> 
                    <Text style={{fontSize: 22, fontWeight: 'bold', marginVertical: 2 }}>Troubleshooting</Text>
                    <Text style={{fontSize: 17}}>
                        If something doesn't look safe, there are any sparks, burning smells, unusual noise, or exposed wires, stop immediately and call an electrician.
                    </Text>
                    
                    <View style={{marginTop: 15, marginBottom: 20}}> 
                        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Check your switchboard</Text>
                        <Text style={{fontSize: 16, marginTop: 5}}>
                            Open your switchboard and make sure all the switches are facing up or in the "on" position.
                        </Text>
                    </View>
                    
                    <Divider style={sharedStyle.dividerNormal} />
                    <Text style={sharedStyle.subPromptTxt}>Select a switchboard-related option:</Text>
                    
                    <TouchableOpacity onPress={() => setOptionSwitchSelect(!optionSwitchSelect)}>
                        <View style={mainStyle.dropdownBox}>
                            <Text style={[mainStyle.dropdownText, mainStyle.dropdownSelectedText]}>
                                {selectedSwitchOption || 'Select an option'}
                            </Text>
                            <AntDesign name="down" size={20} color="black" style={mainStyle.dropIcon}/>
                        </View>
                    </TouchableOpacity>
                    
                    {optionSwitchSelect && (
                        <ScrollView style={[mainStyle.dropdownMenu, mainStyle.shadow]}>
                            {options_switch.map((option, index) => (
                                <View key={index}>
                                    <TouchableOpacity 
                                        style={mainStyle.dropdownItem} 
                                        onPress={() => {
                                            setSelectedSwitchOption(option);
                                            setOptionSwitchSelect(false);
                                            setSelectedSwitchVal(index);
                                            handleSwitch(index);
                                        }}
                                    >
                                        <Text style={mainStyle.dropdownText}>{option}</Text>
                                    </TouchableOpacity>
                                    <Divider style={index < options_switch.length - 1 ? sharedStyle.lightdivider : sharedStyle.nodivider} />
                                </View>
                            ))}
                        </ScrollView>
                    )}
                </View>
                {asseNoPower && (
                    <View style={sharedStyle.subcontentCtn}>
                         <Divider style={sharedStyle.dividerNormal} />
                        <Text style = {sharedStyle.subPromptTxt}>You can try this!</Text>
                        <Text style={{fontSize: 16, marginTop: 3}}>
                            There might be a faulty appliance in your house, try to unplug it and try to turn the switch on again.
                        </Text>
                        <Text style={{fontSize: 16, marginTop: 3}}>
                            If you are unsure, please choose next!
                        </Text>
                    </View>
                )}

                {assePay && (
                  <View style={sharedStyle.subcontentCtn}> 
                  <Text style={sharedStyle.subPromptTxt}>Have you pay your electricity bill?</Text>
                  <View style={mainStyle.twoBtnCtn}>
                      <TouchableOpacity 
                          style={[ { marginRight: 5 }, mainStyle.btn, billPaid === false && mainStyle.btn_selected ]} 
                          onPress={() => {setBillPaid(false)}}>
                          <Text style={[ mainStyle.twoBtnTxt, billPaid === false && mainStyle.txt_selected ]}>No</Text>
                      </TouchableOpacity>

                      <TouchableOpacity 
                          style={[{ marginLeft: 5 }, mainStyle.btn, billPaid === true && mainStyle.btn_selected ]}
                          onPress={() => {setBillPaid( true); setShowNext(true)}}>
                          <Text style={[ mainStyle.twoBtnTxt, billPaid === true && mainStyle.txt_selected ]}>Yes</Text>
                      </TouchableOpacity>
                  </View>
              </View>

                )}
                {!billPaid && (
                    <View style={sharedStyle.subcontentCtn}>
                        <Divider style={sharedStyle.dividerNormal} />
                        <Text style = {sharedStyle.subPromptTxt}>You could try to pay you electricity bill!</Text>
                        <Text style={{fontSize: 16, marginTop: 3}}>
                            If you are unsure, please choose next!
                        </Text>
                    </View>
                )}
            </>
        )}
                </View>
             




                </ScrollView>
            
            {/* ---------- Tail (Buttons & Hints) ---------- */}
            <View style={sharedStyle.tailCtn}>
                    {/* <View style={{ marginBottom: 15, marginLeft: 10 }}>
                        <Text style={reportStyle.subTxt}>If the outage you're looking for is not here, choose NEXT to continue.</Text>
                    </View> */}
                    <View style = {[{marginBottom: 10,},sharedStyle.hintTxtCtn]}> 
                        <Text style={sharedStyle.hintTxt}>
                            {/* {!showNext ? '' : {hintText}} */}
                            {hintText}
                        </Text>
                    </View>




                
                    <View style={[sharedStyle.tailTwoBtnCtn, sharedStyle.tailBtnContainer]}>
                        {/* Back Button */}
                        <TouchableOpacity 
                            style={[sharedStyle.tailTwoBtn, sharedStyle.tailBackBtn]} 
                            onPress={() => router.push("/(report)/r_report02")}
                        >
                            <Text style={[sharedStyle.tailTwoBtnTxt, sharedStyle.tailBackBtnTxt]}>Back</Text>
                        </TouchableOpacity>

                        {/* Next Button */}
                        <TouchableOpacity 
                            style={[sharedStyle.tailTwoBtn, sharedStyle.nextBtn, mainStyle.btn_selected, showNext ? mainStyle.btn_selected : mainStyle.btn_disabled]} 
                            onPress={handleNext}
                            disabled = {!showNext}
                        >
                            <Text style={[sharedStyle.tailTwoBtnTxt, sharedStyle.tailNextBtn, showNext ? mainStyle.txt_selected : mainStyle.txt_disabled]}>Next</Text>
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
