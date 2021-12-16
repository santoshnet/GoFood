import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  ImageBackground,
} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import Color from '../theme/Color';
import Fonts from "../theme/Fonts";

const slides = [
  {
    key: 1,
    logo: require('../assets/images/logo.png'),
    title: 'Order Online',
    text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    image: require('../assets/images/slide1.png'),
  },
  {
    key: 2,
    logo: require('../assets/images/logo.png'),
    title: 'Your Choice',
    text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' ,
    image: require('../assets/images/slide2.png'),
  },
  {
    key: 3,
    logo: require('../assets/images/logo.png'),
    title: 'Fast Delivery',
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    image: require('../assets/images/slide3.png'),
  },
];

class WelcomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _renderItem = ({item}) => {
    return (
      <View style={styles.slide}>
        {/*<Image source={item.logo} style={styles.logo}/>*/}
        <Image source={item.image} style={styles.image}/>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.text}>{item.text}</Text>

      </View>
    );
  };
  _onDone = () => {
    this.props.navigation.replace('LoginScreen');
  };
  _renderNextButton = () => {
    return (
      <View style={styles.button}>
        <Text style={styles.next}>Next</Text>
      </View>
    );
  };
  _renderDoneButton = () => {
    return (
      <View style={styles.button}>
        <Text style={styles.done}>Done</Text>
      </View>
    );
  };
  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar
          backgroundColor={Color.colorPrimary}
          barStyle="light-content"
        />
        <AppIntroSlider
          renderItem={this._renderItem}
          data={slides}
          bottomButton
          onDone={this._onDone}
          dotStyle={styles.dots}
          activeDotStyle={styles.activeDots}
          renderDoneButton={this._renderDoneButton}
          renderNextButton={this._renderNextButton}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    flexDirection: 'column',
    alignItems:'center',
    marginBottom:50
  },
  image: {
    height:'60%',
    width:'100%',
    resizeMode:'contain',
    marginTop: 30,
  },
  logo: {
    height:100,
    width:100
  },

  text: {
    color: Color.gray,
    textAlign: 'center',
    fontFamily: Fonts.primaryRegular,
    fontWeight:'500',
    fontSize:14,
    margin:20,
    paddingLeft: 10,
    paddingRight: 10

  },
  title: {
    fontSize: 40,
    color: Color.black,
    textAlign: 'center',
    fontWeight:'700',
    fontFamily:Fonts.primaryBold,
    marginTop:20
  },
  dots: {
    backgroundColor: Color.gray,
  },
  activeDots: {
    backgroundColor: Color.colorPrimary,
    width:25
  },
  next: {
    fontSize: 18,
    fontWeight: '700',
    color: Color.white,
  },
  done: {
    fontSize: 18,
    fontWeight: '700',
    color: Color.white,
  },
  button:{
    backgroundColor:Color.colorPrimary,
    width: 150,
    paddingLeft:20,
    paddingRight:20,
    paddingTop:15,
    paddingBottom:15,
    borderRadius:40,
    justifyContent:'center',
    alignItems: 'center',
    alignSelf:'center'
  }
});

export default WelcomeScreen;
