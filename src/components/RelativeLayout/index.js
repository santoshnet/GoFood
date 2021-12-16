import React from 'react';
import {View,StyleSheet} from "react-native";


const RelativeLayout =(props)=> {
    return (
        <View style={[styles.container,props.style]}>
            {props.children}
        </View>
    );

}

const styles = StyleSheet.create({
    container:{
        display:'flex',
        flexDirection:'column',
        position:'relative',
    }
})

export default RelativeLayout;
