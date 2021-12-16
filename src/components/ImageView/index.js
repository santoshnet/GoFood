import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Dimensions} from '../../theme';


const ImageView=(props)=>{

    return(
        <Image source={props.src?props.src: {uri: props.url} } style={[styles.container,props.style]}/>
    );

}

const styles = StyleSheet.create({
    container:{
        maxWidth:Dimensions.window.width,
        maxHeight:Dimensions.window.height,
        resizeMode:'contain',
        minHeight:24,
        minWidth:24
    }
});

export default ImageView;
