import React from 'react';
import {Text,StyleSheet} from "react-native";
import {Fonts} from "../../theme";


const H2 =(props)=> {
    return (
        <Text style={[styles.textStyle,props.style]}>
            {props.children}
        </Text>
    );

}

const styles = StyleSheet.create({
    textStyle:{
      fontFamily:Fonts.primarySemiBold,
      fontSize:20
    }
})

export default H2;
