import React, {Component} from 'react';
import AppStatusBar from "../../components/AppStatusBar";
import {Color, Fonts} from "../../theme";
import ToolBar from "../../components/ToolBar";
import Column from "../../components/Column";
import Card from "../../components/Card";
import {TouchableOpacity} from "react-native-gesture-handler";
import {Text, StyleSheet, FlatList,RefreshControl} from "react-native";
import Row from "../../components/Rows";
import { getUserDetails } from '../../utils/LocalStorage';
import { orderDetails } from '../../axios/ServerRequest';
import ProgressLoader from 'rn-progress-loader';

class OrderScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
          user: null,
          orders: [],
          visible:false,
          isFetching: false,
        };
      }

      onRefresh() {
        this.setState({isFetching: true,},() => {this.fetchOrderData();});
    }
    
      async componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
          console.log('refresh');
        });
        const user = await getUserDetails();
        this.setState({visible: true, user:user});
        this.fetchOrderData();
    }

    fetchOrderData=()=>{
      const {user} = this.state;
      orderDetails(user.token)
      .then(response => {
        let data = response.data;
        if (data.status === 200) {
          this.setState({orders: data.orders});
        } else {
          Toast.show(data.message, Toast.LONG);
        }
        this.setState({visible: false, isFetching:false});
      })
      .catch(error => {
        console.log(error);
        this.setState({visible: false, isFetching:false});
      });
    }
    
      componentWillUnmount() {
        this._unsubscribe();
      }

    renderItem=({item})=>{
        return(
            <Card style={{padding:20}}>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate("OrderStatus",{order:item})}>
                    <Column>
                        <Text style={styles.title}>Order No.  #{item.id}</Text>
                        <Row style={{justifyContent:'space-between', marginTop:10}}>
                            <Text style={styles.subTitle}>No. of Items</Text>
                            <Text style={styles.title}>{item.orderList.length}</Text>
                        </Row>
                        <Row style={{justifyContent:'space-between', marginTop:10}}>
                            <Text style={styles.subTitle}>Total Price</Text>
                            <Text style={styles.title}>₹ {item.total}</Text>
                        </Row>
                        <Row style={{justifyContent:'space-between', marginTop:10}}>
                            <Text style={styles.subTitle}>Status</Text>
                            <Text style={[styles.title,{color:Color.colorPrimary}]}>{item.status}</Text>
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
                         onPress={() => this.props.navigation.replace("HomeScreen")}/>

                <FlatList
                    data={this.state.orders}
                    renderItem={this.renderItem}
                    keyExtractor={item => item.id}
                    contentContainerStyle={{paddingBottom:100}} 
                    onRefresh={() => this.onRefresh()}
                    refreshing={this.state.isFetching}

                />
        <ProgressLoader
          visible={this.state.visible}
          isModal={true}
          isHUD={true}
          hudColor={'#000000'}
          color={'#FFFFFF'}
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
