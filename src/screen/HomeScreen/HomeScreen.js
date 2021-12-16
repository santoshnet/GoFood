import React, {Component} from 'react';
import {Dimensions, Image, StyleSheet, Text, TouchableOpacity, View,ScrollView,Alert} from "react-native";
import {Color, Fonts} from "../../theme";
import AppStatusBar from "../../components/AppStatusBar";
import Icon from "react-native-vector-icons/Feather";
import {categoryData, restaurantData, offerData} from '../../data/restaurantData';
import Banner1 from '../../assets/images/banner1.png';
import Banner2 from '../../assets/images/banner2.png';
import Banner3 from '../../assets/images/banner3.png';
import ToolBar from "../../components/ToolBar";
import Row from "../../components/Rows";
import RelativeLayout from "../../components/RelativeLayout";
import AbsoluteLayout from "../../components/AbsoluteLayout";
import Column from "../../components/Column";
import UserImage from '../../assets/images/user.png';
import UserInput from "../../components/UserInput";
import Category from "./Components/Category";
import BannerSlider from "./Components/BannerSlider";
import Products from "./Components/Products";
import AppBarRight from "./Components/AppBarRight";
import Offer from "./Components/Offer";
import RecomendedProducts from "./Components/RecomendedProducts";

const {width: screenWidth} = Dimensions.get('window')


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

]

class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: categoryData,
            selectedCategory: '',
            activeSlide: 0
        }
    }


    render() {
        return (
            <View style={styles.container}>
                <AppStatusBar
                    backgroundColor={Color.colorPrimary}
                    barStyle="light-content"
                />
                <ToolBar icon={"menu"} onPress={() => this.props.navigation.openDrawer()}>
                    <AppBarRight/>
                </ToolBar>
                <Column style={styles.header}>
                    <Row style={{justifyContent: 'space-between'}}>
                        <Column>
                            <Text style={styles.title}>Hi, Santosh</Text>
                            <TouchableOpacity style={{paddingTop: 5}}>
                                <Row style={{alignItems: 'center'}}>
                                    <Icon name={"map-pin"} color={Color.white} size={16}/>
                                    <Text style={styles.location}>Bangalore</Text>
                                </Row>

                            </TouchableOpacity>

                        </Column>
                        <Image source={UserImage} style={{borderRadius: 50, height: 50, width: 50}}/>
                    </Row>
                </Column>
                <RelativeLayout style={styles.searchContainer}>
                    <UserInput containerStyle={styles.searchText} placeholder={"Search here...."}/>
                    <AbsoluteLayout style={{top: 10, left: 10}}>
                        <Icon name={"search"} color={Color.grayColor} size={24}/>
                    </AbsoluteLayout>
                    <AbsoluteLayout style={{top: 10, right: 10}}>
                        <Icon name={"sliders"} color={Color.grayColor} size={24}/>
                    </AbsoluteLayout>

                </RelativeLayout>
                <ScrollView>
                    <Column>
                        <View style={{marginTop: -10, marginBottom: 10}}>
                            <BannerSlider data={ENTRIES1}/>
                        </View>
                        <Row style={{justifyContent:'space-between', alignItems:'center'}}>
                            <Text style={[styles.title,{color: Color.black, margin:10}]}>Explore Category</Text>
                            <TouchableOpacity onPress={()=>this.props.navigation.navigate("Category")}>
                                <Text style={[styles.categoryText,{color: Color.colorPrimary, marginRight:20}]}>Show All</Text>
                            </TouchableOpacity>

                        </Row>
                        <View style={{height: 160}}>
                            <Category categories={this.state.categories}/>
                        </View>
                        <View>
                            <Products data={restaurantData}/>
                        </View>
                        <View>
                            <Offer data={offerData}/>
                        </View>
                        <Row style={{justifyContent:'space-between', alignItems:'center'}}>
                            <Text style={[styles.title,{color: Color.black, margin:10}]}>Recomended</Text>
                            <TouchableOpacity>
                                <Text style={[styles.categoryText,{color: Color.colorPrimary, marginRight:20}]}>Show All</Text>
                            </TouchableOpacity>
                        </Row>
                        <View>
                            <RecomendedProducts data={restaurantData}/>
                        </View>

                    </Column>
                </ScrollView>


            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: Color.backgroundColor
    },

    heading: {
        fontFamily: Fonts.primaryBold,
        fontSize: 22,
        color: Color.headingColor
    },
    title: {
        fontFamily: Fonts.primaryBold,
        fontSize: 20,
        color: Color.white
    },
    location: {
        fontFamily: Fonts.primaryRegular,
        fontSize: 14,
        color: Color.white,
        marginLeft: 5
    },
    itemContainer: {
        marginLeft: 10,
        marginRight: 10,
        padding: 10,
        paddingBottom: 20,
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",
        display: 'flex',
        shadowColor: "#000",
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
        justifyContent: "center"
    },
    categoryText: {
        marginTop: 10,
        fontFamily: Fonts.primarySemiBold,
        fontSize: 12
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
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
    }


});
export default HomeScreen;
