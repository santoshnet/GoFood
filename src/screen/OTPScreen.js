import React, {Component} from 'react';
import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import AppStatusBar from '../components/AppStatusBar';
import {Color, Dimension, Fonts, Strings} from '../theme';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import Validator from '../utils/Validator/Validator';
import {DEFAULT_RULE, PHONE_RULE} from '../utils/Validator/rule';
import {checkInternetConnection} from '../axios/ServerRequest';
import LoadingButton from '../components/LoadingButton';
import Logo from '../assets/images/logo.png';
import Button from '../components/Button';

class OTPScreen extends Component {
    pinInput = React.createRef();

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            showOTP: true,
            showTimer: false,
            code: '',
            mobile: '',
            mobileError: false,
            mobileErrorMessage: '',
            otp: '',
            screenHeight: 0,
            timer: 30
        };
    }

    componentDidMount = () => {
        checkInternetConnection();
    };

    componentWillUnmount(){
        clearInterval(this.interval);
    }

    componentDidUpdate(){
        if(this.state.timer === 1){
            clearInterval(this.interval);
            this.setState({timer:30, showTimer:false})
        }

    }

    onChangeMobile(text) {
        this.resetState();
        this.setState({
            mobile: text.replace(/[^0-9]/g, ''),
        });
    }

    onContentSizeChange = (contentWidth, contentHeight) => {
        // Save the content height in state
        this.setState({screenHeight: contentHeight});
    };
    sendOTP = () => {
        const {mobile} = this.state;
        if (!Validator(mobile, DEFAULT_RULE)) {
            this.setState({
                mobileErrorMessage: Strings.mobileErrorMessage,
                mobileError: true,
            });
            return;
        }
        if (!Validator(mobile, PHONE_RULE)) {
            this.setState({
                mobileErrorMessage: Strings.mobileErrorMessage,
                mobileError: true,
            });
            return;
        }
        this.sendVerifyOTP();
    };

    sendVerifyOTP = () => {
        let OTP = Math.floor(1000 + Math.random() * 9000).toString();
        this.setState({code: OTP, showTimer: true});
        this.interval = setInterval(
            () => this.setState((prevState)=> ({ timer: prevState.timer - 1 })),
            1000
        );
    };

    verifyOTP = () => {
        if (this.state.otp === this.state.code) {
            this.dropDownAlertRef.alertWithType(
                'success',
                '#GS55001',
                Strings.passworResetSuccess,
            );
            this.props.navigation.replace('HomeScreen');
        } else {
            this.setState({otp: ''});
            this.dropDownAlertRef.alertWithType(
                'error',
                'Error',
                Strings.enterValidOTP,
            );
        }
    };

    resetState = () => {
        this.setState({
            mobileErrorMessage: '',
            mobileError: false,
        });
    };

    _checkCode = otp => {
        if (otp != '1234') {
            this.pinInput.current.shake().then(() => this.setState({code: ''}));
        }else{
            this.props.navigation.navigate("Home");
        }
    };

    render() {
        const {mobile} = this.state;
        const scrollEnabled = this.state.screenHeight > Dimension.window.height;
        return (
            <View style={styles.container}>
                <AppStatusBar
                    backgroundColor={Color.colorPrimary}
                    barStyle="light-content"
                />
                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollview}
                    scrollEnabled={scrollEnabled}
                    onContentSizeChange={this.onContentSizeChange}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps={'always'}>
                    <Image source={Logo} style={styles.logo}/>

                    <View style={styles.imageContainer}>
                        <Image
                            source={require('../assets/images/mail_box_img.png')}
                            style={styles.imageStyle}
                        />
                    </View>

                    <View style={styles.contentContainer}>
                        <Text style={styles.title}>{Strings.otpText}</Text>

                        <Text style={styles.subTitle}>{`Enter OTP send to ${this.props.route.params.phone}`}</Text>

                        <View style={styles.inputStyle}>
                            <SmoothPinCodeInput
                                ref={this.pinInput}
                                cellStyle={{
                                    borderWidth: 2,
                                    borderRadius: 5,
                                    borderColor: Color.white,
                                    backgroundColor: Color.white,
                                }}
                                cellStyleFocused={{
                                    borderColor: Color.colorPrimary,
                                }}
                                autoFocus={true}
                                cellSpacing={15}
                                value={this.state.otp}
                                onFulfill={this._checkCode}
                                onTextChange={otp => this.setState({otp})}
                                onBackspace={() => console.log('No more back.')}
                            />

                            <Text style={styles.subTitle}>{Strings.notReceiveOTP}</Text>

                            {this.state.showTimer?
                             <Text  style={[
                                    styles.subTitle,
                                    {color: Color.colorPrimary, marginBottom: 10},
                                ]}>Please Wait {this.state.timer}</Text>:<TouchableOpacity
                                    onPress={() => {
                                        this.sendVerifyOTP();
                                    }}>
                                    <Text
                                        style={[
                                            styles.subTitle,
                                            {color: Color.colorPrimary, marginBottom: 10},
                                        ]}>
                                        {Strings.resendOTP}
                                    </Text>
                                </TouchableOpacity>
                            }
                           <Button title={Strings.verifyOTP} onPress={()=>this.props.navigation.replace('HomeScreen')}/>
                        </View>

                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    inputStyle: {
        width: '100%',
        paddingLeft: '20%',
        paddingRight: '20%',
        marginTop: 10,
    },
    container: {
        flex: 1,
        backgroundColor: Color.backgroundColor,
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
    },

    contentContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },

    imageStyle: {
        height: 250,
        width: 250,
        marginTop: '5%',
    },
    title: {
        fontSize: 25,
        fontWeight: '700',
        fontFamily: Fonts.primaryBold,
        marginTop: 10,
        color: Color.textColor,
    },
    containerStyle: {
        marginTop: 30,
    },
    subTitle: {
        fontSize: 18,
        fontWeight:'700',
        fontFamily: Fonts.primarySemiBold,
        marginTop: 20,
        color: Color.grayColor,
        textAlign: 'center',
        marginLeft: '5%',
        marginRight: '5%',
    },
    logo: {
        height: 150,
        width: 150,
        alignSelf: 'center',
        marginTop:30,
        resizeMode: 'contain'
    },
});

export default OTPScreen;
