import React, {Component} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from "react-native";
import {Color, Fonts, Strings} from "../theme";
import Logo from '../assets/images/logo.png'
import UserInput from "../components/UserInput";
import Button from "../components/Button";
import Toast from 'react-native-simple-toast';
import User from '../assets/icons/user.png'
import Mobile from '../assets/icons/mobile.png'
import Lock from '../assets/icons/padlock.png'
import RelativeLayout from "../components/RelativeLayout";
import AppStatusBar from './../components/AppStatusBar';

class RegisterScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            phone: '',
            password: ''
        };
    }


    hideModal = () => {
        this.setState({isModalVisible: false})
    }
    handleSubmit = () => {
        if (this.state.name.length === 0 || this.state.name.length < 3) {
            Toast.showWithGravity(Strings.enterValidName, Toast.LONG, Toast.BOTTOM);
        }
        if (this.state.phone.length === 0 || this.state.phone.length < 10) {
            Toast.showWithGravity(Strings.enterValidPhone, Toast.LONG, Toast.BOTTOM);

        } else if (this.state.password.length === 0 || this.state.password.length < 6) {
            Toast.showWithGravity(Strings.enterValidPassword, Toast.LONG, Toast.BOTTOM);
        } else {
            this.props.navigation.replace("OTPScreen", {"phone": this.state.phone})
        }

    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: Color.backgroundColor}}>
                 <AppStatusBar
          backgroundColor={Color.colorPrimary}
          barStyle="light-content"
          visibleStatusBar={false}
        />
                <ScrollView>
                    <View style={styles.mainContainer}>
                        <Image source={Logo} style={styles.logo}/>
                        <Text style={styles.title}>{Strings.enter_your_details}</Text>
                        <Text style={styles.subTitle}>{Strings.enter_your_persoal_details}</Text>
                        <View style={styles.space}/>
                        <RelativeLayout>
                            <UserInput
                                placeholder={Strings.enterName}
                                maxLength={50}
                                value={this.state.name}
                                containerStyle={{paddingLeft: 35}}
                                onChangeText={(name) => this.setState({name})}/>
                            <Image source={User} style={styles.inputIcon}/>

                        </RelativeLayout>
                        <RelativeLayout>
                            <UserInput
                                placeholder={Strings.enterPhoneNumber}
                                maxLength={10}
                                keyboardType={"number-pad"}
                                value={this.state.phone}
                                containerStyle={{paddingLeft: 35}}
                                onChangeText={(phone) => this.setState({phone})}/>
                            <Image source={Mobile} style={styles.inputIcon}/>

                        </RelativeLayout>
                       <RelativeLayout>
                           <UserInput
                               placeholder={Strings.enterPassword}
                               maxLength={20}
                               value={this.state.password}
                               secureTextEntry={true}
                               containerStyle={{paddingLeft: 35}}
                               onChangeText={(password) => this.setState({password})}/>
                           <Image source={Lock} style={styles.inputIcon}/>
                       </RelativeLayout>

                        <Button
                            title={Strings.signup_text}
                            style={{marginTop: 25}}
                            onPress={this.handleSubmit}
                        />
                    </View>
                </ScrollView>


            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        display: 'flex',
        flexDirection: 'column',
        padding: 20
    },
    logo: {
        height: 100,
        width: 100,
        alignSelf: 'center',
        margin: 30,
        resizeMode: 'contain'

    },
    title: {
        fontFamily: Fonts.primaryBold,
        fontSize: 20,
        color: Color.titleColor,
        marginTop: 50,

    },
    subTitle: {
        fontFamily: Fonts.primaryRegular,
        fontSize: 16,
        color: Color.grayColor,
        marginTop: 10
    },
    space: {
        height: 50
    },
    smallButton: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: Color.colorPrimary,
        borderRadius: 15,
        marginLeft: 50
    },
    inputIcon: {
        height: 18,
        width: 18,
        position: 'absolute',
        top: 14,
        left: 10,
        resizeMode:'contain'
    }

})

export default RegisterScreen;
