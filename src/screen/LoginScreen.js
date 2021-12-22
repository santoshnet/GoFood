import React, {Component} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from "react-native";
import {Color, Fonts, Strings} from "../theme";
import Logo from '../assets/images/logo.png'
import UserInput from "../components/UserInput";
import Button from "../components/Button";
import Toast from 'react-native-simple-toast';
import {TouchableOpacity} from "react-native-gesture-handler";
import RelativeLayout from "../components/RelativeLayout";
import Mobile from '../assets/icons/email.png'
import Lock from '../assets/icons/padlock.png'
import AppStatusBar from './../components/AppStatusBar';
import Validator from '../utils/Validator/Validator';
import {
    DEFAULT_RULE,
    NAME_RULE,
    EMAIL_RULE,
    PASSWORD_RULE,
  } from '../utils/Validator/rule';
import { getFirebaseToken, setApiKey, setUserDetails } from '../utils/LocalStorage';
import { userLogin } from '../axios/ServerRequest';


class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            loading:false
        };
    }


    hideModal = () => {
        this.setState({isModalVisible: false})
    }
    handleSubmit = async() => {
        const {
            email,
            password,
          } = this.state;

       const firebase_token =   await getFirebaseToken(); 
        if (!Validator(email, DEFAULT_RULE)) {
            Toast.show(Strings.enterValidEmail, Toast.LONG);
            return;
          } else if (!Validator(email, EMAIL_RULE)) {
            Toast.show(Strings.enterValidEmail, Toast.LONG);
            return;
          } else if (!Validator(password, DEFAULT_RULE)) {
            Toast.show(Strings.enterValidPassword, Toast.LONG);
            return;
          } else if (!Validator(password, PASSWORD_RULE)) {
            Toast.show(Strings.enterValidPassword, Toast.LONG);
            return;
          }
          this.setState({loading: true});
         userLogin(email, password,firebase_token)
        .then(response => {
          let data = response.data;
          if (data.status === 200 && data.data) {
            Toast.show(data.message, Toast.LONG);
            setUserDetails(response.data.data);
            setApiKey(data.data.token);
            if(data.data.verified==0){
                this.props.navigation.replace('OTPScreen');
            }else{
                this.props.navigation.replace('HomeScreen');
            }
          } else {
            Toast.show(data.message,Toast.LONG);
          }
          this.setState({loading: false});
        })
        .catch(error => {
          console.log(error);
          this.setState({loading: false});
        });

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
                                placeholder={Strings.enterEmail}
                                maxLength={100}
                                value={this.state.email}
                                containerStyle={{paddingLeft: 35}}
                                onChangeText={(email) => this.setState({email})}/>
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
                            loading={this.state.loading}
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
