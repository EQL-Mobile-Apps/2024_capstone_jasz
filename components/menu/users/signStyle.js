import { StyleSheet } from "react-native";

const signStyle = StyleSheet.create({
    container: {
      flex: 1,
      padding: 30,
      marginTop: 30,
      backgroundColor: '#f9f9f9',
    },


    headCtn: {
      alignItems: 'center',  
      flexDirection: 'row',  
      justifyContent: 'space-between', 
      marginTop: 40, 
    },
    
    // close button
    closeBtn: {
      borderRadius: 50,
      marginRight: 10,  
    },

    
    imgCtn:{
      justifyContent:"center",
    }, 

    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
    },
    imgCtn: {
      marginBottom: 50,
    },
    logo: {
      width: 150,
      height: 150,
      resizeMode: 'contain',
    },
    buttonContainer: {
      width: '100%',
      alignItems: 'center',
    },
    button: {
      backgroundColor: '#007AFF',
      padding: 15,
      marginVertical: 10,
      borderRadius: 10,
      width: '100%',
      alignItems: 'center',
    },
    buttonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
    
    // t
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
      color: '#333',
    },
  
    inputRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 15,
    },
  
    halfInput: {
      flex: 1,
      marginRight: 10,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 15,
      backgroundColor: '#fff',
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
  
    button: {
      backgroundColor: '#4CAF50',
      paddingVertical: 15,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20,
    },
  
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
  
    propertyInputSection: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 15,
    },
  
    propertyInput: {
      flex: 3, // Takes up most of the space
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 15,
      backgroundColor: '#fff',
    },
  
    addPropertyButton: {
      flex: 1, // Takes less space but is more balanced with the input
      marginLeft: 10,
      backgroundColor: '#007BFF',
      paddingVertical: 10,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
  
    addButtonText: {
      color: '#fff',
      fontWeight: 'bold',
    },

    btnCtn: {
        marginTop: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
      },


      btnTxt: {
        color: '#2274A5',
        fontSize: 16,
        fontWeight: 'bold',
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
    btnSelected: {
        borderColor: '#2274A5',
        backgroundColor: '#2274A5',
      },
    txt_btnSelected:{    
    color: 'white',
    fontWeight: 'bold',},

  });
  

export default signStyle;
