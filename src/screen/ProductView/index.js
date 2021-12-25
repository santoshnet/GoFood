import React, {Component} from 'react';
import Column from '../../components/Column';
import AppStatusBar from '../../components/AppStatusBar';
import {Color, Dimension, Fonts} from '../../theme';
import RelativeLayout from '../../components/RelativeLayout';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  FlatList,
  View,
  Alert,
} from 'react-native';
import AbsoluteLayout from '../../components/AbsoluteLayout';
import Icon from 'react-native-vector-icons/FontAwesome';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Row from '../../components/Rows';
import Card from '../../components/Card';
import MenuItem from '../Products/Component/MenuItem';
import {BASE_URL} from './../../axios/API';
import TextViewMedium from './../../components/CustomText/TextViewMedium';
import {addCart,updateCart,getUserCart} from './../../axios/ServerRequest';
import {getUserDetails,getCart,setCart} from '../../utils/LocalStorage';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productData: '',
      selectedItem: [],
      quantity: 0,
      user:null,
      cartCount:0,
      cart:[]
    };
  }

  async componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      console.log('refresh');
    });
    const user = await getUserDetails();
    const cart = await getCart();
    this.setState({productData: this.props.route.params.item,user:user,cart:cart, cartCount:cart.length});
    this.getCartData();

  }

  componentWillUnmount() {
    this._unsubscribe();
  }


addToCart=(param)=>{
  addCart(this.state.user.token,param.id,param.quantity)
      .then(response => {
        let data = response.data;
        if (data.status === 200) {
          this.getCartData();
        } else {
          Toast.show(data.message, Toast.LONG);
        }
      })
      .catch(error => {
        console.log(error);
      });


}
updateToCart=(param)=>{
  updateCart(this.state.user.token,param.id,param.quantity)
  .then(response => {
    let data = response.data;
    if (data.status === 200) {
      console.log(data.message);
     
    } else if(data.status === 204){
      
      this.setState({quantity:this.state.quantity-1});
    }else {
      Toast.show(data.message, Toast.LONG);
    }
    this.getCartData();
  })
  .catch(error => {
    console.log(error);
  });

}

setQuantity=()=>{
  console.log(this.state.cart);
   let data= this.state.cart.find(item1=>item1.product_id==this.state.productData.id);
   if(data){
     this.setState({quantity:data.quantity})
  }else{
    this.setState({quantity:0})

  }

}

getCartData=()=>{
  getUserCart(this.state.user.token)
      .then(response => {
        let data = response.data;
        if (data.status === 200) {
          this.setState({cart:data.cart, cartCount:data.cart.length});
          setCart(data.cart);
          this.setQuantity();
        } else {
          Toast.show(data.message, Toast.LONG);
        }
      })
      .catch(error => {
        console.log(error);
      });
}






  render() {
      const {quantity,productData} = this.state;
    return (
      <Column style={{backgroundColor: Color.white, flex: 1}}>
        <AppStatusBar
          backgroundColor={Color.transparent}
          barStyle="dark-content"
          translucent
        />
        <RelativeLayout style={{marginTop: -25}}>
          <Image
            source={{uri: BASE_URL + productData.image}}
            style={{width: Dimension.window.width, height: 270}}
          />
          <AbsoluteLayout
            style={{
              padding: 20,
              marginTop: 10,
              width: '100%',
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              onPress={() => this.props.navigation.replace('HomeScreen')}>
              <Icon name={'angle-left'} size={30} color={Color.black} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.replace('Home')}>
              <Icon name={'share'} size={20} color={Color.black} />
            </TouchableOpacity>
          </AbsoluteLayout>
        </RelativeLayout>
        <Column
          style={{
            backgroundColor: Color.white,
            borderRadius: 30,
            marginTop: -30,
          }}>
          <Column style={{padding: 20}}>
            <Text style={styles.title}>{productData.name}</Text>
            <Text style={styles.subTitle}>
              {productData.category}
            </Text>
            <Row style={{marginTop: 10}}>
              <Row style={styles.optionContainer}>
                <Icon name={'star'} color={Color.yellow} size={24} />
                <Text style={styles.optionText}>
                  {productData.rating}
                </Text>
              </Row>
              <Row
                style={[styles.optionContainer, {backgroundColor: '#e2e7ff'}]}>
                <Icon name={'clock-o'} color={Color.blue} size={24} />
                <Text style={styles.optionText}>
                  {productData.prepareTime}
                </Text>
              </Row>

              <Row>
                {quantity == 0 ? (
                  <TouchableOpacity
                    style={{
                      padding: 10,
                      borderRadius: 20,
                      backgroundColor: Color.colorPrimary,
                    }}
                    onPress={() => this.addToCart({quantity:parseInt(quantity)+1,id:productData.id})}>
                    <FeatherIcon name={'plus'} size={14} color={Color.white} />
                  </TouchableOpacity>
                ) : (
                  <Row style={{alignItems: 'center', height: 35}}>
                    <TouchableOpacity
                      style={{
                        padding: 6,
                        borderRadius: 20,
                        backgroundColor: Color.colorPrimary,
                      }}
                      onPress={() => this.updateToCart({quantity:parseInt(quantity)-1,id:productData.id})}>
                      <FeatherIcon
                        name={'minus'}
                        size={14}
                        color={Color.white}
                      />
                    </TouchableOpacity>
                    <Text
                      style={[
                        styles.optionText,
                        {width: 27, textAlign: 'center'},
                      ]}>
                      {quantity}
                    </Text>
                    <TouchableOpacity
                      style={{
                        padding: 6,
                        borderRadius: 20,
                        marginLeft: 10,
                        backgroundColor: Color.colorPrimary,
                      }}
                      onPress={() => this.updateToCart({quantity:parseInt(quantity)+1,id:productData.id})}>
                      <FeatherIcon
                        name={'plus'}
                        size={14}
                        color={Color.white}
                      />
                    </TouchableOpacity>
                  </Row>
                )}
              </Row>
            </Row>
            <TextViewMedium style={{marginTop: 20}}>
              {productData.description}
            </TextViewMedium>
          </Column>
        </Column>
       
      </Column>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontFamily: Fonts.primarySemiBold,
    fontSize: 18,
    color: Color.black,
  },
  subTitle: {
    fontFamily: Fonts.primaryRegular,
    fontSize: 14,
    color: Color.grayColor,
  },
  optionText: {
    fontFamily: Fonts.primarySemiBold,
    fontSize: 16,
    color: Color.black,
    marginLeft: 10,
  },

  optionContainer: {
    alignItems: 'center',
    backgroundColor: '#fff2d8',
    borderRadius: 20,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 3,
    paddingBottom: 3,
    marginRight: 20,
  },
});

export default Index;
