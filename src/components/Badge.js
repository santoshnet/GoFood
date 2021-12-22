import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { TouchableOpacity, StyleSheet } from 'react-native';
import RelativeLayout from './RelativeLayout';
import AbsoluteLayout from './AbsoluteLayout/index';
import { Color } from '../theme';
import TextViewMedium from './CustomText/TextViewMedium';


const Badge =(props)=>{

const navigation = useNavigation();
const navigateToCart = () => {
  navigation.navigate('CartScreen');
};
    return(
        <TouchableOpacity onPress={()=>navigateToCart()}>
                    <RelativeLayout style={{padding:10}}>
                        <Icon name={"shopping-bag"} size={24} color={Color.white}/>
                       {props.count && props.count>0? <AbsoluteLayout style={{top:0,right:0, backgroundColor:Color.white, height:20, width:20, borderRadius:20}}>
                            <TextViewMedium style={{ textAlign:'center', fontSize:12 }}>{props.count}</TextViewMedium>
                        </AbsoluteLayout>:null}
                    </RelativeLayout>
        </TouchableOpacity>
    );
}


const styles= StyleSheet.create({

})

export default Badge;