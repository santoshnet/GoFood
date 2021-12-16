import React from 'react';
import {Text,StyleSheet} from "react-native";
import {Fonts} from "../../theme";


const H5 =(props)=> {
    return (
        <Text style={[styles.textStyle,props.style]}>
            {props.children}
        </Text>
    );

}

const styles = StyleSheet.create({
    textStyle:{
      fontFamily:Fonts.primarySemiBold,
      fontSize:14
    }
})

export default H5;
