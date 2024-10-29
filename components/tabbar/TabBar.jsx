import { Pressable, StyleSheet, Text, View, TouchableOpacity, Animated} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import tabBarStyle from './tabBarStyle';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { Link, useGlobalSearchParams, useLocalSearchParams } from 'expo-router';
import SearchBottomSheet from './seachBottomSheet/searchBottomSheet';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function TabBar({ state, descriptors, navigation }){
    const global = useGlobalSearchParams();
    const [newRoute, setNewRoute] = useState([state.routes[0], {key:"none", name:"search", params:{}}, state.routes[1]])
    const icons = {
        mapview: (props) => <FontAwesome size={20} name="map-o" color={primaryColor} {...props}/>,
        listview: (props) => <FontAwesome size={20} name="list-ul"  color={primaryColor} {...props}/>
    }
    const primaryColor = '#C0C0C0';
    const activeColor = 'black';
    const bottomSheetRef = useRef();
    const handlePresentModalPress = () => bottomSheetRef.current?.present();
    const [slideAnim] = useState(new Animated.Value(90));
    const [fadeAnim] = useState(new Animated.Value(1));

    useEffect(() => { 
        if (global.showTabBar==="true") {
            Animated.timing(slideAnim, {
              toValue: 90,
              duration: 200,
              useNativeDriver: false,
            }).start();
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 200,
                useNativeDriver: false,
            }).start();
          } else if (global.showTabBar==="false") {
            Animated.timing(slideAnim, {
              toValue: 0,
              duration: 200,
              useNativeDriver: false,
            }).start();
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 200,
                useNativeDriver: false,
            }).start();
          }
    }, [global.showTabBar])

    return (
        <Animated.View style={[tabBarStyle.tabBar_container 
        ,{height:slideAnim}
        
        ]}>
            {newRoute.map((route, index) => {
                if(index != 1){
                    const { options } = descriptors[route.key];
                    const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                        ? options.title
                        : route.name;
                    const newIndex = [0, 2, 1]
                    const isFocused = state.index === newIndex[index];
                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });
                
                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name, route.params);
                        }
                    };
                
                    const onLongPress = () => {
                        navigation.emit({
                            type: 'tabLongPress',
                            target: route.key,
                        });
                    };

                    return (
                        <TouchableOpacity
                            key={route.name}
                            accessibilityRole="button"
                            accessibilityState={isFocused ? { selected: true } : {}}
                            accessibilityLabel={options.tabBarAccessibilityLabel}
                            testID={options.tabBarTestID}
                            onPress={onPress}
                            onLongPress={onLongPress}
                            style={tabBarStyle.tabBar_textContainer}
                        >
                            {
                                icons[route.name]({
                                    color: isFocused ? activeColor :  primaryColor 
                                })
                            }
                            <Text style={{ color: isFocused ? activeColor :  primaryColor , fontSize:10}}>
                            {label}
                            </Text>
                        </TouchableOpacity>
                    );
                }else{
                    return(
                            <Animated.View  
                            style={{opacity:fadeAnim}}
                            key={route.name}>

                                    <Link push href="/mapview" asChild>
                                        <TouchableOpacity 
                                            key={route.name} 
                                            style={tabBarStyle.tabBar_searchContainer}
                                            onPress={handlePresentModalPress}>
                                            <EvilIcons size={50} name="search" color="white" />
                                        </TouchableOpacity>   
                                    </Link>
                                                           
                            </Animated.View> 
                        )
                }
          })}
            <SearchBottomSheet ref={bottomSheetRef}/>    
        </Animated.View>
      );
}