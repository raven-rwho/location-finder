import React from 'react';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '../constants/Colors'

import MapScreen from '../screens/MapScreen';
import InsertScreen from '../screens/InsertScreen';

const DrawerIcon = ({navigate}) => (
    <FontAwesome
        name='bars'
        size={32}
        color={Colors.tabIconDefault}
        style={{paddingLeft: 20}}
        onPress={() => navigate('DrawerOpen')}
    />
);

export const MapStack = StackNavigator({
    MapScreen: {
        screen: MapScreen,
        navigationOptions: ({navigation}) => ({
            headerLeft: <DrawerIcon {...navigation}/>,
        }),
    },
});

export const InsertStack = StackNavigator({
    InsertScreen: {
        screen: InsertScreen,
        navigationOptions: ({navigation}) => ({
            headerLeft: <DrawerIcon {...navigation}/>
        }),
    },
});

export const Drawer = DrawerNavigator({
    Map: {
        screen: MapStack,
        navigationOptions: {
            drawer: {
                label: 'Map'
            },
        }
    },
    Insert: {
        screen: InsertStack,
        navigationOptions: {
            drawer: {
                label: 'Insert'
            },
        }
    },
});