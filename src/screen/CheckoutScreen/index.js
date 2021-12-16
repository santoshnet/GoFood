import React, {Component} from 'react';
import Column from "../../components/Column";
import AppStatusBar from "../../components/AppStatusBar";
import {Color, Dimension, Fonts} from "../../theme";
import ToolBar from "../../components/ToolBar";
import Row from "../../components/Rows";
import Card from "../../components/Card";
import Icon from "react-native-vector-icons/FontAwesome";
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Button from "../../components/Button";
import RelativeLayout from "../../components/RelativeLayout";
import AbsoluteLayout from "../../components/AbsoluteLayout";
import {cartData} from '../../data/restaurantData'

class Checkout extends Component {

    constructor(props) {
        super(props);
        this.state ={
            paymentMethod:'cash'
        }
    }

    render() {
        return (
            <Column>
                <AppStatusBar
                    backgroundColor={Color.colorPrimary}
                    barStyle="light-content"
                />
                <ToolBar icon={"chevron-left"} title={"Checkout"}
                         onPress={() => this.props.navigation.goBack()}/>
                <RelativeLayout style={{height:Dimension.window.height-50}}>
                    <ScrollView>
                        <Column style={{marginBottom: 60}}>
                            <Card style={{padding: 20}}>
                                <Row style={{justifyContent: 'space-between'}}>
                                    <Text style={styles.title}>Address</Text>
                                    <TouchableOpacity>
                                        <Text style={[styles.optionText, {color: Color.colorPrimary}]}>change</Text>
                                    </TouchableOpacity>
                                </Row>

                                <Row style={{marginTop: 10}}>
                                    <Icon name={"map-marker"} size={34} color={Color.colorPrimary}/>
                                    <Text style={styles.optionText}>#123, Nilam Bhaban,
                                        bhagabanpur,Karnatak-560025</Text>
                                </Row>
                            </Card>
                            <Card style={{padding: 20}}>
                                {cartData.map((item,index)=>{
                                      return(
                                          <Column>
                                              <Text style={styles.title}>{item.menu.name}</Text>
                                              <Text style={styles.subTitle}>{item.quantity} X ₹{item.menu.price} = ₹{item.quantity*item.menu.price}</Text>
                                              <View style={styles.border}/>
                                          </Column>
                                      );
                                })}

                                <Row style={{justifyContent: 'space-between', margin: 5}}>
                                    <Text style={styles.optionText}>Item Total</Text>
                                    <Text style={styles.optionText}>₹ 40</Text>
                                </Row>
                                <Row style={{justifyContent: 'space-between', margin: 5}}>
                                    <Text style={styles.optionText}>Discount</Text>
                                    <Text style={styles.optionText}>₹ 10</Text>
                                </Row>
                                <Row style={{justifyContent: 'space-between', margin: 5}}>
                                    <Text style={styles.optionText}>Delivery Fee</Text>
                                    <Text style={[styles.optionText, {color: Color.green}]}>Free</Text>
                                </Row>
                                <View style={styles.border}/>
                                <Row style={{justifyContent: 'space-between', margin: 5}}>
                                    <Text style={styles.title}>Total</Text>
                                    <Text style={styles.title}>₹ 30</Text>
                                </Row>
                                <View style={styles.border}/>
                            </Card>
                            <Card style={{padding:20}}>
                                <Text style={styles.title}>Payment Method</Text>
                               <TouchableOpacity onPress={()=>this.setState({paymentMethod:'cash'})}>
                                   <Row style={{margin:10, justifyContent:'space-between'}}>
                                       <Text style={styles.title}>Cash On Delivery</Text>
                                       {this.state.paymentMethod==="cash"?
                                           <Icon size={24} color={Color.colorPrimary} name={"check-circle"}/>:
                                           <Icon size={24} color={Color.graylight} name={"check-circle-o"}/>}
                                   </Row>
                               </TouchableOpacity>
                                <TouchableOpacity onPress={()=>this.setState({paymentMethod:'online'})}>
                                    <Row style={{margin: 10, justifyContent: 'space-between'}}>
                                        <Text style={styles.title}>Online Payment</Text>
                                        {this.state.paymentMethod === "online" ?
                                            <Icon size={24} color={Color.colorPrimary} name={"check-circle"}/> :
                                            <Icon size={24} color={Color.graylight} name={"check-circle-o"}/>}
                                    </Row>
                                </TouchableOpacity>

                            </Card>
                        </Column>
                    </ScrollView>
                    <AbsoluteLayout style={{width:'100%', bottom:0}}>
                        <Button title={"Confirm Order"} style={{borderRadius: 0}}
                                onPress={() => this.props.navigation.replace("OrderSuccess")}/>
                    </AbsoluteLayout>
                </RelativeLayout>
            </Column>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        fontFamily: Fonts.primarySemiBold,
        fontSize: 16,
        color: Color.black
    }, subTitle: {
        fontFamily: Fonts.primaryRegular,
        fontSize: 14,
        color: Color.grayColor
    },
    optionText: {
        fontFamily: Fonts.primaryRegular,
        fontSize: 16,
        color: Color.black,
        marginLeft: 15
    },

    optionContainer: {
        alignItems: 'center',
        backgroundColor: '#fff2d8',
        borderRadius: 20,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 3,
        paddingBottom: 3,
        marginRight: 20
    },
    border: {
        borderBottomWidth: 1,
        borderBottomColor: '#dedede',
        marginTop: 10,
        marginBottom: 10
    }
});

export default Checkout;
