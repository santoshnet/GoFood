import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {Color, Dimension, Fonts} from '../../theme';


const TextViewLight=(props)=>{
    return(
        <Text style={[styles.text,props.style]}>
            {props.children}
        </Text>
    );

}

const styles = StyleSheet.create({
    text:{
        display:'flex',
        fontSize:Dimension.defaultTextSize,
        fontFamily: Fonts.primaryLight,
        color:Color.black

    }
});

export default TextViewLight;
