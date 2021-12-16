import React, {Component} from 'react';
import {Image, ScrollView, StyleSheet, Text} from "react-native";
import Column from "../../components/Column";
import AppStatusBar from "../../components/AppStatusBar";
import {Color, Fonts} from "../../theme";
import ToolBar from "../../components/ToolBar";
import {TouchableOpacity} from "react-native-gesture-handler";
import UserImage from '../../assets/images/user.png'
import RelativeLayout from "../../components/RelativeLayout";
import AbsoluteLayout from "../../components/AbsoluteLayout";
import Icon from "react-native-vector-icons/FontAwesome";
import UserInput from "../../components/UserInput";

import UserIcon from '../../assets/icons/user.png';
import EmailIcon from '../../assets/icons/email.png';
import PhoneIcon from '../../assets/icons/smartphone.png';
import AddressIcon from '../../assets/icons/map-pin.png';

class ManageProfile extends Component {
    render() {
        return (
            <Column>
                <AppStatusBar
                    backgroundColor={Color.colorPrimary}
                    barStyle="light-content"
                />
                <ToolBar icon={"chevron-left"} title={"Profile"}
                         onPress={() => this.props.navigation.goBack()}>
                    <TouchableOpacity   onPress={() => this.props.navigation.goBack()}>
                        <Text style={styles.saveText}>Save</Text>
                    </TouchableOpacity>
                </ToolBar>
                <ScrollView>
                    <Column style={{padding: 10}}>
                        <RelativeLayout style={{marginTop: 20, alignSelf: 'center'}}>
                            <Image source={UserImage} style={styles.userImage}/>
                            <AbsoluteLayout style={styles.iconContainer}>
                                <TouchableOpacity>
                                    <Icon name="camera" size={20} color={Color.white}/>
                                </TouchableOpacity>

                            </AbsoluteLayout>
                        </RelativeLayout>
                        <Column style={{padding: 10, marginTop: 30}}>
                            <RelativeLayout>
                                <UserInput placeholder={"Name"} containerStyle={{paddingLeft:40}}/>
                                <AbsoluteLayout style={{marginTop: 14, marginLeft: 15}}>
                                    <Image source={UserIcon} style={styles.icon}/>
                                </AbsoluteLayout>
                            </RelativeLayout>
                            <RelativeLayout>
                                <UserInput placeholder={"Email"} containerStyle={{paddingLeft: 40}}/>
                                <AbsoluteLayout style={{marginTop: 14, marginLeft: 15}}>
                                    <Image source={EmailIcon} style={styles.icon}/>
                                </AbsoluteLayout>
                            </RelativeLayout>
                            <RelativeLayout>
                                <UserInput placeholder={"Phone"} containerStyle={{paddingLeft: 40}}/>
                                <AbsoluteLayout style={{marginTop: 14, marginLeft: 15}}>
                                    <Image source={PhoneIcon} style={styles.icon}/>
                                </AbsoluteLayout>
                            </RelativeLayout>
                            <RelativeLayout>
                                <UserInput placeholder={"Address"} containerStyle={{paddingLeft: 40}}/>
                                <AbsoluteLayout style={{marginTop: 14, marginLeft: 15}}>
                                    <Image source={AddressIcon} style={styles.icon}/>
                                </AbsoluteLayout>
                            </RelativeLayout>

                        </Column>
                    </Column>
                </ScrollView>


            </Column>
        );
    }
}


const styles = StyleSheet.create({
    saveText: {
        fontFamily: Fonts.primarySemiBold,
        color: Color.white,
        fontSize: 16
    },
    userImage: {
        height: 100,
        width: 100,
        borderRadius: 60,
        borderWidth: 2,
        borderColor: Color.white
    },
    iconContainer: {
        height: 40,
        width: 40,
        borderRadius: 30,
        backgroundColor: Color.colorPrimary,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        marginLeft: 80
    },
    icon:{
        height: 18,
        width: 18,
    }
});

export default ManageProfile;
