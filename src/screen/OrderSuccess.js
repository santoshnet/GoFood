import React, {Component} from 'react';
import {View,Text,BackHandler } from "react-native";
import {styles} from "../components/styles/styles";
import {Color, Dimension} from "../theme";
import OrderSuccessImage from '../assets/images/order-success.png'
import {Image} from "react-native";
import Button from "../components/Button";
class OrderSuccess extends Component {

    constructor(props) {
        super(props)
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {
        this.props.navigation.replace("HomeScreen");
        return true;
    }

    render() {
        return (
            <View style={{flex:1, backgroundColor:Color.white}}>
                    <Image source={OrderSuccessImage} style={{width: Dimension.window.width, resizeMode:'contain'}}/>
                    <Button title={"Shop More"} style={{width:200, alignSelf:'center', marginTop:20}} onPress={()=>this.props.navigation.replace("HomeScreen")}/>
            </View>
        );
    }
}

export default OrderSuccess;
