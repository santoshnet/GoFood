import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import ViewSlider from '../components/ViewSlider';
import Dimension from '../theme/Dimension';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Color from '../theme/Color';
import Fonts from '../theme/Fonts';
import Strings from '../theme/Strings';
const {width, height} = Dimension.window;

function BannerSlider(props) {
  return (
    <ViewSlider
      renderSlides={
        <>
          {props.slider.results.map((item, index) => {
            return (
              <View style={styles.viewBox}>
                {/* <TouchableOpacity> */}
                <Image
                  style={styles.bannerImage}
                  source={{
                    uri: item.image,
                  }}
                  style={{height: 200, width, flex: 1}}
                />
                {/* </TouchableOpacity> */}
              </View>
            );
          })}
        </>
      }
      style={styles.slider} //Main slider container style
      height={180} //Height of your slider
      slideCount={props.slider.total_items} //How many views you are adding to slide
      dots={true} // Pagination dots visibility true for visibile
      dotActiveColor={Color.colorPrimary} //Pagination dot active color
      dotInactiveColor={Color.gray} // Pagination do inactive color
      dotsContainerStyle={styles.dotContainer} // Container style of the pagination dots
      autoSlide={true} //The views will slide automatically
      slideInterval={3000} //In Miliseconds
    />
  );
}
const styles = StyleSheet.create({
  viewBox: {
    paddingHorizontal: 20,
    justifyContent: 'center',
    width: width,
    alignItems: 'center',
    height: '100%',
  },
  slider: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  dotContainer: {
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 0,
  },
});

export default BannerSlider;
