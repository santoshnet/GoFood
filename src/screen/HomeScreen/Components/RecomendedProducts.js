import React, {Component} from 'react';
import {FlatList, Image, StyleSheet, Text, View} from "react-native";
import {Color, Dimension, Fonts} from "../../../theme";
import RelativeLayout from "../../../components/RelativeLayout";
import StarRating from "react-native-star-rating";
import Row from "../../../components/Rows";
import Icon from "react-native-vector-icons/Feather";

const Width = Dimension.window.width /2

class RecomendedProducts extends Component {
    constructor(props) {
        super(props);

    }

    renderItem = ({item}) => {

        return (
            <RelativeLayout style={styles.itemContainer}>
                <Image source={item.photo} style={styles.itemImage}/>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.categoryName}>Burgers, Fast Food, Snacks </Text>
                <Row style={{justifyContent: 'space-between', marginTop: 10}}>
                    <StarRating
                        disabled={true}
                        maxStars={5}
                        rating={item.rating}
                        fullStarColor={Color.yellow}
                        halfStarColor={Color.yellow}
                        emptyStarColor={Color.gray}
                        starSize={14}
                    />
                </Row>
            </RelativeLayout>
        )
    }


    render() {
        return (
            <View>
                <FlatList
                    data={this.props.data}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => `${item.id}`}
                    renderItem={this.renderItem}
                    contentContainerStyle={{paddingVertical: 20}}
                />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    itemContainer: {
        width: Width,
        borderRadius: 20,
        backgroundColor: Color.white,
        marginLeft: 10,
        marginRight: 10,
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 20
    },
    itemImage: {
        height: 150,
        width: '100%',
        resizeMode: 'stretch',
        borderRadius: 20
    },
    title: {
        fontFamily: Fonts.primarySemiBold,
        fontSize: 16,
        color: '#474747',
        marginTop: 10,
    },
    categoryName: {
        fontFamily: Fonts.primaryRegular,
        fontSize: 10,
        color: '#A5A5A5',
    },
    locationText:{
        fontFamily: Fonts.primaryRegular,
        fontSize: 12,
        color:Color.colorPrimary,
        marginLeft: 5
    }

});

export default RecomendedProducts;
