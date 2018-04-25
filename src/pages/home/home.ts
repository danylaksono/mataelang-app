import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LocationTrackerProvider } from '../../providers/location-tracker/location-tracker';

//import * as L from 'leaflet';
import { icon, latLng, Layer, marker, tileLayer } from 'leaflet';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  /*
@ViewChild('map') mapContainer: ElementRef;
map: any;
*/

  constructor(
    public navCtrl: NavController,
    public locationTracker: LocationTrackerProvider
  ) {
  } //constructor

  start() {
    this.locationTracker.startTracking();
  }

  stop() {
    this.locationTracker.stopTracking();
  }


  //ngx leaflet
  LAYER_OSM = tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: 'Open Street Map' });

  options = {
    layers: [this.LAYER_OSM],
    zoom: 10,
    center: latLng(-7.75623, 110.4103)
  };

  markers: Layer[] = [];

  addMarker() {
    let newMarker = marker([this.locationTracker.lat, this.locationTracker.lng], {
      icon: icon({
        iconSize: [25, 41],
        iconAnchor: [13, 41],
        iconUrl: '../../build/leaflet/marker-icon.png',
        shadowUrl: '../../build/leaflet/marker-shadow.png'
      })
    });
  }

  ionViewDidEnter() {
    //this.loadMap();
  }


  /*
  loadMap() {
    let promise = new Promise((resolve, reject) => {
      this.map = L.map('map').setView([-7.75623, 110.4103], 9);
      L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attributions: 'osm users'
      }).addTo(this.map);
      resolve();
    })
    return promise;
  }
  */




}
