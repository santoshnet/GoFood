import React, {useState} from 'react';
import AbsoluteLayout from '../../../components/AbsoluteLayout';
import RelativeLayout from '../../../components/RelativeLayout';
import Icon from 'react-native-vector-icons/Feather';
import UserInput from '../../../components/UserInput';
import { StyleSheet, Text, View } from 'react-native';
import { searchProduct } from '../../../axios/ServerRequest';
import { Color } from '../../../theme';
import { FlatList } from 'react-native';


export default function Searchbar(props) {
 const[searchText,setSearchText] = useState('');
 const[searchData,setSearchData] = useState([]);

 function onchangeSearchText(text) {
    setSearchText(text);
    if (text.length > 0) {
      searchProduct(text)
        .then(response => {
          console.log(response.data.products);
          setSearchData(response.data.products);
        })
        .catch(error => {
          console.log(error);
        });
    } else {
    }
  }
const renderItem=()=>{
    return
    <Row>

    </Row>
}

  return (
      <View>

    <RelativeLayout style={styles.searchContainer}>
      <UserInput
        containerStyle={styles.searchText}
        placeholder={'Search here....'}
        onChangeText={text => onchangeSearchText(text)}
        value={searchText}
      />
      <AbsoluteLayout style={{top: 10, left: 10}}>
        <Icon name={'search'} color={Color.grayColor} size={24} />
      </AbsoluteLayout>
      <AbsoluteLayout style={{top: 10, right: 10}}>
        <Icon name={'sliders'} color={Color.grayColor} size={24} />
      </AbsoluteLayout>
      
    </RelativeLayout>
    <AbsoluteLayout style={{ zIndex:9999, background:Color.white, top:0 }}>
          <FlatList
           data={searchData}
           keyExtractor={item => item.id+item.category_id}
           renderItem={renderItem}
           contentContainerStyle={{paddingVertical: 20}}/>
      </AbsoluteLayout>
    </View>
  );
}

const styles = StyleSheet.create({
    
    searchText: {
        paddingLeft: 40,
      },
      searchContainer: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: -30,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        zIndex:9999,
        elevation: 7,
      }
});