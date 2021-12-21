import React, {Component} from 'react';
import Column from "../../components/Column";
import AppStatusBar from "../../components/AppStatusBar";
import {Color, Dimension, Fonts} from "../../theme";
import RelativeLayout from "../../components/RelativeLayout";
import {Image, ScrollView, StyleSheet, Text,FlatList,View,Alert} from "react-native";
import AbsoluteLayout from "../../components/AbsoluteLayout";
import Icon from "react-native-vector-icons/FontAwesome";
import FeatherIcon from "react-native-vector-icons/Feather";
import {TouchableOpacity} from "react-native-gesture-handler";
import Row from "../../components/Rows";
import Card from "../../components/Card";
import MenuItem from "../Products/Component/MenuItem";
import { BASE_URL } from './../../axios/API';
import TextViewMedium from './../../components/CustomText/TextViewMedium';

class Index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            productData: '',
            selectedItem:[],
            count:''
        }
    }

    componentDidMount(){
        this.setState({productData:this.props.route.params.item})
    }

    addToCard=(item)=>{
        let selectedItem = this.state.selected;
        selectedItem.push(item);
        this.setState({selectedItem:selectedItem})
    }

    checkCartItem=(id)=>{
        let item = this.state.selectedItem.find((item,index)=>item.id===id);
        if(item){
            return false;
        }else{
            return true;
        }
    }

    renderItem=({item})=>{
     return <MenuItem item={item}/>
    }


    render() {
        return (
            <Column style={{backgroundColor: Color.white, flex:1}}>
                <AppStatusBar
                    backgroundColor={Color.transparent}
                    barStyle="dark-content"
                    translucent
                />
                <RelativeLayout style={{marginTop: -25}}>
                    <Image source={{ uri: BASE_URL+this.state.productData.image}}  style={{width: Dimension.window.width, height: 270}}/>
                    <AbsoluteLayout style={{
                        padding: 20,
                        marginTop: 10,
                        width: '100%',
                        justifyContent: 'space-between',
                        flexDirection: 'row'
                    }}>
                        <TouchableOpacity onPress={()=>this.props.navigation.replace("HomeScreen")}>
                            <Icon name={"angle-left"} size={30} color={Color.black}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>  this.props.navigation.replace('Home')}>
                            <Icon name={"share"} size={20} color={Color.black}/>
                        </TouchableOpacity>
                    </AbsoluteLayout>
                </RelativeLayout>
                <Column style={{
                    backgroundColor: Color.white,
                    borderRadius: 30,
                    marginTop: -30
                }}>
                    <Column style={{padding:20}}>
                        <Text style={styles.title}>{this.state.productData.name}</Text>
                        <Text style={styles.subTitle}>{this.state.productData.category}</Text>
                        <Row style={{marginTop: 10}}>
                            <Row style={styles.optionContainer}>
                                <Icon name={'star'} color={Color.yellow} size={24}/>
                                <Text style={styles.optionText}>{this.state.productData.rating}</Text>
                            </Row>
                            <Row style={[styles.optionContainer, {backgroundColor: '#e2e7ff'}]}>
                                <Icon name={'clock-o'} color={Color.blue} size={24}/>
                                <Text style={styles.optionText}>{this.state.productData.prepareTime}</Text>
                            </Row>

                        </Row>
                        <TextViewMedium style={{ marginTop:20 }}>{this.state.productData.description}</TextViewMedium>

                    </Column>

                </Column>
                <FlatList
                    data={this.state.productData.menu}
                    renderItem={this.renderItem}
                    keyExtractor={item => item.id}
                />

            </Column>

        );

    }
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


export default Index;
