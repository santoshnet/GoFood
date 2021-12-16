import React, {Component} from 'react';
import Column from "../../components/Column";
import AppStatusBar from "../../components/AppStatusBar";
import {Color} from "../../theme";
import ToolBar from "../../components/ToolBar";
import {useNavigation} from "@react-navigation/native";

class Index extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <Column>
                <AppStatusBar
                    backgroundColor={Color.colorPrimary}
                    barStyle="light-content"
                />
                <ToolBar icon={"chevron-left"} title={"Notification"}
                         onPress={() => this.props.navigation.goBack()}/>
            </Column>
        );
    }
}

export default Index;
