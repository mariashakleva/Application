import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ReservePage } from '../reserve/reserve';
import { CalendarPage } from '../calendar/calendar';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  reservepage=ReservePage;
  calendarpage=CalendarPage;
  username: string;
  ReserveNav(){
    this.navCtrl.push(ReservePage)
  }

  CalendarNav(){
    this.navCtrl.push(CalendarPage)
  }

  LogoutNav(){
    this.navCtrl.pop()
  }
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.username = navParams.get('param1');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
