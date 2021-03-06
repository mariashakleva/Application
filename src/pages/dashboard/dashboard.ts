import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { ReserveEventPage } from '../reserve-event/reserve-event';
import { CalendarPage } from '../calendar/calendar';
import { MakeRoomPage } from '../make-room/make-room';
import { CreateUserPage } from '../create-user/create-user';
import { UsernameGlobalProvider } from '../../providers/username-global/username-global';
import { EventDataProvider } from '../../providers/event-data/event-data';
import * as moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
  calendarpage=CalendarPage;
  username;
  role;
  adminBtn = false;
  showEvents = false;
  flagCalendar;
  allDayEvent = false;
  MyEvents;
  StartTime;
  EndTime;
  StartDate;
  EndDate;
  userId;
  FlagNextDay=false;

  constructor(public navCtrl: NavController, public navParams: NavParams,public EventData: EventDataProvider, public UserGlobal: UsernameGlobalProvider, private menuCtrl: MenuController) {
    this.username=this.UserGlobal.getMyGlobalVar();
    this.role=this.UserGlobal.getMyGlobalRole();
    this.userId=this.UserGlobal.getMyGlobalId();
    console.log(this.userId)
  }

  MakeRoomNav(){
    this.navCtrl.push(MakeRoomPage)
  }

  ReserveNav(){
    
    this.flagCalendar = false;
    this.EventData.setFlagIsCalendarPage(this.flagCalendar);
    this.navCtrl.push(ReserveEventPage)
  }

  CalendarNav(){
    this.navCtrl.push(CalendarPage)
  }

  CreateAccNav(){
    this.navCtrl.push(CreateUserPage, {param2: this.username})
  }
  IsDate(events){
    let dateStart = moment(events.startTime).format('DD MM YYYY');
    let dateEnd = moment(events.endTime).format('DD MM YYYY');
    let dateToday = moment().format('DD MM YYYY');

    this.StartTime = moment(events.startTime).format('HH:mm');
    this.EndTime = moment(events.endTime).format('HH:mm');
    this.StartDate = moment(events.startTime).format('DD.MM');
    this.EndDate = moment(events.endTime).format('-DD.MM');
    
    console.log(events.user.userId+"    "+this.userId)
    if(events.user.userId==this.userId){
    if (dateStart <= dateToday && dateToday <= dateEnd){
    if(this.StartTime=="00:00" && this.EndTime=="00:00"){
      if(dateEnd!=dateToday){
        this.allDayEvent=true;
        this.showEvents = true;
        return true;
      }
      else{
        return false;
      }
    }else {
      this.allDayEvent=false;
      this.showEvents = true;
      return true;
    }
  }}

    else
      return false;
  }
  
  ionViewDidEnter(){
    this.username=this.UserGlobal.getMyGlobalVar();
     this.EventData.setIsChangeEvent(false);
  }

  ionViewWillEnter(){
    this.MyEvents=this.EventData.getEvents();

 
  if(this.role){
      if(this.role.category==0 || this.role.category==1){
  
        this.adminBtn=true;
        this.menuCtrl.enable(true, "adminMenu");
      }
      else if(this.role.category==2){
      this.menuCtrl.enable(true, "userMenu");
      }
  
    }
  }
  
}
