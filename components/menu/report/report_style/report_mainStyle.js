import { StyleSheet, Platform } from "react-native";


const mainStyle = StyleSheet.create({

    // --- button --- // 
    twoBtnCtn:{
        marginTop: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
    
    oneBtn:{
        paddingVertical: 15,
        paddingHorizontal: 10,
        marginVertical: 10,
        borderRadius: 20,
        borderWidth: 3,
        borderColor: '#000'
    },
    btn:{
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 25,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },

    twoBtnTxt:{
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
    }, 

    oneBtnTxt:{
        color: '#000',
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'left',
        paddingLeft: 20,
        paddingVertical: 10,
    }, 

    // --- button function --- //
    btn_active:{
        backgroundColor: '#2274A5', 
        borderColor: '#fff',
    }, 
    txt_active:{
        color: '#fff'
    }, 

    btn_selected:{
        borderColor: '#fff',
        backgroundColor: '#2274A5', 
    }, 
    txt_selected:{
        color: 'white',
        fontWeight: 'bold',
    }, 

    btn_disabled:{
        backgroundColor: '#ccc',   
        borderWidth: 0, 
    }, 
    txt_disabled:{
        color: '#777'
    }, 

// --- Search Bar --- // 
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1.5,
        borderRadius: 10,
        paddingVertical: 8,
        paddingHorizontal: 12,
        height: 70,
    },

    inputBox:{
        flexDirection: 'row',
        borderWidth: 1.5,
        borderRadius: 10,
        paddingVertical: 8,
        paddingHorizontal: 12,
        
    }, 

    searchBarActive: {
        borderColor: '#2274A5',
    },

    searchBarInactive: {
        borderColor: '#d3d3d3',
    },    

    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 18,
    },

    suggCtn: {
        borderColor: '#8F8F8F', 
        backgroundColor: '#fff',
        height: 100,
        padding: 10,
    },

    shadow: {
        ...Platform.select({
            ios: {
                shadowColor: '#000',  
                shadowOffset: { width: 0, height: 2 },  
                shadowOpacity: 0.25,  
                shadowRadius: 3.84,  
            },
            android: {
                elevation: 5,  
            },
        }),
    },

    outageCtn: {
        height: 300,    
    }, 


    // outage card 
    outageCtn: {
        height: 300,
    },
    outageCard: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginVertical: 30,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 2,
        borderColor: '#ccc',
        borderWidth: 1,
    },

    cardContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    typeTxt:{
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    }, 

    locTxt:{
        fontSize: 14,
        fontWeight: 'bold',
        color: '#666',
        marginBottom: 3,
    }, 

    contentTxt:{
        fontSize: 14,
        color: '#000',
        
    },

    // --- Drop down box --- // 
    dropdownBox:{
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#d3d3d3',
        backgroundColor: '#fff', 
        borderWidth: 1,
        borderRadius: 10,
        paddingVertical: 8,
        paddingHorizontal: 12,
        height: 70,
        justifyContent: 'space-between',
      },
    
      dropIcon:{
        position: 'absolute',
        right: 20,
      },
      dropdownMenu:{
        marginTop: 2, 
        borderColor: '#8F8F8F', 
        backgroundColor: '#FFFFFF',
        height: 170,
        padding: 10,
       
      }, 
    
      dropdownItem:{
        marginTop: 2, 
        padding: 1, 
         
    
      },
      dropdownSelectedText:{
        marginLeft: 2, 
        fontSize: 17,
        fontWeight: 'bold', 
      },
      dropdownText:{
        fontSize: 15,
    
      },


});

export default mainStyle;
