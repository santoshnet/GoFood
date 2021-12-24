import React, {Component} from 'react';
import {StyleSheet, Text, ScrollView, Image, FlatList, View} from 'react-native';
import Column from '../../components/Column';
import AppStatusBar from '../../components/AppStatusBar';
import {Color, Fonts} from '../../theme';
import ToolBar from '../../components/ToolBar';
import Row from '../../components/Rows';
import RelativeLayout from '../../components/RelativeLayout';
import AbsoluteLayout from '../../components/AbsoluteLayout';
import Button from '../../components/Button';
import Steps from '../../components/Stepper/Steps';
import {BASE_URL} from '../../axios/API';
import Card from '../../components/Card';
import TextViewMedium from '../../components/CustomText/TextViewMedium';

class OrderStatus extends Component {
  componentDidMount() {}

  renderItem = ({item}) => {
    return (
       <Column style={{ margin:10 }}>
        <Row>
            <Image
                source={{uri: BASE_URL + item.itemImage}}
                style={{height: 50, width: 50, borderRadius: 5}}
            />
            <Column style={{ marginLeft:10 }}>
                <TextViewMedium>{item.itemName}</TextViewMedium>
                <TextViewMedium>{item.currency}{item.itemPrice} X {item.itemQuantity}= {item.currency}{item.itemTotal}</TextViewMedium>
            </Column>
            </Row>
            <View style={{ height:1, backgroundColor:Color.graylights, marginTop:5 }}></View>
       </Column>
        
     
    );
  };

  render() {
    const {order} = this.props.route.params;
    return (
      <Column>
        <AppStatusBar
          backgroundColor={Color.colorPrimary}
          barStyle="light-content"
        />
        <ToolBar
          icon={'chevron-left'}
          title={'Order Details'}
          onPress={() => this.props.navigation.goBack()}
        />

        {order ? (
          <RelativeLayout>
            <ScrollView>
              <Column style={{paddingTop: 20}}>
                <Row style={{ marginLeft:20 }}>
                  <Text style={styles.subTitle}>Order ID : </Text>
                  <Text style={styles.title}>#{order.id}</Text>
                </Row>
                <FlatList
                  data={order.orderList}
                  renderItem={this.renderItem}
                  keyExtractor={item => item.id}
                 
                />
                <TextViewMedium style={{ margin:20, alignSelf:'flex-end', fontSize:20 }}> Total : {order.total}</TextViewMedium>

                {/* <Button title={"Track Order"} onPress={()=>this.props.navigation.navigate("OrderDelivery")} style={{marginTop:100}}/> */}
              </Column>
            </ScrollView>
          </RelativeLayout>
        ) : null}
      </Column>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontFamily: Fonts.primarySemiBold,
  },
  subTitle: {
    fontSize: 16,
    fontFamily: Fonts.primaryRegular,
  },
});
export default OrderStatus;
