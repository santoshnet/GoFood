import React, {useState} from 'react';
import Card from "../../../components/Card";
import Row from "../../../components/Rows";
import {Image, StyleSheet, Text} from "react-native";
import Column from "../../../components/Column";
import {TouchableOpacity} from "react-native-gesture-handler";
import {Color, Fonts} from "../../../theme";
import FeatherIcon from "react-native-vector-icons/Feather";

const MenuItem =({item})=> {
    const [counter,setCounter] = useState(0);
    return(
        <Card>
            <Row>
                <Image source={item.photo} style={{height:100, width:100, borderRadius: 20, flex:0.25}}/>
                <Column style={{flex:0.75, marginLeft: 10}}>
                    <Text style={styles.title}>{item.name}</Text>
                    <Text  style={styles.subTitle}>{item.description}</Text>
                    <Row style={{justifyContent:'space-between'}}>
                        <Text style={styles.optionText}>₹ {item.price}</Text>
                        <Row>
                            {counter==0?
                            <TouchableOpacity style={{padding:10, borderRadius: 20, backgroundColor: Color.colorPrimary}} onPress={()=>setCounter(counter+1)}>
                                <FeatherIcon name={"plus"} size={14} color={Color.white} />
                            </TouchableOpacity>:
                                <Row style={{alignItems: 'center',height:35}}>
                                    <TouchableOpacity style={{padding:6, borderRadius: 20, backgroundColor: Color.colorPrimary}} onPress={()=>setCounter(counter-1)}>
                                        <FeatherIcon name={"minus"} size={14} color={Color.white} />
                                    </TouchableOpacity>
                                    <Text style={[styles.optionText,{width:27,textAlign: 'center'}]}>{counter}</Text>
                                    <TouchableOpacity style={{padding:6, borderRadius: 20, marginLeft:10, backgroundColor: Color.colorPrimary}} onPress={()=>setCounter(counter+1)}>
                                        <FeatherIcon name={"plus"} size={14} color={Color.white} />
                                    </TouchableOpacity>
                                </Row>
                            }
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
        fontSize: 18,
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

export default MenuItem;
