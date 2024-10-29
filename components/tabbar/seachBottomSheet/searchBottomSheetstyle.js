import { DefaultTheme } from "@react-navigation/native"
import { StyleSheet } from "react-native"

const searchSheetStyle = StyleSheet.create({
    searchSheetContainer:{
        display:"flex",
        alignContent:"center",
        height:"100%",
        width:"100%",
    },

    searchInputContainer:{
        margin:20,
        position:"relative",
        paddingRight:40,
        paddingLeft:60,
        paddingVertical:8,
        borderRadius:50,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,
        elevation: 15,
        backgroundColor:"white",
        height:50

    },

    searchFilterContainer:{
        position:"absolute",
        left:0,
        top:0,
        width:65,
        height:50,
        borderRadius:50,
        backgroundColor:"transparent",
        display:"flex",
        alignItems:"center",
        justifyContent:"center"
    },  

    searchDeleteContainer:{
        position:"absolute",
        right:0,
        top:0,
        width:50,
        height:50,
        borderRadius:50,
        display:"flex",
        alignItems:"center",
        justifyContent:"center"
    },

    search_textInput:{
        fontSize:24,
        fontWeight:"200"
    },

    recentSearchContainer:{
        marginHorizontal:30,
        marginVertical:10,
    },

    recentSearchHeading:{
        fontSize:20,
        fontWeight:'300'
    },

    recentBoxContainer:{
        marginVertical:5,
    },

    recentSearchBox:{
        flexDirection:"row",
        paddingVertical:15,
        borderBottomWidth:1,
        borderColor:"#AFAFAF"
    },

    searchBox:{

    }

})

export default searchSheetStyle;