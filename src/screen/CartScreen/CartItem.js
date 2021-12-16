import React, {Component, useState,useEffect} from 'react';
import Row from "../../components/Rows";
import {Image, StyleSheet, Text} from "react-native";
import Column from "../../components/Column";
import {Color, Fonts} from "../../theme";
import {TouchableOpacity} from "react-native-gesture-handler";
import FeatherIcon from "react-native-vector-icons/Feather";
import Card from "../../components/Card";

const CartItem =({item})=> {
         const [counter,setCounter] = useState(0);
         useEffect(()=>{
             setCounter(item.quantity);
         },[]);

        return (
            <Card>
                <Row>
                    <Image source={item.menu.photo} style={{height:100, width:100, borderRadius: 20, flex:0.25}}/>
                    <Column style={{flex:0.75, marginLeft: 10}}>
                        <Text style={styles.title}>{item.menu.name}</Text>
                        <Row style={{justifyContent:'space-between', marginTop:25}}>
                            <Text style={styles.optionText}>₹ {item.menu.price}</Text>

                                <Row style={{alignItems: 'center',height:35, backgroundColor: '#F6F6F6', borderRadius: 8, marginRight: 20}}>
                                    <TouchableOpacity style={{padding:6}} onPress={()=> {
                                        if(counter>0){
                                            setCounter(counter - 1)
                                        }

                                    }}>
                                        <FeatherIcon name={"minus"} size={14} color={Color.black} />
                                    </TouchableOpacity>
                                    <Text style={[styles.optionText,{width:27,textAlign: 'center'}]}>{counter}</Text>
                                    <TouchableOpacity style={{padding:6}} onPress={()=>setCounter(counter+1)}>
                                        <FeatherIcon name={"plus"} size={14} color={Color.black} />
                                    </TouchableOpacity>
                            </Row>
                        </Row>

                    </Column>

                </Row>
            </Card>

        );

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
    }
});
export default CartItem;
