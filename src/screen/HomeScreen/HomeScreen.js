import React, {Component} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Alert,
  FlatList
} from 'react-native';
import {Color, Fonts} from '../../theme';
import AppStatusBar from '../../components/AppStatusBar';
import Icon from 'react-native-vector-icons/Feather';
import {
  categoryData,
  restaurantData,
  offerData,
} from '../../data/restaurantData';
import Banner1 from '../../assets/images/banner1.png';
import Banner2 from '../../assets/images/banner2.png';
import Banner3 from '../../assets/images/banner3.png';
import ToolBar from '../../components/ToolBar';
import Row from '../../components/Rows';
import RelativeLayout from '../../components/RelativeLayout';
import AbsoluteLayout from '../../components/AbsoluteLayout';
import Column from '../../components/Column';
import UserImage from '../../assets/images/user.png';
import UserInput from '../../components/UserInput';
import Category from './Components/Category';
import BannerSlider from './Components/BannerSlider';
import Products from './Components/Products';
import AppBarRight from './Components/AppBarRight';
import Offer from './Components/Offer';
import RecomendedProducts from './Components/RecomendedProducts';
import {getUserDetails} from '../../utils/LocalStorage';
import {
  getAllBanners,
  getCategories,
  getHomePage,
  getNewProduct,
  searchProduct,
} from '../../axios/ServerRequest';
import ProgressLoader from 'rn-progress-loader';
import Toast from 'react-native-simple-toast';
import TextViewMedium from './../../components/CustomText/TextViewMedium';
import {BASE_URL} from './../../axios/API';
import Searchbar from './Components/Searchbar';

const {width: screenWidth} = Dimensions.get('window');

const ENTRIES1 = [
  {
    illustration: Banner1,
  },
  {
    illustration: Banner2,
  },
  {
    illustration: Banner3,
  },
];

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCategory: '',
      activeSlide: 0,
      visible: false,
      user: null,
      banners: [],
      categories: [],
      homePageProduct: [],
      newProduct: [],
      searchData: [],
      searchText: '',
    };
  }

  async componentDidMount() {
    const user = await getUserDetails();
    this.setState({user: user});
    this.fetchBanners();
    this.fetchCategories();
    this.fetchHomeProduct();
    this.fetchNewProduct();
  }

  renderSearchItem = item => {
    return;
    <TouchableOpacity>
      <Row>
        <Image
          source={{uri: BASE_URL + item.cateimg}}
          resizeMode="contain"
          style={{
            height: 30,
            width: 30,
          }}
        />
        <TextViewMedium>{item.name}</TextViewMedium>
      </Row>
    </TouchableOpacity>;
  };

  fetchBanners = () => {
    this.setState({visible: true});
    getAllBanners()
      .then(response => {
        let data = response.data;
        if (data.status === 200) {
          this.setState({banners: data.banners});
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

  fetchCategories = () => {
    this.setState({visible: true});
    getCategories(this.state.user.token)
      .then(response => {
        let data = response.data;
        if (data.status === 200) {
          this.setState({categories: data.categories});
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

  fetchHomeProduct = () => {
    this.setState({visible: true});
    getHomePage(this.state.user.token)
      .then(response => {
        let data = response.data;
        if (data.status === 200) {
          this.setState({homePageProduct: data.products});
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

  fetchNewProduct = () => {
    this.setState({visible: true});
    getNewProduct(this.state.user.token)
      .then(response => {
        let data = response.data;
        console.log(data);
        if (data.status === 200) {
          this.setState({newProduct: data.products});
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
    const {user} = this.state;
    return (
      <View style={styles.container}>
        <AppStatusBar
          backgroundColor={Color.colorPrimary}
          barStyle="light-content"
        />
        <ToolBar
          icon={'menu'}
          onPress={() => this.props.navigation.openDrawer()}>
          <AppBarRight />
        </ToolBar>
        <Column style={styles.header}>
          <Row style={{justifyContent: 'space-between'}}>
            <Column>
              <Text style={styles.title}>Hi, {user ? user.name : null}</Text>
              <TouchableOpacity style={{paddingTop: 5}}>
                <Row style={{alignItems: 'center'}}>
                  <Icon name={'map-pin'} color={Color.white} size={16} />
                  <Text style={styles.location}>
                    {user ? user.address : null}
                  </Text>
                </Row>
              </TouchableOpacity>
            </Column>
            <Image
              source={UserImage}
              style={{borderRadius: 50, height: 50, width: 50}}
            />
          </Row>
        </Column>
         <Searchbar/>
            
         
        <ScrollView>
          <Column>
            <View style={{marginTop: -10, marginBottom: 10}}>
              {this.state.banners ? (
                <BannerSlider data={this.state.banners} />
              ) : null}
            </View>
            <Row
              style={{justifyContent: 'space-between', alignItems: 'center'}}>
              <Text style={[styles.title, {color: Color.black, margin: 10}]}>
                Explore Category
              </Text>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Category')}>
                <Text
                  style={[
                    styles.categoryText,
                    {color: Color.colorPrimary, marginRight: 20},
                  ]}>
                  Show All
                </Text>
              </TouchableOpacity>
            </Row>
            <View style={{height: 160}}>
              {this.state.categories ? (
                <Category categories={this.state.categories} />
              ) : null}
            </View>
            <View>
              <Products data={this.state.homePageProduct} />
            </View>
            <View>
              <Offer data={offerData} />
            </View>
            <Row
              style={{justifyContent: 'space-between', alignItems: 'center'}}>
              <Text style={[styles.title, {color: Color.black, margin: 10}]}>
                Recomended
              </Text>
              <TouchableOpacity>
                <Text
                  style={[
                    styles.categoryText,
                    {color: Color.colorPrimary, marginRight: 20},
                  ]}>
                  Show All
                </Text>
              </TouchableOpacity>
            </Row>
            <View>
              {this.state.newProduct ? (
                <RecomendedProducts data={this.state.newProduct} />
              ) : null}
            </View>
          </Column>
        </ScrollView>
        <ProgressLoader
          visible={this.state.visible}
          isModal={true}
          isHUD={true}
          hudColor={'#000000'}
          color={'#FFFFFF'}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Color.backgroundColor,
  },

  heading: {
    fontFamily: Fonts.primaryBold,
    fontSize: 22,
    color: Color.headingColor,
  },
  title: {
    fontFamily: Fonts.primaryBold,
    fontSize: 18,
    color: Color.white,
  },
  location: {
    fontFamily: Fonts.primaryRegular,
    fontSize: 14,
    color: Color.white,
    marginLeft: 5,
  },
  itemContainer: {
    marginLeft: 10,
    marginRight: 10,
    padding: 10,
    paddingBottom: 20,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  imageContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryText: {
    marginTop: 10,
    fontFamily: Fonts.primarySemiBold,
    fontSize: 12,
  },
  header: {
    backgroundColor: Color.colorPrimary,
    padding: 10,
    minHeight: 110,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
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

    elevation: 7,
  },
});
export default HomeScreen;
