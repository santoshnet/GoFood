import React, {Component} from 'react';
import AppStatusBar from "../../components/AppStatusBar";
import {Color, Fonts} from "../../theme";
import ToolBar from "../../components/ToolBar";
import Column from "../../components/Column";
import Card from "../../components/Card";
import {TouchableOpacity} from "react-native-gesture-handler";
import {Text, StyleSheet, FlatList,} from "react-native";
import Row from "../../components/Rows";
import {cartData} from "../../data/restaurantData";

class OrderScreen extends Component {

    renderItem=({item})=>{
        return(
            <Card style={{padding:20}}>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate("OrderStatus")}>
                    <Column>
                        <Text style={styles.title}>#356895241</Text>
                        <Row style={{justifyContent:'space-between', marginTop:10}}>
                            <Text style={styles.subTitle}>No. of Items</Text>
                            <Text style={styles.title}>2</Text>
                        </Row>
                        <Row style={{justifyContent:'space-between', marginTop:10}}>
                            <Text style={styles.subTitle}>Total Price</Text>
                            <Text style={styles.title}>₹ 30</Text>
                        </Row>
                        <Row style={{justifyContent:'space-between', marginTop:10}}>
                            <Text style={styles.subTitle}>Status</Text>
                            <Text style={[styles.title,{color:Color.colorPrimary}]}>Prepared</Text>
                        </Row>

                    </Column>
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
                <ToolBar icon={"chevron-left"} title={"Orders"}
                         onPress={() => this.props.navigation.goBack()}/>

                <FlatList
                    data={cartData}
                    renderItem={this.renderItem}
                    keyExtractor={item => item.id}
                />


            </Column>
        );
    }
}

const styles = StyleSheet.create({
    title:{
        fontSize:16,
        fontFamily:Fonts.primarySemiBold
    },
    subTitle:{
        fontSize:16,
        fontFamily:Fonts.primaryRegular
    },

})

export default OrderScreen;
