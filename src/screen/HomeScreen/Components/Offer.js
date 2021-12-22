import React, {Component} from 'react';
import {FlatList, View,Text,StyleSheet, Image} from "react-native";
import {Color, Dimension, Fonts} from "../../../theme";
import Row from "../../../components/Rows";
import Column from "../../../components/Column";
import { BASE_URL } from '../../../axios/API';


const Width =  Dimension.window.width-60;
const Offer =(props)=>{
    const renderItem=({item})=>{
        return(
           <Image source={{ uri:BASE_URL+item.image }} style={styles.offerContainer}/>
        );
    }

        return (
            <FlatList
                data={props.data}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => `${item.id}`}
                renderItem={renderItem}
                contentContainerStyle={{paddingVertical: 20}}
            />
        );
}


const styles = StyleSheet.create({
    offerContainer:{
        width: Width,
        height:170,
        margin:10,
        borderRadius:20,
        resizeMode:'stretch'
    },
    title:{
        fontSize:18,
        fontFamily: Fonts.primaryBold,
        color: Color.white
    },
    subTitle:{
        fontSize:16,
        fontFamily: Fonts.primaryRegular,
        color: '#ffdcdc'
    },
    code:{
        fontSize:25,
        fontFamily: Fonts.primaryBlack,
        color: Color.white,
        marginTop: 10,
        marginBottom: 10
    }

});


export default Offer;
