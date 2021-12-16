import React from 'react';
import {Text,StyleSheet,TouchableOpacity} from 'react-native';
import {Color, Fonts} from "../../theme";

function Button(props) {
    return(
        <TouchableOpacity
        onPress={props.onPress}
        style={[styles.buttonStyle, props.style]}>
        <Text style={styles.buttonText}>{props.title}</Text>
    </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonStyle:{
        backgroundColor: Color.colorPrimary,
        padding:10,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:15,
    },
    buttonText:{
        color:Color.white,
        fontSize:18,
        fontFamily: Fonts.primarySemiBold,
        textTransform:'uppercase'
    }
})

export default Button;
