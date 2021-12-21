import React from 'react';
import {FlatList, Image, StyleSheet, Text, View,Alert} from "react-native";
import {Color, Dimension, Fonts} from "../../../theme";
import RelativeLayout from "../../../components/RelativeLayout";
import StarRating from "react-native-star-rating";
import Row from "../../../components/Rows";
import Icon from "react-native-vector-icons/Feather";
import {TouchableOpacity} from "react-native-gesture-handler";
import { useNavigation } from '@react-navigation/native';
import { BASE_URL } from '../../../axios/API';

const Width = Dimension.window.width - 100

const Products =(props)=>{

    const navigation = useNavigation();
    const navigateToProductView=(item)=>{
        navigation.navigate("ProductView",{item:item});
    }

   const renderItem = ({item}) => {

        return (
            <TouchableOpacity  onPress={()=>navigateToProductView(item)}>
            <RelativeLayout style={styles.itemContainer}>
                <Image  source={{ uri: BASE_URL+item.image}} style={styles.itemImage}/>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.categoryName}>{item.category} </Text>
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
                    <Row style={{alignItems:'center'}}>
                        <Row style={{backgroundColor: '#F2EFEE', borderRadius:30,padding:3,marginRight:10,marginLeft:20,alignItems:'center'}}>
                             <Icon name={"map-pin"} color={Color.colorPrimary} size={12}/>
                             <Text style={styles.locationText}>{}</Text>
                        </Row>
                       <Row style={{backgroundColor: '#F2EFEE', borderRadius:30,padding:3, marginRight: 10,alignItems:'center'}}>
                             <Icon name={"clock"} color={Color.colorPrimary} size={12}/>
                             <Text style={styles.locationText}>{item.prepareTime}</Text>
                        </Row>

                    </Row>
                </Row>
            </RelativeLayout>
            </TouchableOpacity>
        )
    }


        return (
            <View>
                <FlatList
                    data={props.data}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => item.category_id+item.id}
                    renderItem={renderItem}
                    contentContainerStyle={{paddingVertical: 20}}
                />
            </View>
        );

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
        height: 200,
        width: '100%',
        resizeMode: 'stretch',
        borderRadius: 20
    },
    title: {
        fontFamily: Fonts.primarySemiBold,
        fontSize: 14,
        color: '#474747',
        marginTop: 10,
        height:38
    },
    categoryName: {
        fontFamily: Fonts.primaryRegular,
        fontSize: 12,
        color: '#A5A5A5',
    },
    locationText:{
        fontFamily: Fonts.primaryRegular,
        fontSize: 12,
        color:Color.colorPrimary,
        marginLeft: 5
    }

});

export default Products;
