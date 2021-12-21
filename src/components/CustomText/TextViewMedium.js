import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {Color,Fonts,Dimension} from '../../theme';


const TextViewMedium=(props)=>{
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
        fontFamily: Fonts.primarySemiBold,
        color:Color.black

    }
});

export default TextViewMedium;
