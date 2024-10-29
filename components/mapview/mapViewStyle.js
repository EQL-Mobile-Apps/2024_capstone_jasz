import { StyleSheet } from "react-native"

const mapViewStyle = StyleSheet.create({
    mv_container:{
        backgroundColor:"white",
        flex:1
    },

    mv_map:{
        width:"100%",
        height:"125%"
    },

    mv_plannedOutage:{
        width:70,
        height:70,
        backgroundColor:"white",
        borderRadius:10
    }
    ,
    mv_supercluserContainer:{
        borderRadius: 100,
        backgroundColor: 'rgba(104,174,255,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mv_supercluser:{
        width:25,
        height:25,
        borderWidth:1,
        borderColor:"white",
        backgroundColor:"#68AEFF",
        borderRadius: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default mapViewStyle