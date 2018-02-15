![Map](location-finder/images/scrren.png?raw=true "Map Screen")
# Location Finder

this app allows the storage and retrieving of locations. It consists of two screens. The first allows the storage and uploading of the location to a Firebase Realtime Database. The second queries based on the momentary location and a radius all positions from the database and shows them in a snap carrousel. If you flick through the items the map will animate the according postion.

It is just meant as a proove of concept that can be anehanced to every kind of location based "finder" app (e.g. stores, shops, restaurants, doctors, what ever)

## Setup
Create a new Expo based project and add the credentials needed for the Firebase Realtime Database [here](https://github.com/raven-rwho/location-finder/blob/master/config/firebase.js). To make your database readable you need to change the [security rules](https://firebase.google.com/docs/database/security/quickstart) accordingly.

## Limitations
There is still a lot of work to do:
* No unit or integration tests
* Edge cases, like no Location or no network
* No persistence
* only tested on Android (but should also work on IOS)

**I hope it can be useful and PRs are highly welcome!**

## The techstack
* [expo.io](http://expo.io)
    - Used to set up the react app
* [MOBX](https://github.com/mobxjs/mobx)
    - state management, as it best
* [react navigation](https://reactnavigation.org/)
    - used for the drawer
* [firebase](https://firebase.google.com/)
    - realtime database
* [geofire](https://github.com/firebase/geofire)
    - geoquery, to fetch the nearest stores and not all of them
* [react-native-snap-carousel](https://github.com/archriss/react-native-snap-carousel)
    - Swiper component for React Native with previews

