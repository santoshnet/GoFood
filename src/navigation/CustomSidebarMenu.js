//This is an example code for Navigation Drawer with Custom Side bar//
import React, {Component} from 'react';
import {CommonActions} from '@react-navigation/native';

import {Image, Platform, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-feather1s';
import Color from '../theme/Color';
import Font from '../theme/Fonts';
import {getUserDetails, logout} from '../utils/LocalStorage';

export default class CustomSidebarMenu extends Component {
    constructor() {
        super();
        this.state = {
            user: null,
        };
        //Setting up the Main Top Large Image of the Custom Sidebar

        this.items = [
            {
                navOptionThumb: 'home',
                navOptionName: 'Home',
                screenToNavigate: 'Home',
            },
            {
                navOptionThumb: 'user',
                navOptionName: 'My Profile',
                screenToNavigate: 'Profile',
            },
            {
                navOptionThumb: 'grid',
                navOptionName: 'Category',
                screenToNavigate: 'Category',
            },

            {
                navOptionThumb: 'map-pin',
                navOptionName: 'Address',
                screenToNavigate: 'Address',
            },

            {
                navOptionThumb: 'shopping-cart',
                navOptionName: 'My Cart',
                screenToNavigate: 'CartScreen',
            },
            {
                navOptionThumb: 'file-text',
                navOptionName: 'My Order',
                screenToNavigate: 'OrderScreen',
            },
        ];
    }

    async componentDidMount() {
        let user = await getUserDetails();
        this.setState({user: user});
    }

    logoutUser = () => {
         logout();
        this.props.navigation.replace('Main', { screen: 'LoginScreen' });

         //this.props.navigation.replace("main",{screen:'LoginScreen'});
       
        // this.props.navigation.dispatch(
        //     CommonActions.reset({
        //         index: 0,
        //         routes: [{ name: 'main' },{name: 'LoginScreen'}],
        //     }),
        // );
    };

    getActiveRouteState = (name) => {
        let active = false;
        if (this.props.state !== undefined) {
            let activeIndex = this.props.state.index;
            let activeRouteName = this.props.state.routes[activeIndex].name;
            if (activeRouteName === name) {
                active = true;
            }
        }
        return active;
    };

    render() {
        return (
            <View style={styles.sideMenuContainer}>
                <ScrollView style={styles.scrollView}>
                    <View style={styles.profileContainer}>
                        <Image
                            source={require('../assets/images/user.png')}
                            style={styles.sideMenuProfileIcon}
                        />
                        {this.state.user !== null ? (
                            <Text style={styles.title}>{this.state.user.name}</Text>
                        ) : <Text style={styles.title}>Santosh Dash</Text>}
                    </View>

                    <View
                        style={{
                            width: '100%',
                            height: 1,
                            backgroundColor: '#e2e2e2',
                        }}
                    />

                    <View style={{width: '100%'}}>
                        {this.items.map((item, key) => (
                            <TouchableOpacity onPress={() => {
                                global.currentScreenIndex = key;
                                this.props.navigation.navigate(item.screenToNavigate);
                            }}
                                              style={{
                                                  flexDirection: 'row',
                                                  alignItems: 'center',
                                                  paddingTop: 20,
                                                  paddingBottom: 20,
                                                  backgroundColor: this.getActiveRouteState(
                                                      item.screenToNavigate,
                                                  )
                                                      ? Color.colorPrimary
                                                      : Color.white,
                                              }}
                                              key={key}>
                                <View style={{marginRight: 15, marginLeft: 20}}>
                                    <Icon
                                        name={item.navOptionThumb}
                                        size={22}
                                        color={
                                            this.getActiveRouteState(item.screenToNavigate)
                                                ? Color.white
                                                : '#808080'
                                        }
                                    />
                                </View>
                                <Text
                                    style={{
                                        fontSize: 15,
                                        color: this.getActiveRouteState(item.screenToNavigate)
                                            ? Color.white
                                            : 'black',
                                    }}
                                >
                                    {item.navOptionName}
                                </Text>
                            </TouchableOpacity>
                        ))}
                        <TouchableOpacity  onPress={this.logoutUser}>

                               
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                paddingTop: 30,
                                paddingBottom: 30,
                            }}>
                            <View style={{marginRight: 10, marginLeft: 20}}>
                                <Icon name="log-out" size={24} color="#808080"/>
                            </View>
                            <Text
                                style={{
                                    fontSize: 15,
                                    color: 'black',
                                }}
                               >
                                Logout
                            </Text>
                        </View> 
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        );
    }
}
const BAR_HEIGHT = Platform.OS === 'ios' ? 35 : StatusBar.currentHeight;
const styles = StyleSheet.create({
    sideMenuContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    scrollView: {
        flex: 1,
        width: '100%',
        flexDirection: 'column',
    },
    sideMenuProfileIcon: {
        resizeMode: 'center',
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
    },
    title: {
        fontFamily: Font.primarySemiBold,
        color: Color.white,
        fontSize: 16,
        marginLeft: 10,
    },

    profileContainer: {
        width: '100%',
        height: 80,
        marginTop: BAR_HEIGHT,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Color.colorPrimaryDark,
        paddingLeft: 20,
        paddingRight: 20,
    },
    bottomContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: Color.colorPrimary,
        display: 'flex',
    },
});
