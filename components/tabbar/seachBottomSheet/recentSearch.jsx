import { Text, TouchableOpacity, View } from "react-native";
import searchSheetStyle from "./searchBottomSheetstyle";
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from "expo-router";


const trimText = (text) =>{ 
    return text.trim().charAt(0).toUpperCase() + text.trim().slice(1).toLowerCase()
}


export default function RecentSearch({outage, searchSelect}){
    return(
        <TouchableOpacity style={searchSheetStyle.recentSearchBox} onPress={() => {
            router.navigate("/mapview")
            searchSelect(outage);
        }}>
            <AntDesign name="reload1" size={30} color="black" style={{paddingTop:6, transform: [{rotateY: '180deg'}]}}/>
            <View style={{marginLeft:20}}>
                <Text style={{fontSize:20, fontWeight:"500"}}>
                    {outage.properties.STREETS.trim().charAt(0).toUpperCase() + outage.properties.STREETS.trim().slice(1).toLowerCase()}
                </Text>
                <Text style={{fontSize:10, fontWeight:"300"}}>{outage.properties.SUBURBS}</Text>
            </View>
        </TouchableOpacity>
    )
}