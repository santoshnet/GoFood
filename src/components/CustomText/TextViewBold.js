import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {Colors, Dimensions, Fonts} from '../../theme';


const TextViewBold=(props)=>{
    return(
        <Text style={[styles.text,props.style]}>
            {props.text}
        </Text>
    );

}

const styles = StyleSheet.create({
    text:{
        display:'flex',
        fontSize:Dimensions.defaultTextSize,
        fontFamily: Fonts.primaryBold,
        color:Colors.black
    }
});

export default TextViewBold;
