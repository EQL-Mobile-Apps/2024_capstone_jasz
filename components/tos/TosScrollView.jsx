import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import tosStyle from './tosStyle.js'
    

export default function TosScrollView({setEndScrolling}){
    const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
        const paddingToBottom = 50;
        return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
      };
          
    return(
        <ScrollView
            onScroll={({nativeEvent}) => {
            if (isCloseToBottom(nativeEvent)) {
                setEndScrolling(false);
            } else { 
                setEndScrolling(true);
            }
            }}
            scrollEventThrottle={1}
        >
            <View style={tosStyle.tos_paragraphContainer}>
                <Text style={tosStyle.tos_paragraphHeading}>1. Using our service</Text>
                <Text style={tosStyle.tos_paragraph}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
            </View>
            <View style={tosStyle.tos_paragraphContainer}>
                <Text style={tosStyle.tos_paragraphHeading}>2. Using our service</Text>
                <Text style={tosStyle.tos_paragraph}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
            </View>
            <View style={tosStyle.tos_paragraphContainer}>
                <Text style={tosStyle.tos_paragraphHeading}>3. Using our service</Text>
                <Text style={tosStyle.tos_paragraph}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
            </View>
            <View style={tosStyle.tos_paragraphContainer}>
                <Text style={tosStyle.tos_paragraphHeading}>4. Using our service</Text>
                <Text style={tosStyle.tos_paragraph}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
            </View>
        </ScrollView>
   
)};
    