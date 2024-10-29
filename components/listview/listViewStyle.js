import { StyleSheet } from "react-native"

const listViewStyle = StyleSheet.create({
    LVStyle_container: {
        flex:1,
        backgroundColor:"white",
        paddingHorizontal:16,
        paddingTop: 27
    },

    LVStyle_hr: {
        borderBottomColor: '#DADADA',
        borderBottomWidth: 1.5,
    },

    LVStyle_SA_text:{
        marginVertical:10,
        color:"#555555",
        fontSize:15
    },

    LVStyle_mainHeading:{
        fontSize:48,
        fontWeight:"bold",
        marginBottom:10
    },

    LVStyle_heading:{
        fontSize:20,
        fontWeight:"bold",
        marginBottom:5
    },

    LVStyle_card:{
        borderColor: "#C6C6C6", 
        borderWidth:1, 
        borderRadius:10, 
        marginVertical:4
    },

    LVStyle_card_container:{
        paddingHorizontal:17, 
        paddingVertical:12,
        flexDirection:'row',
        justifyContent:"space-between",
        alignItems:'center',
    }
})

export default listViewStyle