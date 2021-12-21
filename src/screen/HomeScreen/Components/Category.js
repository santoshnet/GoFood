import React, {useState} from 'react';
import {FlatList, Image, Text, TouchableOpacity, View, StyleSheet} from "react-native";
import {Color, Fonts} from "../../../theme";
import {categoryData} from "../../../data/restaurantData";
import { useNavigation } from '@react-navigation/native';
import { BASE_URL } from '../../../axios/API';

const Category =({categories})=> {

    const [selectedCategory,setSelectedCategory] = useState({id:1})

    const navigation = useNavigation();
    const navigateToProduct=(item)=>{
        navigation.navigate("Products",{item:item});
    }


    const renderItem=({item})=>{
        return (
            <TouchableOpacity
                style={[styles.itemContainer,{
                    backgroundColor: (selectedCategory?.id === item.id ? Color.colorPrimary : Color.white),
                }]}
                onPress={() => {
                    setSelectedCategory(item)
                     navigateToProduct(item)
                }}
            >
                <View style={[styles.imageContainer,{
                    backgroundColor: (selectedCategory?.id === item.id ? Color.white : Color.graylight),
                }]}>
                    <Image
                        source={{ uri: BASE_URL+item.cateimg}}
                        resizeMode="contain"
                        style={{
                            height: 30,
                            width: 30
                        }}
                    />

                </View>
                <Text style={[styles.categoryText,{
                    color: (selectedCategory?.id === item.id ? Color.white : Color.black),
                }]}>{item.category}</Text>

            </TouchableOpacity>
        )
    }


        return (
            <FlatList
                data={categories}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                contentContainerStyle={{paddingVertical: 20}}
            />
        );

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
    categoryText:{
        marginTop: 10,
        fontFamily: Fonts.primarySemiBold,
        fontSize:12
    },


});

export default Category;
