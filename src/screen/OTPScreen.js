import React, {Component} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AppStatusBar from '../components/AppStatusBar';
import {Color, Dimension, Fonts, Strings} from '../theme';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import Validator from '../utils/Validator/Validator';
import {DEFAULT_RULE, PHONE_RULE} from '../utils/Validator/rule';
import {
  checkInternetConnection,
  otpVerification,
  resendOTP,
} from '../axios/ServerRequest';
import LoadingButton from '../components/LoadingButton';
import Logo from '../assets/images/logo.png';
import Button from '../components/Button';
import {getUserDetails} from '../utils/LocalStorage';
import TextViewLight from './../components/CustomText/TextViewLight';
import Column from '../components/Column';
import TextViewRegular from './../components/CustomText/TextViewRegular';
import Toast from 'react-native-simple-toast';

class OTPScreen extends Component {
  pinInput = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      showOTP: true,
      showTimer: false,
      code: '',
      email: '',
      mobileError: false,
      mobileErrorMessage: '',
      otp: '',
      screenHeight: 0,
      timer: 30,
    };
  }

  async componentDidMount() {
    checkInternetConnection();
    const userDetails = await getUserDetails();
    this.setState({email: userDetails.email});
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  componentDidUpdate() {
    if (this.state.timer === 1) {
      clearInterval(this.interval);
      this.setState({timer: 30, showTimer: false});
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

  sendVerifyOTP = () => {
    resendOTP(this.state.email)
      .then(response => {
        let data = response.data;
        if (data.status === 200) {
            this.setState({showTimer:true})
            this.startTimer();
          Toast.show(data.message, Toast.LONG);
        } else {
          Toast.show(data.message, Toast.LONG);
        }
        this.setState({loading: false});
      })
      .catch(error => {
        console.log(error);
        this.setState({loading: false});
      });
  };

  verifyOTP = () => {
    if (this.state.otp < 6) {
      Toast.show('Please enter valid OTP', Toast.LONG);
    } else {
        this.setState({loading: true});
        otpVerification(this.state.email,this.state.otp)
        .then(response => {
          let data = response.data;
          if (data.status === 200) {
            Toast.show(data.message, Toast.LONG);
            this.props.navigation.navigate('HomeScreen');
          } else {
            Toast.show(data.message, Toast.LONG);
          }
          this.setState({loading: false});
        })
        .catch(error => {
          console.log(error);
          this.setState({loading: false});
        });
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
    } else {
      this.props.navigation.navigate('Home');
    }
  };

  startTimer=()=>{
    this.interval = setInterval(
        () => this.setState((prevState)=> ({ timer: prevState.timer - 1 })),
        1000
      );
  }

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
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps={'always'}>
          <View>
            <Image source={Logo} style={styles.logo} />

            <View style={styles.imageContainer}>
              <Image
                source={require('../assets/images/mail_box_img.png')}
                style={styles.imageStyle}
              />
            </View>

            <View style={styles.contentContainer}>
              <Text style={styles.title}>{Strings.otpText}</Text>

              <Text
                style={
                  styles.subTitle
                }>{`Enter OTP send to ${this.state.email}`}</Text>

              <View style={{marginTop: 20}}>
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
                  codeLength={6}
                  onTextChange={otp => this.setState({otp})}
                  onBackspace={() => console.log('No more back.')}
                />

                <Text style={styles.subTitle}>{Strings.notReceiveOTP}</Text>

                {this.state.showTimer ? (
                  <Text
                    style={[
                      styles.subTitle,
                      {color: Color.colorPrimary, marginBottom: 10},
                    ]}>
                    Please Wait {this.state.timer}
                  </Text>
                ) : (
                  <TouchableOpacity
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
                )}
                <Button title={Strings.verifyOTP} onPress={this.verifyOTP} loading={this.state.loading}/>
                
              </View>
            </View>
            <TextViewRegular style={{ textAlign:'center',margin:10, fontSize:10 }}>
                  Incase Your OTP email not found in INBOX then please check
                  your spam.
            </TextViewRegular>
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
    fontWeight: '700',
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
    resizeMode: 'contain',
  },
});

export default OTPScreen;
