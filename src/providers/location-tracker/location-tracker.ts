// scripts in this page referred to (and modified from) https://www.joshmorony.com/adding-background-geolocation-to-an-ionic-2-application/

//import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import 'rxjs/add/operator/filter';

/*
  Generated class for the LocationTrackerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class LocationTrackerProvider {

  public watch: any;
  public lat: number = 0;
  public lng: number = 0;
  
  constructor(
    public zone: NgZone,
    public backgroundGeolocation: BackgroundGeolocation,
    public geolocation: Geolocation

  ) {

    console.log('Hello LocationTrackerProvider Provider');

  }

  startTracking() {
    // Background Tracking

    
    const config: BackgroundGeolocationConfig = {
      desiredAccuracy: 10,
      stationaryRadius: 20,
      distanceFilter: 10,
      debug: false,
      stopOnTerminate: false,
      interval: 2000
    };

    this.backgroundGeolocation.configure(config)
      .subscribe((location: BackgroundGeolocationResponse) => {

        console.log('BackgroundGeolocation:  ' + location.latitude + ',' + location.longitude);

        // Run update inside of Angular's zone
        this.zone.run(() => {
          this.lat = location.latitude;
          this.lng = location.longitude;
        });

      }, (err) => {

        console.log(err);

      });

    // Turn ON the background-geolocation system.
    this.backgroundGeolocation.start();

      
    // Foreground Tracking

    let options = {
      frequency: 3000,
      enableHighAccuracy: true
    };

    this.watch = this.geolocation.watchPosition(options).filter((p: any) => p.code === undefined)
    .subscribe((position: Geoposition) => {

      console.log(position);

      // Run update inside of Angular's zone
      this.zone.run(() => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
      });
    });

  } //start tracking

  stopTracking() {
    console.log('stopTracking');

    this.backgroundGeolocation.finish();
    this.watch.unsubscribe();
  } //stop tracking

}
