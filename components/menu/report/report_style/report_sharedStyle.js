import { StyleSheet } from "react-native";

const sharedStyle = StyleSheet.create({

    // main container
    mainCtn: {
    flex: 1,
    paddingHorizontal:25,
    marginTop: 30,
    },

    // ----- HEAD ----- // 
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
  
  // progress bar
  progressBarCtn: {
    flex: 1, 
    height: 10, 
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
  },

  progressBar:{
    backgroundColor: '#4caf50',
    borderRadius: 10,
    height: '100%',
  }, 
   
  // ----- CONTENT ----- //
  contentCtn:{
    marginTop: 20,
  },

  // --- top content --- //

  topContentCtn:{
    marginBottom: 10,
  },

  titleTxt: {
    fontSize: 55,
    fontWeight:'bold',
    color: '#000',
    marginBottom: 5, 
  },

  promptTxt: {
    fontSize: 45,
    fontWeight:'bold',
    color: '#000',
    marginBottom: 5, 
  },

  subTxt: {
    fontSize: 16,
    color: '#3A3F42',
  },

  // --- mid content --- //
  midContentCtn: {
    marginTop: 5
  }, 
  

  // container 
  subcontentCtn: { 
    marginVertical: 15, 
  },

    // divider
    dividerNormal: {
        backgroundColor: 'rgba(0, 0, 0, 0.2)', 
        height: 1, 
        marginTop: 15,
        marginBottom: 15, 
    },

    lightdivider: {
        backgroundColor: 'rgba(0, 0, 0, 0.1)', 
        height: 1, 
        marginTop: 10,
        marginBottom: 10,
      },


    nodivider: {
      backgroundColor: 'rgba(0, 0, 0, 0.0)', 
      height: 1, 
      marginTop: 10,
      marginBottom: 20,
    },
    // questionTxt
    subPromptTxt: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
    },

    subSubPromptTxt: {
      fontSize: 15,
      fontWeight: 'bold',
      marginBottom: 5,
      marginTop: 20,
      color: '#000',
      },

      list: {
        marginBottom: 20,
      },
      listItem: {
        fontSize: 16,
        textAlign: 'left',
        marginBottom: 5,
      },

// ----- TAIL ----- //
 // tail
 tailCtn:{
    marginTop: 150,
    marginBottom: 10,
    position: 'flex',
    justifyContent: 'space-between',
  },

  // --- red hint --- // 

  hintTxtCtn: {
    position: 'absolute', // Ensure the hint stays above the button
    bottom:80, // Adjust this to be slightly above the button
    left: 10, // Or center it with: alignSelf: 'center'
  },

  hintTxt: {
      color: 'red',
      fontSize: 15,
      fontStyle: 'italic',
  },

  // tail button
  tailTwoBtnCtn:{
    flexDirection: 'row',
    marginTop: 2,
  }, 
  tailBtnContainer:{
    position: 'absolute',
    bottom: 20, 
    left: 0,
    right: 0,
  },
  tailOneBtn: {
    borderWidth: 2,
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },

  tailOneBtnTxt:{
    fontSize: 20,
    fontWeight: 'bold',
  },

  tailTwoBtn:{
    borderWidth: 3,
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    width: '40%',
  },
  tailTwoBtnTxt:{
    fontSize: 20,
    fontWeight: 'bold',
  },

  tailBackBtn:{
    borderColor: '#2274A5',
    marginRight: 5,
  }, 

  tailBackBtnTxt:{
    color: '#2274A5',
  }, 

  tailNextBtn:{
    color: '#fff',
   
  }, 

});

export default sharedStyle;


