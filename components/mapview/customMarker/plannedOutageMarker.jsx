import { StyleSheet, Text, View, Dimensions, Image } from "react-native";
import MapView, { Geojson, Marker } from "react-native-maps";

export default function PlannedOutageMarker({properties, coordinate, onPressMarker}) {
    return(
        <Marker coordinate={coordinate}
            tracksViewChanges={false}
            onPress={() => {onPressMarker()}}>
            <View style={{width:46.4,height:56.8, // for ios
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    // for android
                    elevation: 5,}}>
                    <Image style={{width:46.4,height:56.8}} source={require('../../../assets/PlannedOutage.png')}/>
                </View>
        </Marker>
    )
}