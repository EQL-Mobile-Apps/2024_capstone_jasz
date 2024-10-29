import { StyleSheet } from "react-native"

const tabBarStyle = StyleSheet.create({
    tabBar_container:{
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        position:"fixed",
        bottom:0,
        backgroundColor:"white",
        paddingVertical:10
    },

    tabBar_textContainer:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    },

    tabBar_searchContainer:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#2389C8",
        width:65,
        height:65,
        borderRadius:100,
        paddingBottom:10,
        marginBottom:10
    }
})

export default tabBarStyle