import React, {Component} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  RefreshControl,
  PermissionsAndroid
} from 'react-native';
import {Color, Fonts} from '../../theme';
import AppStatusBar from '../../components/AppStatusBar';
import Icon from 'react-native-vector-icons/Feather';
import ToolBar from '../../components/ToolBar';
import Row from '../../components/Rows';
import Column from '../../components/Column';
import UserImage from '../../assets/images/user.png';
import Category from './Components/Category';
import BannerSlider from './Components/BannerSlider';
import Products from './Components/Products';
import AppBarRight from './Components/AppBarRight';
import Offer from './Components/Offer';
import RecomendedProducts from './Components/RecomendedProducts';
import {getUserDetails,setCart,getCart} from '../../utils/LocalStorage';
import {
  getAllBanners,
  getCategories,
  getHomePage,
  getNewProduct,
  getAllOffers,
  getUserCart
} from '../../axios/ServerRequest';
import ProgressLoader from 'rn-progress-loader';
import Toast from 'react-native-simple-toast';
import Searchbar from './Components/Searchbar';
import Geolocation from '@react-native-community/geolocation';

const {width: screenWidth} = Dimensions.get('window');


class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCategory: '',
      activeSlide: 0,
      visible: false,
      user: null,
      banners: [],
      offers: [],
      categories: [],
      homePageProduct: [],
      newProduct: [],
      searchData: [],
      searchText: '',
      cartCount:0,
      refresh:false,
      currentLongitude:'',
      currentLatitude:'',
      locationStatus:'',
    };
  }

  async componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      console.log('refresh');
    });
    const user = await getUserDetails();
    const cart = await getCart();
    this.setState({cartCount:cart?cart.length:0})
    this.setState({user: user});
    this.fetchData();
    this.requestLocationPermission();
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  onRefresh = () => {
    this.setState({refresh:true});
    this.fetchData();
    setTimeout(() => {
      this.setState({refresh:false});
    }, 1000);
  };


  fetchData=()=>{
    this.fetchOffers();
    this.fetchBanners();
    this.fetchCategories();
    this.fetchHomeProduct();
    this.fetchNewProduct();
    this.fetchCartDetails();
  }


   requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      getOneTimeLocation();
      subscribeLocationLocation();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Access Required',
            message: 'This App needs to Access your location',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          //To Check, If Permission is granted
          this.getOneTimeLocation();
          this.subscribeLocationLocation();
        } else {
          console.log("Permission Denied");
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

   getOneTimeLocation = () => {
    console.log("Getting Location ...");
    Geolocation.getCurrentPosition(
      //Will give you the current location
      (position) => {
        console.log("You are Here");

        this.setState({locationStatus:'You are Here'});

        //getting the Longitude from the location json
        const currentLongitude = 
          JSON.stringify(position.coords.longitude);

        //getting the Latitude from the location json
        const currentLatitude = 
          JSON.stringify(position.coords.latitude);

        //Setting Longitude state
        this.setState({currentLatitude:currentLatitude, currentLongitude:currentLongitude});
        console.log(  JSON.stringify(position));
       
      },
      (error) => {
        console.log(  JSON.stringify(error.message));
      },
      {
        enableHighAccuracy: true, timeout: 5000, maximumAge: 3600000
      },
    );
  };

   subscribeLocationLocation = () => {
   let watchID = Geolocation.watchPosition(
      (position) => {
        //Will give you the location on location change
        
        console.log("You are Here");
        console.log(position);

        //getting the Longitude from the location json        
        const currentLongitude =
          JSON.stringify(position.coords.longitude);

        //getting the Latitude from the location json
        const currentLatitude = 
          JSON.stringify(position.coords.latitude);

          this.setState({currentLatitude:currentLatitude, currentLongitude:currentLongitude});
    
      },
      (error) => {
        console.log(  JSON.stringify(error.message));

      },
      {
        enableHighAccuracy: false,
        maximumAge: 1000
      },
    );
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
  fetchOffers = () => {
    this.setState({visible: true});
    getAllOffers()
      .then(response => {
        let data = response.data;
        if (data.status === 200) {
          this.setState({offers: data.offers});
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

  fetchCartDetails = () => {
    getUserCart(this.state.user.token)
      .then(response => {
        let data = response.data;
        console.log(data);
        if (data.status === 200) {
          this.setState({ cartCount:data.cart.length});
          setCart(data.cart);
        } else {
          Toast.show(data.message, Toast.LONG);
        }
      })
      .catch(error => {
        console.log(error);
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
          <AppBarRight  count={this.state.cartCount}/>
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
            
         
        <ScrollView 
         refreshControl={
          <RefreshControl
            refreshing={this.state.refresh}
            onRefresh={this.onRefresh}
          />
        }>
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
            <View>{this.state.offers?<Offer data={this.state.offers} />:null}
              
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
