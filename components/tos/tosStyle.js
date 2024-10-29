import { StyleSheet } from "react-native"

const tosStyle = StyleSheet.create({
    tos_container: { 
        backgroundColor: 'white',
        height:'100%'
    }, 
    
    tos_header:{
        position:"fixed",
        top:0,
        left:0,
        width:'100%',
        paddingHorizontal:33,
        paddingVertical:22,
        borderBottomWidth:1,
    },

    tos_heading:{
        fontSize:28,
        fontWeight:"bold"
    },

    tos_subHeading: {
        fontSize:16,
        fontWeight:"200"
    },

    tos_paragraphContainer: { 
        marginHorizontal:33, 
        marginVertical:14
    },

    tos_paragraphHeading:{
        fontSize:24,
        marginVertical:3,
        fontWeight:"bold"
    },

    tos_paragraph:{
        fontSize:16,
        fontWeight:"200"
    },

    tos_footer:{
        flexDirection:'row',
        justifyContent:'space-evenly',
        alignItems:'center',
        position:"fixed",
        bottom:0,
        left:0,
        width:'100%',
        paddingHorizontal:33,
        paddingVertical:22,
        borderTopWidth:1,
        
    },

    tos_fade:{ 
        height:30,

    },

    tos_button:{
        display:"flex", 
        width:120, 
        height: 55, 
        alignItems:'center', 
        justifyContent:"center"
    },

    tos_buttonText:{
        fontSize: 20,
        fontWeight: 'bold'
    }
})

export default tosStyle