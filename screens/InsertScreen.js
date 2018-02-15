import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Alert,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {observer, inject} from "mobx-react/native";
import {observable} from "mobx";
import Colors from '../constants/Colors'
import _ from "lodash";

@inject("shopStore")
@observer
export default class InsertScreen extends React.Component {
    static navigationOptions = {
        title: 'Add',
    };

    @observable
    shopName = "";

    @observable
    errorMessage = "";

    pushToFirebase = () => {
        if (!this.shopName.trim().length) {
            Alert.alert(
                "A store name must be provided!"
            );
            return;
        } else {
            this.props.shopStore.addNewShop(this._buildShopObject());
        }
    };

    // build an Object to push it to Firebase
    _buildShopObject() {
        let name = { 'shopName': this.shopName };
        return _.merge(name, this.props.shopStore.location);
    };

    componentWillMount() {
        this.props.shopStore.getCurrentLocation();
    }

    render() {
        return (
            <KeyboardAwareScrollView>
                <View style={styles.container}>
                    <Text>Name of the store</Text>
                    <TextInput
                        autoCorrect={false}
                        underlineColorAndroid="transparent"
                        style={styles.fieldContents}
                        value={this.shopName}
                        placeholder={"Name"}
                        onChangeText={name => {
                            this.shopName = name;
                        }}
                        autoFocus
                        blurOnSubmit
                        returnKeyType={"send"}
                        onSubmitEditing={() => this.pushToFirebase()}>
                    </TextInput>
                </View>
            </KeyboardAwareScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'stretch',
    },
    fieldContents: {
        flex: 1,
        height: 40,
        color: Colors.black,
        fontSize: 18,
    },
});