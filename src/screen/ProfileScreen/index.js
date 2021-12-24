import React, {Component} from 'react';
import {Image, ScrollView, StyleSheet, Switch, Text,TouchableOpacity} from "react-native";
import Column from "../../components/Column";
import {Color, Fonts} from "../../theme";
import AppStatusBar from "../../components/AppStatusBar";
import ToolBar from "../../components/ToolBar";
import RelativeLayout from "../../components/RelativeLayout";
import UserImage from "../../assets/images/user.png";
import Row from "../../components/Rows";
import Card from "../../components/Card";

import Delivery from '../../assets/icons/delivery.png';
import Lock from '../../assets/icons/lock.png';
import Giftbox from '../../assets/icons/giftbox.png';
import Placeholder from '../../assets/icons/placeholder.png';
import UserProfile from '../../assets/icons/user_profile.png';
import Payment from '../../assets/icons/credit-card.png';
import Notification from '../../assets/icons/notification-bell.png';
import PasswordImage from '../../assets/images/password.png';
import Theme from '../../assets/icons/theme.png';
import Logout from '../../assets/icons/logout.png';
import Icon from "react-native-vector-icons/FontAwesome";
import AbsoluteLayout from "../../components/AbsoluteLayout";
import Modal from 'react-native-modal';
import UserInput from "../../components/UserInput";
import Button from "../../components/Button";
import { getUserDetails } from '../../utils/LocalStorage';

class ProfileScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            user:null
        }
    }

    async componentDidMount(){
      const user = await getUserDetails();
      this.setState({user:user});
    }

    openModal = () => {
        this.setState({isVisible: true})
    };
    closeModal = () => {
        this.setState({isVisible: false})
    };


    render() {
        const {user} = this.state
        return (
            <Column>
                <AppStatusBar
                    backgroundColor={Color.colorPrimary}
                    barStyle="light-content"
                />
                <ToolBar icon={"chevron-left"} title={"Profile"}
                         onPress={() => this.props.navigation.goBack()}></ToolBar>
                <RelativeLayout style={styles.header}>
                    <Row style={{padding: 20, alignItems: 'center'}}>
                        <Image source={UserImage} style={{borderRadius: 50, height: 50, width: 50}}/>
                        <Column style={{marginLeft: 10}}>
                            <Text style={styles.title}>{user?user.name:null}</Text>
                            <Text style={styles.email}>{user?user.email:null}</Text>
                        </Column>
                    </Row>
                </RelativeLayout>
                <RelativeLayout style={{paddingLeft: 10, paddingRight: 10, marginTop: -50}}>
                    <Card style={{padding: 20}}>
                        <Row style={{justifyContent: 'space-around'}}>
                            <Column style={{justifyContent: 'center', alignItems: 'center'}}>
                                <RelativeLayout style={styles.optionBackground}>
                                    <Image source={Delivery} style={{height: 35, width: 35}}/>
                                </RelativeLayout>
                                <Text style={styles.optionText}>{`My All ${"\n"}Orders`}</Text>
                            </Column>
                            <Column style={{justifyContent: 'center', alignItems: 'center'}}>
                                <RelativeLayout style={[styles.optionBackground, {backgroundColor: '#F8E5CC'}]}>
                                    <Image source={Giftbox} style={{height: 30, width: 30}}/>
                                </RelativeLayout>
                                <Text style={styles.optionText}>{`Offer & ${"\n"}Promos`}</Text>
                            </Column>
                            <Column style={{justifyContent: 'center', alignItems: 'center'}}>
                                <RelativeLayout style={[styles.optionBackground, {backgroundColor: '#c5e0ff'}]}>
                                    <Image source={Placeholder} style={{height: 30, width: 30}}/>
                                </RelativeLayout>
                                <Text style={styles.optionText}>{`Delivery ${"\n"}Address`}</Text>
                            </Column>

                        </Row>
                    </Card>
                </RelativeLayout>
                <RelativeLayout style={{marginTop: -10}}>
                    <ScrollView style={{padding: 10, height: 500}}>
                        <Card style={{padding: 20, marginBottom: 150}}>
                            <Text style={styles.heading}>My Account</Text>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate("ManageProfile")}>
                                <Row style={{marginTop: 20, alignItems: 'center'}}>
                                    <Image source={UserProfile}
                                           style={{flex: 0.1, height: 20, width: 20, resizeMode: 'contain'}}/>
                                    <Text style={styles.text}>Manage Profile</Text>
                                    <Icon name={"angle-right"} color={Color.black} size={24} style={{marginLeft: 20}}/>
                                </Row>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.openModal()}>
                                <Row style={{marginTop: 20, alignItems: 'center'}}>
                                    <Image source={Lock}
                                           style={{flex: 0.1, height: 20, width: 20, resizeMode: 'contain'}}/>
                                    <Text style={styles.text}>Change Password</Text>
                                    <Icon name={"angle-right"} color={Color.black} size={24} style={{marginLeft: 20}}/>
                                </Row>
                            </TouchableOpacity>

                            <Row style={{marginTop: 20, alignItems: 'center'}}>
                                <Image source={Payment}
                                       style={{flex: 0.1, height: 20, width: 20, resizeMode: 'contain'}}/>

                                <Text style={styles.text}>Payment</Text>
                                <Icon name={"angle-right"} color={Color.black} size={24} style={{marginLeft: 20}}/>
                            </Row>
                            <Text style={[styles.heading, {marginTop: 20}]}>Notification</Text>
                            <Row style={{marginTop: 20, alignItems: 'center'}}>
                                <Image source={Notification}
                                       style={{flex: 0.1, height: 20, width: 20, resizeMode: 'contain'}}/>
                                <Text style={styles.text}>Notification</Text>
                                <Switch
                                    style={{flex: 0.1}}
                                    trackColor={{false: "#767577", true: Color.colorPrimary}}
                                    thumbColor={"#f4f3f4"}
                                    ios_backgroundColor="#3e3e3e"
                                />
                            </Row>
                            <Row style={{marginTop: 20, alignItems: 'center'}}>
                                <Image source={Notification}
                                       style={{flex: 0.1, height: 20, width: 20, resizeMode: 'contain'}}/>
                                <Text style={styles.text}>Notification</Text>
                                <Switch
                                    style={{flex: 0.1}}
                                    trackColor={{false: "#767577", true: Color.colorPrimary}}
                                    thumbColor={"#f4f3f4"}
                                    ios_backgroundColor="#3e3e3e"
                                />
                            </Row>
                            <Text style={[styles.heading, {marginTop: 20}]}>More</Text>
                            <Row style={{marginTop: 20, alignItems: 'center'}}>
                                <Image source={Theme}
                                       style={{flex: 0.1, height: 20, width: 20, resizeMode: 'contain'}}/>
                                <Text style={styles.text}>Theme</Text>
                                <Icon name={"angle-right"} color={Color.black} size={24} style={{marginLeft: 20}}/>
                            </Row>
                            <Row style={{marginTop: 20, alignItems: 'center'}}>
                                <Image source={Logout}
                                       style={{flex: 0.1, height: 20, width: 20, resizeMode: 'contain'}}/>
                                <Text style={styles.text}>Logout</Text>
                                <Icon name={"angle-right"} color={Color.black} size={24} style={{marginLeft: 20}}/>
                            </Row>

                        </Card>
                    </ScrollView>
                </RelativeLayout>

                <Modal isVisible={this.state.isVisible}>
                    <Card style={{borderRadius: 20}}>
                        <RelativeLayout style={{margin: -10}}>
                            <Column>
                                <RelativeLayout
                                    style={{height: 170, borderRadius: 20, backgroundColor: Color.colorPrimary}}>
                                    <Image source={PasswordImage} style={{alignSelf: 'center'}}
                                           style={{height: 70, width: 70, alignSelf: 'center', marginTop: 20}}/>
                                    <Text style={[styles.title, {alignSelf: 'center', marginTop: 10}]}>Change
                                        Password</Text>
                                </RelativeLayout>
                            </Column>
                            <AbsoluteLayout style={{right: 0, margin: 10}}>
                                <TouchableOpacity onPress={() => this.closeModal()}>
                                    <Icon name="times" color={Color.white} size={24}/>
                                </TouchableOpacity>
                            </AbsoluteLayout>
                        </RelativeLayout>
                        <Column style={{padding: 20,margin:-25,borderRadius:20, backgroundColor:Color.backgroundColor}}>
                              <UserInput placeholder={"Current Password"} secureTextEntry={true} />
                              <UserInput placeholder={"New Password"} secureTextEntry={true}/>
                              <UserInput placeholder={"Confirm Password"} secureTextEntry={true}/>
                              <Button title={"Change Password"}/>
                        </Column>
                    </Card>
                </Modal>
            </Column>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: Color.colorPrimary,
        padding: 10,
        minHeight: 150,
        borderBottomRightRadius: 40,
        borderBottomLeftRadius: 40,
    },
    title: {
        fontFamily: Fonts.primarySemiBold,
        fontSize: 18,
        color: Color.white
    },
    email: {
        fontFamily: Fonts.primaryRegular,
        fontSize: 16,
        color: Color.white
    },
    optionBackground: {
        height: 60,
        width: 60,
        borderRadius: 40,
        backgroundColor: '#D2E6E5',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    optionText: {
        fontFamily: Fonts.primarySemiBold,
        fontSize: 14,
        color: Color.black
    },
    heading: {
        fontFamily: Fonts.primarySemiBold,
        fontSize: 16,
    },
    text: {
        fontFamily: Fonts.primaryRegular,
        fontSize: 14,
        marginLeft: 10,
        flex: 0.8
    },


})

export default ProfileScreen;
