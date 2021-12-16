import React, {Component} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from "react-native";
import {Color, Fonts, Strings} from "../theme";
import Logo from '../assets/images/logo.png'
import UserInput from "../components/UserInput";
import Button from "../components/Button";
import Toast from 'react-native-simple-toast';
import {TouchableOpacity} from "react-native-gesture-handler";
import RelativeLayout from "../components/RelativeLayout";
import Mobile from '../assets/icons/mobile.png'
import Lock from '../assets/icons/padlock.png'
import AppStatusBar from './../components/AppStatusBar';

class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            password: ''
        };
    }


    hideModal = () => {
        this.setState({isModalVisible: false})
    }
    handleSubmit = () => {
        if (this.state.phone.length === 0 || this.state.phone.length < 10) {
            Toast.showWithGravity(Strings.enterValidPhone, Toast.LONG, Toast.BOTTOM);

        } else if (this.state.password.length === 0 || this.state.password.length < 6) {
            Toast.showWithGravity(Strings.enterValidPassword, Toast.LONG, Toast.BOTTOM);
        } else {
            this.props.navigation.navigate("HomeScreen")
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
                        <Text style={styles.title}>{Strings.enter_your_phone}</Text>
                        <Text style={styles.subTitle}>{Strings.enter_your_phone_details}</Text>
                        <View style={styles.space}/>
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
                            title={Strings.login_text}
                            style={{marginTop: 25}}
                            onPress={this.handleSubmit}
                        />
                        <TouchableOpacity style={{padding: 20, marginTop: 20}}
                                          onPress={() => this.props.navigation.navigate("RegisterScreen")}>
                            <Text style={styles.newUser}>{Strings.newUser}</Text>
                        </TouchableOpacity>
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
        height: 150,
        width: 150,
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
    newUser: {
        color: Color.gray,
        fontFamily: Fonts.primarySemiBold,
        alignSelf: 'center',
        fontSize: 16

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

export default LoginScreen;
