//IM-2021-100
//Chamod jayaweera

import { StyleSheet } from "react-native";
import { myColors } from "./Colors";

export const styles = StyleSheet.create({
    btnBlue:{
        width:85,
        height:85,
        borderRadius:100,
        backgroundColor:myColors.blue,
        justifyContent:'center',
        alignItems:'center',
        margin:5,
        //marginVertical:5,
    },
    btnDark:{
        width:85,
        height:85,
        borderRadius:25,
        backgroundColor:myColors.dark,
        justifyContent:'center',
        alignItems:'center',
        margin:5,
    },
    btnLight:{
        width:85,
        height:85,
        borderRadius:25,
        backgroundColor:myColors.white,
        justifyContent:'center',
        alignItems:'center',
        margin:5,
    },
    btnGray:{
        width:85,
        height:85,
        borderRadius:100,
        backgroundColor:myColors.gray,
        justifyContent:'center',
        alignItems:'center',
        margin:5,
    },
    smallTextLight:{
        fontSize:32,
        color:myColors.white,    
    },
    smallTextDark:{
        fontSize:32,
        color:myColors.black,     
    },
    //keyboard styles
    row:{
        maxWidth:'100%',
        flexDirection:'row',
    },
    viewBottom:{
        position:'absolute',
        bottom:20,
    },
    screenFirstNumber:{
        fontSize:96,
        color:myColors.gray,
        fontWeight:'200',
        alignSelf:'flex-end',
    },
    screenSecondNumber:{
        fontSize:40,
        color:myColors.gray,
        fontWeight:'200',
        alignSelf:'flex-end',
    } 
});
