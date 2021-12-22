import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {Color, Dimension, Fonts} from '../../theme';


const TextViewBold=(props)=>{
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
        fontFamily: Fonts.primaryBold,
        color:Color.black
    }
});

export default TextViewBold;
