import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { BottomSheet } from "@rneui/themed";
import { createRef, useRef, useState } from "react";
import { forwardRef, useImperativeHandle, useMemo } from "react";
import { Image, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import outageInfoStyle from "./outageInfoStyle";


const trimText = (text) =>{ 
    return text?.toLowerCase().replace(/\b\w/g, char => char.toUpperCase());
}
const truncateText = (text, maxLength) => {
    if (text?.length <= maxLength) {
      return text;  
    }
    return text?.substring(0, maxLength) + "..."; 
  }

const splitTime = (dateTime) => {
    const timeRegex = /(\d{1,2}:\d{2})(AM|PM)/; 
    const dateRegex = /(\d{1,2} \w+ \d{4})/; 
  
    const timeMatch = dateTime?.match(timeRegex);
    const dateMatch = dateTime?.match(dateRegex);


    if (timeMatch && dateMatch) {
        return [timeMatch[1], timeMatch[2], dateMatch[0]];
      }
        
    return [];
    }


    const OutageInfoModal = forwardRef((props, ref) => {
        const snapPoints = useMemo(() => ["35%"], []);
        const snapPointsTwo = useMemo(() => ["87%"], []);
    
    return(
        <BottomSheetModal
            ref={ref}
            index={0}
            snapPoints={props.extend? snapPointsTwo: snapPoints}
            detached={true}
            bottomInset={30}
            style={{marginHorizontal: 10
            }}
        >   
            {props.extend ? 
            <View style={outageInfoStyle.outageInfoContainer}>
                <Text style={{fontSize: 24, fontWeight:'bold'}}>{trimText(props?.outage?.properties?.TYPE)} Outage</Text>
                <Text>Street: <Text style={{fontSize: 13, fontWeight:'200'}}>{trimText(props?.outage?.properties?.STREETS)}</Text></Text>
                <Text>Suburbs: <Text style={{fontSize: 13, fontWeight:'200'}}>{trimText(props?.outage?.properties?.SUBURBS)}</Text></Text>
                <View style={outageInfoStyle.outageInfo_hr}/>
                <Text>Status: <Text style={{fontSize: 13, fontWeight:'200'}}>{trimText(props?.outage?.properties?.STATUS)}</Text></Text>
                <Text>Reason: <Text style={{fontSize: 13, fontWeight:'200'}}>{trimText(props?.outage?.properties?.REASON)}</Text></Text>
                <Text>Customer Affected: <Text style={{fontSize: 13, fontWeight:'200'}}>{trimText(props?.outage?.properties?.CUSTOMERS_AFFECTED)}</Text></Text>
                <Text>Start: <Text style={{fontSize: 13, fontWeight:'200'}}>{trimText(props?.outage?.properties?.START)}</Text></Text>
                <Text>Est Power On:</Text>
                <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"baseline"}}>
                    <Text style={{fontSize:25, fontWeight:"300"}}>{splitTime(props?.outage?.properties?.EST_FIX_TIME)[0]}
                        <Text style={{fontSize:12, fontWeight:"200"}}>{splitTime(props?.outage?.properties?.EST_FIX_TIME)[1]}</Text>
                    </Text>
                    <Text style={{fontSize:12, fontWeight:"200"}}>{splitTime(props?.outage?.properties?.EST_FIX_TIME)[2]}</Text>
                </View>
                <View style={{flex:1, marginBottom:40}}>
                    <Image source={require('../../../assets/outage-progress.png')}
                        style ={{width:"100%",
                            height:"100%",
                            resizeMode:"center"
                        }}
                    />
                </View>
                <View style={{
                    flexDirection:"row", justifyContent:"center", marginVertical:30,
                    position:"absolute",
                    bottom:0,
                    width:"100%"
                }}>
                    <TouchableOpacity onPress={() => ref.current?.dismiss()}
                        style={{
                            borderWidth:1,
                            paddingHorizontal:20,
                            paddingVertical:2,
                            borderRadius:50
                        }}    
                    >
                        <Text style={{fontSize:13, fontWeight:"200"}}>View On Map</Text>
                    </TouchableOpacity>
                </View>
            </View>
            : 
            <View style={outageInfoStyle.outageInfoContainer}>
                <Text style={{fontSize: 24, fontWeight:'bold'}}>{trimText(props?.outage?.properties?.TYPE)} Outage</Text>
                <Text style={{fontSize: 13}}>{truncateText(trimText(props?.outage?.properties?.STREETS),35)}</Text>
                <Text style={{fontSize: 13, fontWeight:'200'}}>{truncateText(trimText(props?.outage?.properties?.SUBURBS),35)}</Text>
                <View style={outageInfoStyle.outageInfo_hr}/>
                <Text>Status: <Text style={{fontSize: 13, fontWeight:'200'}}>{trimText(props?.outage?.properties?.STATUS)}</Text></Text>
                <Text>Reason: <Text style={{fontSize: 13, fontWeight:'200'}}>{trimText(props?.outage?.properties?.REASON)}</Text></Text>
                <Text>Customer Affected: <Text style={{fontSize: 13, fontWeight:'200'}}>{trimText(props?.outage?.properties?.CUSTOMERS_AFFECTED)}</Text></Text>
                <Text>Est Power On:</Text>
                <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"baseline"}}>
                    <Text style={{fontSize:25, fontWeight:"300"}}>{splitTime(props?.outage?.properties?.EST_FIX_TIME)[0]}
                        <Text style={{fontSize:12, fontWeight:"200"}}>{splitTime(props?.outage?.properties?.EST_FIX_TIME)[1]}</Text>
                    </Text>
                    <Text style={{fontSize:12, fontWeight:"200"}}>{splitTime(props?.outage?.properties?.EST_FIX_TIME)[2]}</Text>
                </View>
                <View style={{flexDirection:"row", justifyContent:"center", marginVertical:10}}>
                <TouchableOpacity onPress={() => props.setExtend(true)}
                    style={{
                        borderWidth:1,
                        paddingHorizontal:20,
                        paddingVertical:2,
                        borderRadius:50
                    }}    
                >
                    <Text style={{fontSize:13, fontWeight:"200"}}>View More</Text>
                </TouchableOpacity>
                </View>
            </View>}
        </BottomSheetModal>
    )
})

export default OutageInfoModal