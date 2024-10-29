import { StyleSheet, Text, View, Dimensions, Image } from "react-native";
import MapView, { Geojson, Marker, Polygon } from "react-native-maps";

export default function UnPlannedOutageMarker({properties, coordinate, onPressMarker}) {
    return(
        <Marker coordinate={coordinate}
            tracksViewChanges={false}
            onPress={() => {onPressMarker()}}>
            <View style={{width:"100%",height:"100%", // for ios
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    // for android
                    elevation: 5,}}>
                    <Image style={{width:46.4,height:56.8}} source={require('../../../assets/UnplannedOutage.png')}/>
                </View>
        </Marker>
    )
}