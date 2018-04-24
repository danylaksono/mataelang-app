import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
//import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation';
import { LocationTrackerProvider } from '../../providers/location-tracker/location-tracker';

declare var L;
import 'leaflet';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('map') mapContainer: ElementRef;
  map: any;

  constructor(
    public navCtrl: NavController,
    //private backgroundGeolocation: BackgroundGeolocation,
    public locationTracker: LocationTrackerProvider
  ) {

    /*
    const config: BackgroundGeolocationConfig = {
      desiredAccuracy: 10,
      stationaryRadius: 20,
      distanceFilter: 30,
      debug: false, //  enable this hear sounds for background-geolocation life-cycle.
      stopOnTerminate: false, // enable this to clear background location settings when the app terminates
    };


    this.backgroundGeolocation.configure(config)
      .subscribe((location: BackgroundGeolocationResponse) => {
        console.log(location);
      }, (err) => {
        console.log(err);
      });
      
    this.backgroundGeolocation.start();

    */

    } //constructor

    start(){
      this.locationTracker.startTracking();
    }
   
    stop(){
      this.locationTracker.stopTracking();
    }

    ionViewDidEnter() {
      this.loadMap();
    }

    loadMap() {
      let promise = new Promise((resolve, reject) => {
        this.map = L.map('map').setView([-7.75623,110.4103], 9);
        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 18, 
          attributions: 'osm users'
        }).addTo(this.map);
        resolve();
      })
      return promise;
    }


  

}
