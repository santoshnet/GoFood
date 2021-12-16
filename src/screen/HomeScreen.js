import React, {Component} from 'react';
import AppBar from '../components/AppBar';
import ToolBar from '../components/ToolBar';
import RelativeLayout from '../components/RelativeLayout';
import Column from '../components/Column';
import Row from '../components/Row';
import TextViewLight from '../components/CustomText/TextViewLight';
import TextViewRegular from '../components/CustomText/TextViewRegular';
import TextViewMedium from '../components/CustomText/TextViewMedium';
import TextViewBold from '../components/CustomText/TextViewBold';
import Button from '../components/Button';
import {Alert} from 'react-native';
import {Colors, Fonts} from '../theme';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImageView from '../components/ImageView';
import home from '../assets/images/home.png';
class HomeScreen extends Component {
    render() {
        return (
            <RelativeLayout>
                <Column>
                    <AppBar/>
                    <ToolBar title={'Home'}/>
                    <Row>
                        <TextViewLight text={'Light Text'} style={{margin: 10}}/>
                        <TextViewRegular text={'Regular Text'} style={{margin: 10}}/>
                        <TextViewMedium text={'Medium Text'} style={{margin: 10}}/>
                        <TextViewBold text={'Bold Text'} style={{margin: 10}}/>
                    </Row>
                    <Row>
                        <Button text={"Button Text"} onClick={()=>{Alert.alert("Button click")}}/>
                        <Button text={"Button Text"} onClick={()=>{Alert.alert("Button click")}}
                                style={{width:150,borderRadius:30, backgroundColor:Colors.colorPrimaryDark}}
                                textStyle={{color:Colors.white, fontFamily: Fonts.primarySemiBold}}
                        />
                        <Button onClick={()=>{Alert.alert("Button click")}}
                                style={{height:60, width:60, borderRadius:30, backgroundColor:Colors.colorPrimaryDark}}
                                textStyle={{color:Colors.white, fontFamily: Fonts.primarySemiBold}}
                        >
                            <Icon name={"heart"} size={24} color={Colors.white}/>
                        </Button>
                    </Row>
                    <Row>
                        <ImageView url={"https://reactnative.dev/img/tiny_logo.png"}/>
                        <ImageView src={home} style={{height:50, width:50}}/>
                    </Row>
                </Column>
            </RelativeLayout>
        );
    }
}

export default HomeScreen;
