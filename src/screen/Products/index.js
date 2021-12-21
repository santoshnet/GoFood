import React, {Component} from 'react';
import {FlatList, Image, StyleSheet, Text} from "react-native";
import Column from "../../components/Column";
import AppStatusBar from "../../components/AppStatusBar";
import {Color, Fonts} from "../../theme";
import ToolBar from "../../components/ToolBar";
import {restaurantData} from '../../data/restaurantData';
import Row from "../../components/Rows";
import Card from "../../components/Card";
import {TouchableOpacity} from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";
import StarRating from "react-native-star-rating";

class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productData: []
        }
    }

    componentDidMount() {
        let category = this.props.route.params.item;
        console.log(category);
        let productData = restaurantData.filter(a => a.categories.includes(category.id))
        this.setState({productData: productData})
    }

    renderItem = ({item}) => {
        return (
            <Card>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate("ProductView",{item:item})}>
                    <Row>
                        <Image source={item.photo} style={{height: 100, width: 100, borderRadius: 20, flex: 0.25}}/>
                        <Column style={{flex: 0.75, marginLeft: 10}}>
                            <Text style={styles.title}>{item.name}</Text>
                            <Row>
                                <Icon name={"map-marker"} size={20} color={Color.grayColor}/>
                                <Text style={styles.subTitle}> Test Address</Text>
                            </Row>
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
                                <Row style={{alignItems: 'center'}}>

                                    <Row style={{
                                        backgroundColor: '#F2EFEE',
                                        borderRadius: 30,
                                        padding: 5,
                                        marginRight: 10,
                                        alignItems: 'center'
                                    }}>
                                        <Icon name={"clock-o"} color={Color.colorPrimary} size={20}/>
                                        <Text style={styles.locationText}>{item.duration}</Text>
                                    </Row>

                                </Row>
                            </Row>

                        </Column>
                    </Row>
                </TouchableOpacity>
            </Card>
        );
    }

    render() {
        return (
            <Column>
                <AppStatusBar
                    backgroundColor={Color.colorPrimary}
                    barStyle="light-content"
                />
                <ToolBar icon={"chevron-left"} title={this.props.route.params.item.name}
                         onPress={() => this.props.navigation.replace("HomeScreen")}/>

                <FlatList
                    data={this.state.productData}
                    renderItem={this.renderItem}
                    keyExtractor={item => item.id}
                />

            </Column>
        );
    }
}


const styles = StyleSheet.create({
    title: {
        fontFamily: Fonts.primarySemiBold,
        fontSize: 18,
        color: Color.black
    }, subTitle: {
        fontFamily: Fonts.primaryRegular,
        fontSize: 14,
        color: Color.grayColor
    },
    optionText: {
        fontFamily: Fonts.primarySemiBold,
        fontSize: 16,
        color: Color.black,
        marginLeft: 10
    },

    optionContainer: {
        alignItems: 'center',
        backgroundColor: '#fff2d8',
        borderRadius: 20,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 3,
        paddingBottom: 3,
        marginRight: 20
    },
    locationText: {
        fontFamily: Fonts.primaryRegular,
        fontSize: 12,
        color: Color.colorPrimary,
        marginLeft: 5
    }
});

export default Products;
