//import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';

/*
  Generated class for the DummyProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DummyProvider {
  public dummy = 'dummy';

  public dummyZoom: number = 0;

  constructor(
    //public http: HttpClient,
    public zone: NgZone
  ) {
    //console.log('Hello DummyProvider Provider');
  }

  start() {
    this.zone.run(() => {
      setInterval(function () {
        this.dummyZoom = Math.round((Math.random() * 10) * 10);
        //other code
      }, 3000);

      console.log(this.dummyZoom);
    });
  }

}




