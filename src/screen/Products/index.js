import React, {Component} from 'react';
import {FlatList, Image, StyleSheet, Text} from 'react-native';
import Column from '../../components/Column';
import AppStatusBar from '../../components/AppStatusBar';
import {Color, Fonts} from '../../theme';
import ToolBar from '../../components/ToolBar';
import {restaurantData} from '../../data/restaurantData';
import Row from '../../components/Rows';
import Card from '../../components/Card';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import StarRating from 'react-native-star-rating';
import ProgressLoader from 'rn-progress-loader';
import Toast from 'react-native-simple-toast';
import {getProductByCategory} from './../../axios/ServerRequest';
import {getUserDetails} from '../../utils/LocalStorage';
import { BASE_URL } from './../../axios/API';
import MenuItem from './Component/MenuItem';

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productData: [],
      visible: false,
      category: null,
    };
  }

  async componentDidMount() {
    let category = this.props.route.params.item;
    this.setState({category: category});
    console.log(category);
    this.setState({visible: true});
    const user = await getUserDetails();
    getProductByCategory(user.token, category.id)
      .then(response => {
        let data = response.data;
        if (data.status === 200) {
          console.log(data);
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

  renderItem = ({item}) => {
    return (
    <MenuItem item={item}/>
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
          onPress={() => this.props.navigation.replace('HomeScreen')}
        />

        <FlatList
          data={this.state.productData}
          renderItem={this.renderItem}
          keyExtractor={item => item.id}
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
