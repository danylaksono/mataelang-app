import { Component, NgZone, ChangeDetectorRef } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { LocationTrackerProvider } from '../../providers/location-tracker/location-tracker';
import { DummyProvider } from '../../providers/dummy/dummy';

import * as L from 'leaflet';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers:[LocationTrackerProvider]
})

export class HomePage {

  // init declarations
  geolocate = false;
  options: any;
  center = L.latLng(-7.75623, 110.4103);
  mylat = this.locationTracker.lat;
  mylng = this.locationTracker.lng;
  zoom: number = 12;

  // constructors
  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public zone: NgZone,
    public changeDetector: ChangeDetectorRef,
    public dummy: DummyProvider,
    public locationTracker: LocationTrackerProvider

  ) {
    this.dummy.start();
    console.log('constructor');
    console.log('mylat', this.mylat);
    let LAYER_OSM = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      { maxZoom: 18, attribution: 'Open Street Map' });
    this.options = {
      layers: [LAYER_OSM]
      //zoom: 12,
      //center: L.latLng(this.center.lat, this.center.lng)
    };

    this.start();

    console.log(dummy.dummyZoom);

  } //constructor


  public start() {
    console.log('really start tarcking')
    this.locationTracker.startTracking();
    
    //this.center = L.latLng([this.locationTracker.lat, this.locationTracker.lng]);
    

  }

  public stop() {
    this.locationTracker.stopTracking();
  }

  onMapReady(map: L.Map) {
    // Do stuff with map
    console.log('map ready')

  }

  updatePos() {
    console.log('updatepos');
    console.log(this.dummy.dummyZoom);
    console.log(this.locationTracker.lat, this.locationTracker.lng);
    let myPoslat = this.locationTracker.lat;
    let myPoslng = this.locationTracker.lng;
    this.center = L.latLng([myPoslat, myPoslng]);

  }

  ionViewDidLoad() {
    //this.start();
    console.log('did load');

  }

  ionViewDidEnter() {
    console.log('did enter');
    this.updatePos();
    //this.gpsLoader.present();
    console.log(this.locationTracker.lat, this.locationTracker.lng);
    //this.zone.run(() => {
    //console.log(' zone');
    this.center = L.latLng([this.locationTracker.lat, this.locationTracker.lng]);
    this.changeDetector.detectChanges();
    console.log(this.mylat);
    //this.zoom = 8;
    //});
  }

  toggleGeolocation() {
    if (this.geolocate) {
      this.geolocate = false;
      this.stop();
    } else {
      this.geolocate = true;
      //this.start();
      //this.zone.run(() => {
        this.center = L.latLng([this.locationTracker.lat, this.locationTracker.lng]);
        this.changeDetector.detectChanges();
      //});

      console.log(this.center);
    }
  }

}
