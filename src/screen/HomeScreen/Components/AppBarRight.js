import React, {Component} from 'react';
import {TouchableOpacity} from "react-native-gesture-handler";
import RelativeLayout from "../../../components/RelativeLayout";
import Icon from "react-native-feather1s";
import {Color} from "../../../theme";
import AbsoluteLayout from "../../../components/AbsoluteLayout";
import {Text,Alert} from "react-native";
import {styles} from "../../../components/styles/styles";
import Row from "../../../components/Rows";
import {useNavigation} from "@react-navigation/native";
import { StackActions } from '@react-navigation/native';

const AppBarRight =(props)=> {

    const navigation = useNavigation();
    const navigateToNotification=( )=>{
        navigation.push("Notification");
    }
    const navigateToCart=( )=>{
        navigation.navigate('CartScreen')
    }


    return (
            <Row>
                <TouchableOpacity onPress={()=>navigateToCart()}>
                    <RelativeLayout style={{padding:10}}>
                        <Icon name={"shopping-bag"} size={24} color={Color.white}/>
                        <AbsoluteLayout style={{top:0,right:0}}>
                            <Text style={styles.counter}>{props.count}</Text>
                        </AbsoluteLayout>
                    </RelativeLayout>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>navigateToNotification()}>
                    <RelativeLayout style={{padding:10}}>
                        <Icon name={"bell"} size={24} color={Color.white}/>
                        <AbsoluteLayout style={{top:0,right:0}}>
                            {/*<Text style={styles.counter}>0</Text>*/}
                        </AbsoluteLayout>
                    </RelativeLayout>
                </TouchableOpacity>
            </Row>
        );

}

export default AppBarRight;
