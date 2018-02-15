import React from 'react';
import {
    View,
    ScrollView,
    Dimensions,
    Text
} from 'react-native';
import {observer, inject} from "mobx-react/native";
import Carousel from 'react-native-snap-carousel';
import {sliderWidth, itemWidth} from '../styles/SliderEntry.style';
import styles from '../styles/MapScreen.style';
import SliderEntry from '../components/SliderEntry'
import {MapView} from 'expo';
import _ from "lodash";


const {width, height} = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0122;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

@inject("shopStore")
@observer
export default class MapScreen extends React.Component {
    static navigationOptions = {
        title: 'Map',
    };

    componentDidMount() {
        this.props.shopStore.queryLocation()
    }

    _renderItem({item, index}) {
        return (
            <SliderEntry
                data={item}
                even={(index + 1) % 2 === 0}
            />
        );
    }

    _jumpToRegion(coords) {
        this.map.animateToRegion(this._generateRegion(coords));
    }

    _generateRegion(location) {
        return region = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
        };
    }

    _toArray() {
        return _.toArray(this.props.shopStore.shops)
    }

    get carrousel() {
        return (
            <Carousel
                ref={'carousel'}
                data={this._toArray()}
                renderItem={this._renderItem}
                sliderWidth={sliderWidth}
                itemWidth={itemWidth}
                inactiveSlideScale={1}
                inactiveSlideOpacity={1}
                enableMomentum={true}
                activeSlideAlignment={'start'}
                containerCustomStyle={styles.slider}
                contentContainerCustomStyle={styles.sliderContentContainer}
                removeClippedSubviews={false}
                onSnapToItem={(index) => this._jumpToRegion(this.props.shopStore.shops[index])}
            />
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <Choose>
                    <When condition={this.props.shopStore.loading}>
                        <Text>Loading</Text>
                    </When>
                    <Otherwise>
                        <MapView
                            style={styles.container}
                            ref={map => this.map = map}
                            initialRegion={this._generateRegion(this.props.shopStore.location)}
                        />
                        <ScrollView
                            style={styles.scrollview}
                            contentContainerStyle={styles.scrollviewContentContainer}
                            indicatorStyle={'white'}
                            scrollEventThrottle={200}
                            directionalLockEnabled={true}
                        >
                            {this.carrousel}
                        </ScrollView>
                    </Otherwise>
                </Choose>
            </View>
        );
    }
}