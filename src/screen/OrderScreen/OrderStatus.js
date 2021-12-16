import React, {Component} from 'react';
import {StyleSheet, Text,ScrollView} from "react-native";
import Column from "../../components/Column";
import AppStatusBar from "../../components/AppStatusBar";
import {Color, Fonts} from "../../theme";
import ToolBar from "../../components/ToolBar";
import Row from "../../components/Rows";
import RelativeLayout from "../../components/RelativeLayout";
import AbsoluteLayout from "../../components/AbsoluteLayout";
import Button from "../../components/Button";
import Steps from "../../components/Stepper/Steps";

const stepIndicatorStyles = {
    stepIndicatorSize: 15,
    currentStepIndicatorSize: 18,
    separatorStrokeWidth: 3,
    currentStepStrokeWidth: 5,
    stepStrokeCurrentColor: '#fe7013',
    separatorFinishedColor: '#fe7013',
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: '#fe7013',
    stepIndicatorUnFinishedColor: '#aaaaaa',
    stepIndicatorCurrentColor: '#fe7013',
    stepIndicatorLabelFontSize: 15,
    currentStepIndicatorLabelFontSize: 15,
    stepIndicatorLabelCurrentColor: '#fe7013',
    stepIndicatorLabelFinishedColor: 'rgba(255,255,255,0)',
    stepIndicatorLabelUnFinishedColor: 'rgba(255,255,255,0)',
    labelColor: '#666666',
    labelSize: 15,
    currentStepLabelColor: '#fe7013',
    labelStyle:{
        fontSize: 12,
        fontFamily: Fonts.primaryRegular
    },
    subLabelStyle:{
        fontSize: 16,
        fontFamily: Fonts.primarySemiBold,
        color:Color.black,
        textAlign:'left'
    }
};

class OrderStatus extends Component {
    render() {
        return (
            <Column>
                <AppStatusBar
                    backgroundColor={Color.colorPrimary}
                    barStyle="light-content"
                />
                <ToolBar icon={"chevron-left"} title={"Order Tracking"}
                         onPress={() => this.props.navigation.goBack()}/>

                         <RelativeLayout>
                             <ScrollView>
                                 <Column style={{padding: 20}}>
                                     <Row>
                                         <Text style={styles.subTitle}>Order ID : </Text>
                                         <Text style={styles.title}>254885288</Text>
                                     </Row>

                                     <Steps
                                         configs={stepIndicatorStyles}
                                         count={5}
                                         showCount={false}
                                         direction='vertical'
                                         current={2}
                                         labels={[{sublabel:"Order Placed"},{sublabel:"Confirmed"},{sublabel: "Order Processing"},{ sublabel:"On the Way"},{ sublabel:"Delivered"}]}
                                     />
                                    <Button title={"Track Order"} onPress={()=>this.props.navigation.navigate("OrderDelivery")} style={{marginTop:100}}/>
                                 </Column>
                             </ScrollView>

                         </RelativeLayout>



            </Column>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        fontSize: 16,
        fontFamily: Fonts.primarySemiBold
    },
    subTitle: {
        fontSize: 16,
        fontFamily: Fonts.primaryRegular
    },

})
export default OrderStatus;
