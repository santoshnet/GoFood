import React from 'react';
import {View, Text,StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-feather1s';
import Colors from '../../theme/Colors';
import Dimensions from '../../theme/Dimensions';
import Fonts from '../../theme/Fonts';

function ToolBar(props) {
    return (
        <View style={styles.toolBar}>
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                {props.icon ? (
                    <TouchableOpacity
                        activeOpacity={1}
                        style={styles.toggle}
                        onPress={props.onPress}>
                        <Icon name={props.icon} size={24} color="#ffffff" />
                    </TouchableOpacity>
                ) : <View style={{width: 20}}></View>}
                <Text style={styles.title}>{props.title}</Text>
            </View>
            {props.children?
            <View
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    paddingRight: 10,
                }}>
                {props.children}
            </View>:null}
        </View>
    );
}


const styles = StyleSheet.create({
    toolBar: {
        width: '100%',
        display: 'flex',
        backgroundColor: Colors.colorPrimary,
        fontSize: Dimensions.headerText,
        height: Dimensions.headerheight,
        flexDirection: 'row',
        color: Colors.white,
        alignItems: 'center',
    },
    title: {
        color: Colors.white,
        fontSize: Dimensions.title,
        fontFamily: Fonts.primarySemiBold,
    },


    toggle: {
        padding: 10,
    },
});

ToolBar.propTypes = {};

export default ToolBar;
