import { View, TouchableOpacity, StyleSheet, Text, Animated } from 'react-native'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useState } from 'react';
import { CheckBox, Icon } from '@rneui/themed';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function FutureOutageIcon ({mbottom, setExpand, expand, isSelected, setSelection, fadeAnim}){
    const [widthExpand] = useState(new Animated.Value(40))
    const [opacityAnimation] = useState(new Animated.Value(0))


    const expandOut = () => { 
        setExpand(true)
        Animated.timing(widthExpand,{
            toValue:177,
            duration:300,
            useNativeDriver:false
        }).start();
        Animated.timing(opacityAnimation,{
            toValue:1,
            duration:600,
            useNativeDriver:true
        }).start();
    }

    const expandIn = () => { 
        setExpand(false)
        Animated.timing(widthExpand,{
            toValue:40,
            duration:300,
            useNativeDriver:false
        }).start();
        Animated.timing(opacityAnimation,{
            toValue:0,
            duration:1,
            useNativeDriver:true
        }).start();
    }
    
    return (
      <Animated.View style={[fOutagestyles(mbottom).fOutage_view, {opacity:fadeAnim}]}>
            <Animated.View style={[fOutagestyles().fOutage_button_container, {width:widthExpand}]}>
                <Animated.View style={[fOutagestyles().fOutage_outageSelection,{opacity:opacityAnimation}]}>
                    <TouchableOpacity onPress={() => {setSelection(0)}} style={{flexDirection:"row", alignItems:"center", marginRight:10}}>
                        {isSelected === 0 ? 
                        <Ionicons name="radio-button-on-sharp" size={20} color="black" />:
                        <Ionicons name="radio-button-off-sharp" size={20} color="black" />
                        }
                        <Text style={{marginLeft:2}}>Now</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {setSelection(1)}} style={{flexDirection:"row", alignItems:"center"}}>
                        {isSelected === 1 ? 
                        <Ionicons name="radio-button-on-sharp" size={20} color="black" />:
                        <Ionicons name="radio-button-off-sharp" size={20} color="black" />
                        }
                        <Text style={{marginLeft:2}}>5 Days</Text>
                    </TouchableOpacity>
                </Animated.View>
                <TouchableOpacity onPress={() => {expand === false ? expandOut() :expandIn()}} style={fOutagestyles().fOutage_button}>
                    <FontAwesome5 name="calendar-week" size={20} color="black" />
                </TouchableOpacity>
            </Animated.View>
      </Animated.View>
    )
  }
  
  const fOutagestyles= (mbottom) => StyleSheet.create({
      fOutage_view: {
        position: "absolute",
        right: 18,
        bottom: mbottom + 10,
      },
      

      fOutage_button_container: {
        height: 40,
        backgroundColor: "white",
        elevation:2,
        borderRadius: 50,
        position:"relative",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
      },
      
      fOutage_outageSelection:{
        position:"absolute",
        flexDirection:"row",
        alignItems:"center",
        margin:5,
        marginLeft:18,
        height:"100%",

        top:-5,
        left:-5,
        borderRadius:100,
        backgroundColor:"transparent",
      },

      fOutage_button: {
        width: 40,
        height: 40,
        position:"absolute",
        top:0,
        right:0,
        backgroundColor: "white",
        borderRadius: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }
  })


  