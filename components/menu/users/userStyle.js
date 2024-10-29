import { StyleSheet } from "react-native";


const userSTyle = StyleSheet.create({
    mainCtn:{
        flex: 1,
        padding: 30,
        marginTop: 30,
        backgroundColor: '#f9f9f9',
    },

    bottomCtn:{
        justifyContent: 'center', 
        alignItems: 'center',
        marginTop: 15,

    },

    propertyCtn:{
        marginBottom : 20,
    }, 

    propertiesCtn:{
        marginTop : 20,
    }, 

    endCtn:{
        marginTop: 50, 

    }, 


    // text prompts 
    title: {
        marginTop: 40, 
        fontSize: 35,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },


    subPromptTxt: {
        fontSize: 17,
        fontWeight: 'bold',
        
        
        color: '#000',
    },

    propertyTxt:{
        fontSize: 15,
        color: '#000',
       
        
    }, 

    hintText:{ 
        justifyContent: 'center', 
        alignItems: 'center',
        fontSize: 13, 
        color: '#DB2B39', 
        marginVertical: 4,

    }, 
    cancelTxt:{
        color: 'red',
        fontStyle: 'italic'
    }, 

    verifiedTxt:{
        color: 'green',
        fontStyle: 'italic'
    },

    // text input
    inputRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
        marginTop: 5, 
      },
      inputPropRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        
      }, 
      inputBar: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginBottom: 15,
        backgroundColor: '#fff',
      },

      halfInput: {
        flex: 1,
       
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
      },

    // logo 
    imgCtn: {
        marginBottom: 50,
    },
    logo: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
    },

    // button
    optionOneBtn:{
        paddingVertical: 15,
        paddingHorizontal: 100,
    },

    oneSubmitBtn:{

    }, 
    oneBtn:{
        marginVertical: 10,
        borderRadius: 20,
        borderWidth: 3,
        borderColor: '#000'
    },
    oneBtnTxt:{
        color: '#000',
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        paddingVertical: 10,
        paddingHorizontal: 10, 
    }, 


    // divider
    divider: {
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        height: 1,
        marginTop: 15,
        marginBottom: 15,
      },

      lightDivider: {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        height: 1,
        marginTop: 15,
        marginBottom: 15,
      },


    // button 
     
    btn:{
        borderWidth: 2,
        borderColor: '#000',
        borderRadius: 25,
        paddingVertical: 5,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },

    btnTxt: {
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold',
    },

    btnSelected: {
        borderColor: '#000',
        backgroundColor: '#000',
    },

    txt_btnSelected:{    
        color: 'white',
        fontWeight: 'bold',
    },

   
    btnDisabled:{
        backgroundColor: '#ccc',
        borderColor: '#aaa',
    }, 

    btntxtDisable:{
        color: '#777',
    }, 
}); export default userSTyle;