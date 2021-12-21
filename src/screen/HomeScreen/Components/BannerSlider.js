import React, {Component} from 'react';
import Carousel from "react-native-snap-carousel";
import {Color, Dimension, Fonts} from "../../../theme";
import {Image, View,StyleSheet} from "react-native";
import { BASE_URL } from './../../../axios/API';
class BannerSlider extends Component {
    _renderItem({item, index}, parallaxProps) {
        return (
            <View style={styles.item}>
                <Image
                     source={{
                        uri: BASE_URL+item.image,
                      }}
                    style={{width: '100%', height: 150, marginTop: 30, borderRadius: 15, resizeMode: 'cover'}}/>
            </View>
        );
    }
    render() {
        return (
            <Carousel
                layout={"default"}
                ref={ref => this.carousel = ref}
                data={this.props.data}
                loop={true}
                sliderWidth={Dimension.window.width}
                sliderHeight={200}
                itemWidth={Dimension.window.width - 60}
                renderItem={this._renderItem}
                hasParallaxImages={true}
                inactiveSlideScale={0.94}
                inactiveSlideOpacity={0.7}

            />
        );
    }
}


const styles = StyleSheet.create({

    itemContainer:{
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
    imageContainer:{
        width: 50,
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: "center"
    },



});

export default BannerSlider;
