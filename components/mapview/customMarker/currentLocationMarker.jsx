import { useEffect } from "react";
import { StyleSheet, Text, View, Dimensions, Image} from "react-native";
import MapView, { Geojson, Marker } from "react-native-maps";
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withSpring, withTiming} from "react-native-reanimated";


const size = 10;
export default function CurrentLocationMarker({coordinate}) {

    const scale = useSharedValue(2);

    const reanimatedStyle = useAnimatedStyle(() => { 
        return{
            width: scale.value * size,
            height: scale.value * size,
        }
    })

    useEffect(() => { 
        scale.value = withRepeat(withSpring(1),-1, true);
    }, [])
    return(
        <Marker coordinate={{latitude: coordinate.latitude, longitude: coordinate.longitude}}
        anchor={{ x: 0.5, y: 0.5 }}>
            <Animated.View style={{flex:1, justifyContent:"center", alignItems:"center", width:75, height:75}}>
                <Animated.View style={[{width:size, height:size, position:"absolute", backgroundColor:"black", borderRadius:100, opacity:0.2}, 
                    reanimatedStyle]}/>
                <View style={{width: 10, height: 10,borderRadius: 100, backgroundColor:"black", borderWidth:1, borderColor:"white"
                }}/>
            </Animated.View>
        </Marker>
    )
}