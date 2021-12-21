import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity,ActivityIndicator} from 'react-native';
import {Color, Fonts} from '../../theme';

function Button(props) {
  return (
    <View>
      {props.loading ? (
        <View
          style={[
            styles.buttonStyle,
            {
              paddingLeft: 30,
              paddingRight: 30,
              paddingTop: 15,
              paddingBottom: 16,
            },
            props.style,
          ]}>
          <ActivityIndicator size="small" color="#ffffff" />
        </View>
      ) : (
        <TouchableOpacity
          onPress={props.onPress}
          style={[styles.buttonStyle, props.style]}>
          <Text style={styles.buttonText}>{props.title}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: Color.colorPrimary,
    padding: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  buttonText: {
    color: Color.white,
    fontSize: 18,
    fontFamily: Fonts.primarySemiBold,
    textTransform: 'uppercase',
  },
});

export default Button;
