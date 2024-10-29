import { StyleSheet } from "react-native";

const popStyle = StyleSheet.create({ 

    // ------ shared style ----- //
    popCtn: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)', 
        justifyContent: 'center',
    },

    popView: {
        width: 380,
        height: 250,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 30,
    },

    popContent:{
        alignItems: 'center',
    }, 
    

    popTitle:{
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 20,
    },

    popTxt: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
      },

    // single button
    
      popBtn: {
        borderRadius: 30,
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
    
      popBtnTxt: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
      },
    
    // double button
    tailTwoBtnCtn:{
        marginTop: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }, 

    btn:{
        borderWidth: 2,
        borderColor: '#2274A5',
        borderRadius: 25,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },

    twoBtnTxt:{
        color: '#2274A5',
        fontSize: 16,
        fontWeight: 'bold',
    }, 

    
 
    // --- emergency --- // 


    // --- assessment --- //

    // --- leave --- // 
    leaveBtn:{
        
        backgroundColor: '#2274A5', 
    }, 

    leaveTxt:{
        color: '#fff'
    },

});

export default popStyle;