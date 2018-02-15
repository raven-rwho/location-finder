import React from 'react';
import {
    StyleSheet,
    View,
    Platform,
    StatusBar,
} from 'react-native';
import {Drawer} from './navigation/Routes';
import {Provider as MobXProvider} from "mobx-react/native";
import shopStore from "./stores/ShopStore";

export default class App extends React.Component {

    render() {
        return (
            <MobXProvider {...{shopStore}}>
                <View style={styles.container}>
                    {Platform.OS === 'ios' && <StatusBar barStyle="default"/>}
                    {Platform.OS === 'android' &&
                    <View style={styles.statusBarUnderlay}/>}
                    <Drawer/>
                </View>
            </MobXProvider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    statusBarUnderlay: {
        height: StatusBar.currentHeight,
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
});
