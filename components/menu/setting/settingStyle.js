import { StyleSheet } from "react-native"

const settingStyle = StyleSheet.create({
    setting_heading:{
        fontSize:20,
        fontWeight:'500'
    },

    setting_description:{
        fontSize:13,
        fontWeight:'200',
        marginVertical:2
    },

    setting_hr:{
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        marginVertical:15
    },

    setting_buttonContainer:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center"
    },

    setting_buttonText:{
        fontSize:18,
        marginVertical:2,
    }
})

export default settingStyle