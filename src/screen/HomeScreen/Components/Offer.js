import React, {Component} from 'react';
import {FlatList, View,Text,StyleSheet, Image} from "react-native";
import {Color, Dimension, Fonts} from "../../../theme";
import Row from "../../../components/Rows";
import Column from "../../../components/Column";


const bgColor=['#E5454C',"#0184F7","#08A791","#FAA33F","#B6644F","#FB3061"];
const Width =  Dimension.window.width-60;
const Offer =(props)=>{
    const renderItem=({item})=>{
        const  BackgroundColor = bgColor[ Math.floor(Math.random() * 5) + 1]
        return(
            <View style={[styles.offerContainer,{backgroundColor:BackgroundColor}]}>
                <Row style={{justifyContent:'space-between', alignItems:'center'}}>
                    <Column style={{padding:20}}>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.code}>{item.code}</Text>
                        <Text style={styles.subTitle}>{item.subTitle}</Text>
                        <Text style={[styles.subTitle, {color: Color.yellow, fontFamily: Fonts.primarySemiBold, fontSize: 18}]}>{item.offerName}</Text>
                    </Column>
                    <Image source={item.icon} style={{height: 150, width: 150}}/>

                </Row>
            </View>
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
        borderRadius:20
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
