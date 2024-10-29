import { StyleSheet } from "react-native"

const menuStyle = StyleSheet.create({
    menu_header:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        marginVertical:15,
        marginHorizontal:20
    },

    menu_backButton: {
        marginRight:10
    },

    menu_image:{
        width:100,
        resizeMode:"contain"
    },

    menu_navContainer:{
        marginVertical:50,
        marginHorizontal:50,
    },

    menu_nav:{
        flexDirection:"row",
        alignItems:"center",
        marginVertical:8
    },

    menu_nav_text:{
        fontSize:20,
        marginLeft:10,
        fontWeight:"200"
    },

    menu_hr: {
        borderBottomColor: '#DADADA',
        borderBottomWidth: 1.5,
        marginVertical:15
    },

    menu_item_heading:{
        fontSize:48,
        fontWeight:"600",
        marginVertical:20
    },

    menu_item_welcome: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'left',
        marginBottom: 10,
      },
    

})

export default menuStyle