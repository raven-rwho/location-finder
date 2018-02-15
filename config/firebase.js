import * as firebase from 'firebase';
const geofire = require('geofire');

export const firebaseConfig = {
    apiKey: "<apikey>,
    authDomain: "<authdomai>",
    databaseURL: "<databaseurl>",
    projectId: "<projectid>",
    storageBucket: "<storageBucket>",
    messagingSenderId: "<messagingsenderid>"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const geoFireRef =  new geofire(firebaseApp.database().ref());
