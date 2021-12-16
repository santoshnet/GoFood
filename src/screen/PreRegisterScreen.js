import React, {Component} from 'react';
import {Image, StatusBar, StyleSheet, Text, View} from "react-native";
import Color from "../theme/Color";
import Logo from '../assets/images/logo-light.png';
import Strings from "../theme/Strings";
import Fonts from "../theme/Fonts";
import Card from "../components/Card";
import Icon from 'react-native-vector-icons/FontAwesome'
import {TouchableOpacity} from "react-native-gesture-handler";

class PreRegisterScreen extends Component {
    render() {
        return (
            <View style={{flex: 1, backgroundColor: Color.colorPrimary}}>
                <StatusBar
                    backgroundColor={Color.colorPrimary}
                    barStyle="light-content"
                />
                <View style={styles.mainContainer}>
                    <View style={styles.logoContainer}>
                        <Image source={Logo} style={styles.logo}></Image>
                    </View>
                    <View style={styles.loginContainer}>
                        <Card style={{backgroundColor: Color.colorPrimary}}>
                            <TouchableOpacity onPress={()=>{this.props.navigation.navigate("LoginScreen")}}>
                                <View style={styles.buttonStyle}>
                                    <Icon name={"mobile"} size={26} color={Color.white}/>
                                    <Text style={styles.loginText}>{Strings.connect_with_phone}</Text>
                                </View>
                            </TouchableOpacity>
                        </Card>
                        <Card style={{backgroundColor: Color.facebook}}>
                            <TouchableOpacity onPress={()=>{this.props.navigation.navigate("LoginScreen")}}>
                                <View style={styles.buttonStyle}>
                                    <Icon name={"facebook"} size={24} color={Color.white}/>
                                    <Text style={styles.loginText}>{Strings.connect_with_facebook}</Text>
                                </View>
                            </TouchableOpacity>
                        </Card>
                        <Card style={{backgroundColor: Color.google}}>
                            <TouchableOpacity>
                                <View style={styles.buttonStyle}>
                                    <Icon name={"google"} size={24} color={Color.white}/>
                                    <Text style={styles.loginText}>{Strings.connect_with_google}</Text>
                                </View>
                            </TouchableOpacity>
                        </Card>


                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: 'column',
    },
    logoContainer: {
        flex: 0.6,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        height: 100,
        width: 100,
        resizeMode: 'contain'

    },
    loginContainer: {
        flex: 0.4,
        flexDirection: 'column',
        backgroundColor: Color.white,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        padding: 20
    },
    buttonStyle: {
        display: 'flex',
        flexDirection: 'row',
        padding: 5,
        alignItems: 'center'
    },
    loginText: {
        color: Color.white,
        fontSize: 16,
        marginLeft: 10,
        fontFamily: Fonts.primarySemiBold
    }

});

export default PreRegisterScreen;
