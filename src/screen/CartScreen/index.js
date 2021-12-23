import React, {Component} from 'react';
import Column from '../../components/Column';
import AppStatusBar from '../../components/AppStatusBar';
import {Color, Fonts} from '../../theme';
import ToolBar from '../../components/ToolBar';
import {FlatList, StyleSheet, Text, View, ScrollView} from 'react-native';
import {cartData} from '../../data/restaurantData';
import CartItem from './CartItem';
import Card from '../../components/Card';
import Row from '../../components/Rows';
import Button from '../../components/Button';
import {getCartDetails,updateCart} from './../../axios/ServerRequest';
import {getUserDetails} from '../../utils/LocalStorage';
import ProgressLoader from 'rn-progress-loader';
class CartScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartData: [],
      total: 0,
      user: null,
      visible: false,
    };
  }

  async componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
        console.log('refresh');
      });
    const user = await getUserDetails();
    this.setState({user: user, visible: true});
    this.getCartData();
  }

  componentWillUnmount() {
    this._unsubscribe();
  }


  renderItem = ({item}) => {
    return <CartItem item={item} updateToCart={this.updateToCart} />;
  };


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

  getCartData = () => {
    getCartDetails(this.state.user.token)
      .then(response => {
        let data = response.data;
        if (data.status === 200) {
          this.setState({cartData: data.cart, total: data.total});
        } else {
          Toast.show(data.message, Toast.LONG);
        }
        this.setState({visible: false});
      })
      .catch(error => {
        console.log(error);
        this.setState({visible: false});
      });
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
          title={'Cart'}
          onPress={() => this.props.navigation.goBack()}
        />
        <ScrollView>
          <Column style={{paddingBottom: 100}}>
            <FlatList
              data={this.state.cartData}
              renderItem={this.renderItem}
              keyExtractor={item => item.id}
              extraData={this.state}
            />
            {this.state.cartData && this.state.cartData.length>0 ?<Column>
            
            <Card style={{padding: 20}}>
              <Row style={{justifyContent: 'space-between', margin: 5}}>
                <Text style={styles.optionText}>Item Total</Text>
                <Text style={styles.optionText}>₹ {this.state.total}</Text>
              </Row>
              <Row style={{justifyContent: 'space-between', margin: 5}}>
                <Text style={styles.optionText}>Discount</Text>
                <Text style={styles.optionText}>₹ 0</Text>
              </Row>
              <Row style={{justifyContent: 'space-between', margin: 5}}>
                <Text style={styles.optionText}>Delivery Fee</Text>
                <Text style={[styles.optionText, {color: Color.green}]}>
                  Free
                </Text>
              </Row>
              <View style={styles.border} />
              <Row style={{justifyContent: 'space-between', margin: 5}}>
                <Text style={styles.title}>Total</Text>
                <Text style={styles.title}>₹ {this.state.total}</Text>
              </Row>
              <View style={styles.border} />
            </Card>
            <Button
              title={'Checkout'}
              style={{margin: 20}}
              onPress={() => this.props.navigation.navigate('Orders')}
            />
            </Column>:null}
          </Column>
        </ScrollView>
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
    fontSize: 30,
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
  border: {
    borderBottomWidth: 1,
    borderBottomColor: '#dedede',
    marginTop: 10,
    marginBottom: 10,
  },
});

export default CartScreen;
