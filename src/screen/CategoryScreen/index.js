import React, {Component} from 'react';
import Column from "../../components/Column";
import AppStatusBar from "../../components/AppStatusBar";
import {Color, Dimension, Fonts} from "../../theme";
import ToolBar from "../../components/ToolBar";
import {categoryData} from '../../data/restaurantData';
import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Card from "../../components/Card";
import { getCategories } from '../../axios/ServerRequest';
import ProgressLoader from 'rn-progress-loader';
import { BASE_URL } from './../../axios/API';
import { getUserDetails } from '../../utils/LocalStorage';



const itemWidth = Dimension.window.width / 3
const itemColors = ["#753cff", "#bb5454", "#4c59cd", "#684545", "#539757", "#218cc4",]

class CategoryScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            visible:false
        }
    }

    async componentDidMount(){
        const user = await getUserDetails();
        this.setState({visible:true});
        getCategories(user.token)
        .then(response => {
          let data = response.data;
          if (data.status === 200) {
              this.setState({categories:data.categories})
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
            <View style={{width: itemWidth}}>
                <Card style={{borderRadius: 20,padding:10}}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("Products",{item:item})}>
                        <Column style={{alignItems: 'center', justifyContent: 'center',}}>
                            <View style={styles.imageContainer}>
                                <Image  source={{ uri: BASE_URL+item.cateimg}} style={{height: 40, width: 40}}/>
                            </View>
                            <Text style={styles.itemTitle}>{item.category}</Text>
                        </Column>
                    </TouchableOpacity>
                </Card>
            </View>

        );
    }

    render() {
        return (
            <Column>
                <AppStatusBar
                    backgroundColor={Color.colorPrimary}
                    barStyle="light-content"
                />
                <ToolBar icon={"chevron-left"} title={"Category"}
                         onPress={() => this.props.navigation.goBack()}/>
                <FlatList
                    style={{marginTop: 10}}
                    contentContainerStyle={{paddingBottom: 70}}
                    showsHorizontalScrollIndicator={false}
                    horizontal={false}
                    key={'flat list'}
                    data={this.state.categories}
                    renderItem={this.renderItem}
                    keyExtractor={item => item.id.toString()}
                    extraData={this.state}
                    numColumns={3}
                />
                 <ProgressLoader
                visible={this.state.visible}
                isModal={true} isHUD={true}
                hudColor={"#000000"}
                color={"#FFFFFF"} />
            </Column>
        );
    }
}

const styles = StyleSheet.create({
    itemTitle: {
        fontSize: 16,
        fontFamily: Fonts.primaryRegular,
        color: Color.textColor,
        marginTop: 10
    },
    imageContainer: {
        width: 70,
        height: 70,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: "center",
        backgroundColor: Color.graylight
    },
});

export default CategoryScreen;
