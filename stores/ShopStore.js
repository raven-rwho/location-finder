import {observable, action, computed, runInAction} from "mobx";
import {Platform} from "react-native";
import {firebaseApp, geoFireRef} from "../config/firebase";
import {Constants, Location, Permissions} from 'expo';

export class ShopStore {
    @observable
    shopName = "";

    @observable
    shops = [];

    @observable
    loading = true;

    @observable
    error = null;

    @observable
    errorMessage = "";

    @observable
    location = null;

    @action finishLoading = () => {
        this.loading = false;
        console.log("loading false")
    };

    @action setError = (error, timeInSeconds = 1) => {
        this.error = error;
        console.log("ERROR: " + error);
        setTimeout(() => {
            this.error = null;
        }, timeInSeconds * 1000);
    };

    @action addNewShop = (shopWithLocation) => {
        // get the firebase db reference
        let firebaseRef = firebaseApp
            .database()
            .ref("shop")
            .push();

        // get the itemId to correspond it to the geofire item
        let itemId = firebaseRef
            .getKey();

        //push the shop item
        firebaseApp
            .database()
            .ref("shop")
            .child(itemId)
            .set(shopWithLocation)
            .catch(error => {
                this.setError(error)
            });

        // push the location via GeoFire
        geoFireRef.set(itemId, [shopWithLocation.coords.latitude, shopWithLocation.coords.longitude]);
    };

    @action queryLocation = async () => {
        this.shops = [];
        await this.getCurrentLocation();
        let radius = 1000; // 500m
        let geoQuery = geoFireRef.query({center: [this.location.coords.latitude, this.location.coords.longitude], radius});

        geoQuery.on("key_entered", (key, location) => {
            firebaseApp
                .database()
                .ref("shop")
                .child(key)
                .once('value')
                .then((snapshot) => {
                    let value = snapshot.val();
                    this.shops.push(value)
                });
        });

        geoQuery.on("ready", () => {
            console.log("*** 'ready' event fired - cancelling query ***");
            this.finishLoading()
            geoQuery.cancel();
        })
    };

    @action getCurrentLocation = async () => {
        // this is just for dev environment
        if (Platform.OS === 'android' && !Constants.isDevice) {
            this.setError('Oops, this will return a mocked value!!!');
            this.location = {
                "mocked": true, "timestamp": 1510510481033, "coords": {
                    "speed": 0, "heading": 0, "accuracy": 20.77199935913086,
                    "longitude": 13.3462601, "altitude": 80.4000015258789, "latitude": 52.4935124
                }
            };
            return this.location;
        } else {
            let {status} = await Permissions.askAsync(Permissions.LOCATION);
            if (status !== 'granted') {
                this.setError('Permission to access location was denied');
            }
            this.location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});
            runInAction(() => {
                return this.location;
            });

        }
    };

}

export default new ShopStore();