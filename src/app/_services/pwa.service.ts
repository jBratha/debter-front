import {Injectable} from '@angular/core';
import {SwUpdate} from '@angular/service-worker';

@Injectable({
  providedIn: 'root'
})
export class PwaService {
  constructor(private swUpdate: SwUpdate) {
    // swUpdate.available.subscribe(event => {
    //   if (true) {
    //     window.location.reload();
    //   }
    // });
    // window.addEventListener('beforeinstallprompt', event => {
    //   this.promptEvent = event;
    // });
  }
}
