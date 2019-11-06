import {Component, HostBinding, OnDestroy, OnInit} from '@angular/core';
import {IMqttMessage, MqttService} from 'ngx-mqtt';
import {Subscription} from 'rxjs';
import {Smartmeter} from './smartmeter';
import {signatureUpdateAnimation} from './animations/template.animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [ signatureUpdateAnimation ]
})

export class AppComponent implements OnInit, OnDestroy {
  subscription: Subscription;

  displayedColumns: string[] = ['signature', 'timestamp', 'returned', 'delivered'];
  smartmeters: Smartmeter[] = [];

  ngOnInit() {
  }

  constructor(private mqttService: MqttService) {
    this.subscription = this.mqttService.observe('smartmeter/log').subscribe((msg: IMqttMessage) => {

      const json = JSON.parse(msg.payload.toString());
      const smartmeter: Smartmeter = {
        signature: json.signature.substring(json.signature.length - 13),
        power: {
          delivered: json.power_delivered,
          returned: json.power_returned
        },
        timestamp : Date.now()
      };

      // Add new smartmeter to array, if already in array update data
      if ( 0 === this.smartmeters.filter( item => item.signature.valueOf() === smartmeter.signature.valueOf()).length ) {
        this.smartmeters.push(smartmeter);
      } else {
        this.smartmeters = this.smartmeters.map( item =>
          item.signature.valueOf() === smartmeter.signature.valueOf() ? ({...item, power : smartmeter.power, timestamp: Date.now()} ) : item
        );
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
