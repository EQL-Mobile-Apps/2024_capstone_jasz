import { View, TouchableOpacity, StyleSheet, Animated } from 'react-native'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export default function  MyLocationIcon ({onPress, fadeAnim}){
    return (
      <Animated.View style={[currentLocationstyles.currentLocation_view, {opacity:fadeAnim}]}>
          <TouchableOpacity onPress={onPress} style={currentLocationstyles.currentLocation_button}>
            <FontAwesome5 name="location-arrow" size={20} color="black" />
          </TouchableOpacity>
      </Animated.View >
    )
  }
  
  const currentLocationstyles = StyleSheet.create({
      currentLocation_view: {
        position: "absolute",
        right: 18,
        bottom: 10,
      },
      currentLocation_button: {
        width: 40,
        height: 40,
        backgroundColor: "white",
        elevation:2,
        borderRadius: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingRight:1,
        paddingTop:1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
      }
  })
