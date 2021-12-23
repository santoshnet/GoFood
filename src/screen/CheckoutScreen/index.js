import React, {Component} from 'react';
import Column from '../../components/Column';
import AppStatusBar from '../../components/AppStatusBar';
import {Color, Dimension, Fonts} from '../../theme';
import ToolBar from '../../components/ToolBar';
import Row from '../../components/Rows';
import Card from '../../components/Card';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Button from '../../components/Button';
import RelativeLayout from '../../components/RelativeLayout';
import AbsoluteLayout from '../../components/AbsoluteLayout';
import {cartData} from '../../data/restaurantData';
import { getCartDetails, placeOrder, updateUserData } from './../../axios/ServerRequest';
import ProgressLoader from 'rn-progress-loader';
import {getUserDetails,setUserDetails} from '../../utils/LocalStorage';
import TextViewMedium from '../../components/CustomText/TextViewMedium';
import TextViewRegular from '../../components/CustomText/TextViewRegular';
import TextViewBold from './../../components/CustomText/TextViewBold';
import Modal from 'react-native-modal';
import UserInput from './../../components/UserInput/index';
import Toast from 'react-native-simple-toast';
import { DEFAULT_RULE, PHONE_RULE } from './../../utils/Validator/rule/index';
import Validator from '../../utils/Validator/Validator';

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paymentMethod: 'cash',
      cartData: [],
      total: 0,
      user: null,
      visible: false,
      isModalVisible: false,
      mobile:'',
      address:'',
      state:'',
      city:'',
      zip:'',
      loading:false
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

  handleSubmit=()=>{
     const {user, mobile,address,state,city,zip}= this.state;
     if (!Validator(mobile, DEFAULT_RULE)) {
        Toast.show("Enter your mobile number", Toast.LONG);
        return;
      } else if (!Validator(mobile, PHONE_RULE)) {
        Toast.show("Enter Valid Mobile Number", Toast.LONG);
        return;
      }else if (!Validator(address, DEFAULT_RULE)) {
        Toast.show("Enter your address", Toast.LONG);
        return;
      }else if (!Validator(state, DEFAULT_RULE)) {
        Toast.show("Enter your state", Toast.LONG);
        return;
      }else if (!Validator(city, DEFAULT_RULE)) {
        Toast.show("Enter your city", Toast.LONG);
        return;
      }else if (!Validator(zip, DEFAULT_RULE)) {
        Toast.show("Enter your zip code", Toast.LONG);
        return;
      }else{
        this.setState({loading: true});
        updateUserData(user.token,mobile,address,state,city,zip)
        .then(response => {
          let data = response.data;

          if (data.status === 200 && data.data) {
              console.log(data.data);
              Toast.show(data.message, Toast.LONG);
              this.setState({user:data.data})
              setUserDetails(data.data);
          }else{
            Toast.show(data.message, Toast.LONG);
          }
          this.setState({loading:false, isModalVisible:false});

        })
        .catch(error => {
          console.log(error);
          this.setState({loading: false});
        });

      }

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

  changeAddress=()=>{
      const {user} = this.state;
      this.setState(
          {
            isModalVisible: true,
            mobile:user.mobile,
            address:user.address,
            state:user.state,
            city:user.city,
            zip:user.zip,
          }
      );
  }




  checkoutOrder=()=>{
    const {cartData} = this.state;
    let orderItems =  cartData.map(item=>{
      let orderItem={
        product_id: item.id,
        quantity:item.quantity
      };
      return orderItem;
    });
    this.setState({loading:true})

     placeOrder(this.state.user.token,orderItems)
      .then(response => {
        let data = response.data;
        if (data.status === 200) {
          Toast.show(data.message, Toast.LONG);
          this.props.navigation.navigate("OrderSuccess");
        } else {
          Toast.show(data.message, Toast.LONG);
        }
        this.setState({visible: false, loading:false});
      })
      .catch(error => {
        console.log(error);
        this.setState({visible: false, loading:false});
      });
  }

  render() {
    const {user} = this.state;
    return (
      <Column>
        <AppStatusBar
          backgroundColor={Color.colorPrimary}
          barStyle="light-content"
        />
        <ToolBar
          icon={'chevron-left'}
          title={'Checkout'}
          onPress={() => this.props.navigation.goBack()}
        />
        <RelativeLayout style={{height: Dimension.window.height - 50}}>
          <ScrollView>
            <Column style={{marginBottom: 80}}>
              <Card style={{padding: 20}}>
                <Row style={{justifyContent: 'space-between'}}>
                  <Text style={styles.title}>Address</Text>
                  {user && user.address ? ( <TouchableOpacity onPress={this.changeAddress}>
                    <Text
                      style={[styles.optionText, {color: Color.colorPrimary}]}>
                      change
                    </Text>
                  </TouchableOpacity>):null}
                </Row>

                <Row style={{marginTop: 10}}>
                  <Icon
                    name={'map-marker'}
                    size={34}
                    color={Color.colorPrimary}
                  />
                  {user && user.address ? (
                    <Column style={{marginLeft: 10}}>
                      <TextViewMedium>{user.name}</TextViewMedium>
                      <TextViewRegular>
                        {user.mobile}, {user.email}
                      </TextViewRegular>
                      <TextViewRegular> {user.address}, {user.city}, {user.state}-{user.zip}</TextViewRegular>
                      <Text style={styles.optionText}></Text>
                    </Column>
                  ) : (
                    <TouchableOpacity
                      style={{padding: 10, marginLeft: 50}}
                      onPress={() => {
                        this.setState({isModalVisible: true});
                      }}>
                      <TextViewBold style={{fontSize: 20}}>
                        Add Address
                      </TextViewBold>
                    </TouchableOpacity>
                  )}
                </Row>
              </Card>
              <Card style={{padding: 20}}>
                {this.state.cartData &&
                  this.state.cartData.map((item, index) => {
                    return (
                      <Column key={index}>
                        <Text style={styles.title}>{item.name}</Text>
                        <Text style={styles.subTitle}>
                          {item.quantity} X ₹
                          {item.discount ? item.discount : item.price} = ₹
                          {parseInt(item.quantity) *
                            parseInt(
                              item.discount ? item.discount : item.price,
                            )}
                        </Text>
                        <View style={styles.border} />
                      </Column>
                    );
                  })}

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
              <Card style={{padding: 20}}>
                <Text style={styles.title}>Payment Method</Text>
                <TouchableOpacity
                  onPress={() => this.setState({paymentMethod: 'cash'})}>
                  <Row style={{margin: 10, justifyContent: 'space-between'}}>
                    <Text style={styles.title}>Cash On Delivery</Text>
                    {this.state.paymentMethod === 'cash' ? (
                      <Icon
                        size={24}
                        color={Color.colorPrimary}
                        name={'check-circle'}
                      />
                    ) : (
                      <Icon
                        size={24}
                        color={Color.graylight}
                        name={'check-circle-o'}
                      />
                    )}
                  </Row>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.setState({paymentMethod: 'online'})}>
                  <Row style={{margin: 10, justifyContent: 'space-between'}}>
                    <Text style={styles.title}>Online Payment</Text>
                    {this.state.paymentMethod === 'online' ? (
                      <Icon
                        size={24}
                        color={Color.colorPrimary}
                        name={'check-circle'}
                      />
                    ) : (
                      <Icon
                        size={24}
                        color={Color.graylight}
                        name={'check-circle-o'}
                      />
                    )}
                  </Row>
                </TouchableOpacity>
              </Card>
            </Column>
          </ScrollView>
          <AbsoluteLayout style={{width: '100%', bottom: 20}}>
           {user && user.address? 
            <Button
              title={'Confirm Order'}
              style={{borderRadius: 0}}
              onPress={this.checkoutOrder}
              loading={this.state.loading}
            />:null}
          </AbsoluteLayout>
        </RelativeLayout>
        <ProgressLoader
          visible={this.state.visible}
          isModal={true}
          isHUD={true}
          hudColor={'#000000'}
          color={'#FFFFFF'}
        />

        <Modal isVisible={this.state.isModalVisible}>
          <View style={{flex: 1, justifyContent:'flex-end'}}>
              <RelativeLayout style={{ backgroundColor:Color.backgroundColor, marginLeft:-20, marginRight:-20, marginBottom:-20, padding:20}}>
                  <Column>
                    <TextViewBold  style={{ alignSelf:'center', marginBottom:10 }}>Add Your Address</TextViewBold>
                    <UserInput placeholder="Enter Mobile Number" maxLength={10} value={this.state.mobile} onChangeText={(mobile) => this.setState({mobile})} keyboardType={"number-pad"}/>
                    <UserInput placeholder="Enter Address" value={this.state.address} onChangeText={(address) => this.setState({address})} multiline numberOfLines={4}/>
                    <UserInput placeholder="Enter State" maxLength={40} value={this.state.state} onChangeText={(state) => this.setState({state})} />
                    <UserInput placeholder="Enter City" maxLength={40} value={this.state.city} onChangeText={(city) => this.setState({city})} />
                    <UserInput placeholder="Enter Zip Code" maxLength={6} value={this.state.zip} onChangeText={(zip) => this.setState({zip})}  keyboardType={"number-pad"}/>
                    <Button
                            title={"Save"}
                            style={{marginTop: 25, marginBottom:20}}
                            onPress={this.handleSubmit}
                            loading={this.state.loading}
                        />
                  </Column>
                  <AbsoluteLayout style={{ right:10, top:10 }}>
                      <TouchableOpacity onPress={()=>{this.setState({isModalVisible:false})}}>
                          <Icon name='times' size={24} color={"red"}/>
                      </TouchableOpacity>
                  </AbsoluteLayout>
              
              </RelativeLayout>
            
          </View>
        </Modal>
      </Column>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontFamily: Fonts.primarySemiBold,
    fontSize: 16,
    color: Color.black,
  },
  subTitle: {
    fontFamily: Fonts.primaryRegular,
    fontSize: 14,
    color: Color.grayColor,
  },
  optionText: {
    fontFamily: Fonts.primaryRegular,
    fontSize: 16,
    color: Color.black,
    marginLeft: 15,
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

export default Checkout;
