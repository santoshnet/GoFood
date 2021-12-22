import React, {Component} from 'react';
import {FlatList, Image, StyleSheet, Text,TouchableOpacity} from 'react-native';
import Column from '../../components/Column';
import AppStatusBar from '../../components/AppStatusBar';
import {Color, Fonts} from '../../theme';
import ToolBar from '../../components/ToolBar';
import {restaurantData} from '../../data/restaurantData';
import Row from '../../components/Rows';
import Card from '../../components/Card';
import StarRating from 'react-native-star-rating';
import ProgressLoader from 'rn-progress-loader';
import Toast from 'react-native-simple-toast';
import {addCart,updateCart,getUserCart, getProductByCategory} from './../../axios/ServerRequest';
import {getCart, getUserDetails,setCart} from '../../utils/LocalStorage';
import { BASE_URL } from './../../axios/API';
import MenuItem from './Component/MenuItem';
import Badge from '../../components/Badge';

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productData: [],
      visible: false,
      category: null,
      user:null,
      cartCount:0,
      cart:[]
    };
  }


  
  async componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      console.log('refresh');
    });
    let category = this.props.route.params.item;
    const user = await getUserDetails();
    const cart = await getCart();
    this.setState({category: category,visible: true,user:user,cart:cart, cartCount:cart.length});

    getProductByCategory(user.token, category.id)
      .then(response => {
        let data = response.data;
        if (data.status === 200) {
          this.setState({productData: data.products});
        } else {
          Toast.show(data.message, Toast.LONG);
        }
        this.setState({visible: false});
      })
      .catch(error => {
        console.log(error);
        this.setState({visible: false});
      });
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
      
      this.setState({cartCount:this.state.cartCount-1});
    }else {
      Toast.show(data.message, Toast.LONG);
    }
    this.getCartData();
  })
  .catch(error => {
    console.log(error);
  });

}

getCartData=()=>{
  getUserCart(this.state.user.token)
      .then(response => {
        let data = response.data;
        if (data.status === 200) {
          this.setState({cart:data.cart, cartCount:data.cart.length});
          setCart(data.cart);
        } else {
          Toast.show(data.message, Toast.LONG);
        }
      })
      .catch(error => {
        console.log(error);
      });
}

getQuantity=(item)=>{
  console.log(this.state.cart);
   let data= this.state.cart.find(item1=>item1.product_id==item.id);
   if(data){
    return data.quantity;
   }
   return 0;

}

  renderItem = ({item}) => {
    let quantity = this.getQuantity(item);
    return (
    <MenuItem item={item} addToCart={this.addToCart} updateToCart={this.updateToCart} quantity={quantity}/>
    );
  };

  render() {
    return (
      <Column>
        <AppStatusBar
          backgroundColor={Color.colorPrimary}
          barStyle="light-content"
        />
        <ToolBar
          icon={'chevron-left'}
          title={this.state.category ? this.state.category.category : null}
          onPress={() => this.props.navigation.replace('HomeScreen')}>
          <Badge count={this.state.cartCount}/>    
        </ToolBar>
        <FlatList
          data={this.state.productData}
          renderItem={this.renderItem}
          keyExtractor={item => item.id}
          extraData={this.state}
        />
        <ProgressLoader
          visible={this.state.visible}
          isModal={true}
          isHUD={true}
          hudColor={'#000000'}
          color={'#FFFFFF'}
        />
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
  locationText: {
    fontFamily: Fonts.primaryRegular,
    fontSize: 12,
    color: Color.colorPrimary,
    marginLeft: 5,
  },
});

export default Products;
