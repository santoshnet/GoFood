import React, {useState} from 'react';
import Card from '../../../components/Card';
import Row from '../../../components/Rows';
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Column from '../../../components/Column';
import {Color, Fonts} from '../../../theme';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {BASE_URL} from './../../../axios/API';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

const MenuItem = (props) => {
  const [counter, setCounter] = useState(0);
 const {item} = props;
  const navigation = useNavigation();
  const navigateToProductView = item => {
    navigation.navigate('ProductView', {item: item});
  };

  const addCart=()=>{
    setCounter(counter + 1)
    props.addToCart({quantity:1,id:item.id});
  }
  const updateCart=(count)=>{
    setCounter(count)
    props.updateToCart({quantity:count,id:item.id});
  }
  return (
    <Card>
      <Row>
        <TouchableOpacity
          onPress={() => navigateToProductView(item)}
          style={{flex: 0.25}}>
          <Image
            source={{uri: BASE_URL + item.image}}
            style={{height: 100, width: 100, borderRadius: 20}}
          />
        </TouchableOpacity>
        <Column style={{flex: 0.75, marginLeft: 10}}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.subTitle}>{item.category}</Text>
          <Row
            style={{
              backgroundColor: '#F2EFEE',
              borderRadius: 30,
              padding: 3,
              marginRight: 10,
              alignItems: 'center',
              justifyContent:'center',
              width:90
            }}>
            <Icon name={'clock'} color={Color.colorPrimary} size={12} />
            <Text style={styles.locationText}>{item.prepareTime}</Text>
          </Row>
          <Row style={{justifyContent: 'space-between'}}>
            <Text style={styles.optionText}>₹ {item.price}</Text>
            <Row>
              {props.quantity == 0 ? (
                <TouchableOpacity
                  style={{
                    padding: 10,
                    borderRadius: 20,
                    backgroundColor: Color.colorPrimary,
                  }}
                  onPress={addCart}>
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
                    onPress={()=>updateCart(counter-1)}>
                    <FeatherIcon name={'minus'} size={14} color={Color.white} />
                  </TouchableOpacity>
                  <Text
                    style={[
                      styles.optionText,
                      {width: 27, textAlign: 'center'},
                    ]}>
                    {props.quantity}
                  </Text>
                  <TouchableOpacity
                    style={{
                      padding: 6,
                      borderRadius: 20,
                      marginLeft: 10,
                      backgroundColor: Color.colorPrimary,
                    }}
                    onPress={()=>updateCart(counter+1)}>
                    <FeatherIcon name={'plus'} size={14} color={Color.white} />
                  </TouchableOpacity>
                </Row>
              )}
            </Row>
          </Row>
        </Column>
      </Row>
    </Card>
  );
};

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

export default MenuItem;
