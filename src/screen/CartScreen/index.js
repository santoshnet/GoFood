import React, {Component} from 'react';
import Column from "../../components/Column";
import AppStatusBar from "../../components/AppStatusBar";
import {Color, Fonts} from "../../theme";
import ToolBar from "../../components/ToolBar";
import {FlatList, StyleSheet, Text, View,ScrollView} from "react-native";
import {cartData} from '../../data/restaurantData'
import CartItem from "./CartItem";
import Card from "../../components/Card";
import Row from "../../components/Rows";
import Button from "../../components/Button";

class CartScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cartData: cartData
        }
    }

    renderItem = ({item}) => {
        return <CartItem item={item}/>
    }

    render() {
        return (
            <Column>
                <AppStatusBar
                    backgroundColor={Color.colorPrimary}
                    barStyle="light-content"
                />
                <ToolBar icon={"chevron-left"} title={"Cart"}
                         onPress={() => this.props.navigation.goBack()}/>
                <ScrollView>
                    <Column style={{paddingBottom: 100}}>
                        <FlatList
                            data={cartData}
                            renderItem={this.renderItem}
                            keyExtractor={item => item.id}
                        />
                        <Card style={{padding: 20}}>
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
                        <Button title={"Checkout"} style={{margin:20}} onPress={()=>this.props.navigation.navigate("Orders")}/>
                    </Column>
                </ScrollView>
            </Column>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        fontFamily: Fonts.primarySemiBold,
        fontSize: 30,
        color: Color.black
    }, subTitle: {
        fontFamily: Fonts.primaryRegular,
        fontSize: 14,
        color: Color.grayColor
    },
    optionText: {
        fontFamily: Fonts.primarySemiBold,
        fontSize: 16,
        color: Color.black,
        marginLeft: 10
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

export default CartScreen;
