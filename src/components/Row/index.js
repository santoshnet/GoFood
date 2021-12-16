import React from 'react';
import {View,StyleSheet} from 'react-native';


const Row=(props)=>{
      return(
          <View style={[styles.container,props.style]}>
              {props.children}
          </View>
      );

}

const styles = StyleSheet.create({
    container:{
        display:'flex',
        flexDirection:'row'
    }
});

export default Row;
