import { Component, OnInit } from '@angular/core';
import { Server1Service } from '../server1.service';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';

// import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  form: FormGroup;

 
  events: any[] = [];
  currentEvent: any = {id: null, task: '', status: ''};
  modalCallback: () => void;


  constructor(private fb: FormBuilder,private server: Server1Service){}
  ngOnInit() {
    this.form = this.fb.group({
      task: [this.currentEvent.task, Validators.required],
      status: [this.currentEvent.status, Validators.required]
    });
    this.getEvents();
  }
 
  addEvent(){

 }
onSubmit(){

}
  // addEvent(template) {
  //   this.currentEvent = {id: null, name: '', description: '', date: new Date()};
  //   this.updateForm();
  //   this.modalCallback = this.createEvent.bind(this);
  //   this.modalRef = this.modalService.show(template);
  // }
  
  // createEvent() {
  //   const newEvent = {
  //     name: this.form.get('name').value,
  //     description: this.form.get('description').value,
  //     date: this.form.get('date').value,
  //   };
  //   this.modalRef.hide();
  //   this.server.createEvent(newEvent).then(() => {
  //     this.getEvents();
  //   });
  // }

  private getEvents() {
    this.server.getEvents().then((response: any) => {
      console.log('Response', response);
      this.events = response.map((ev) => {
        ev.body = ev.description;
        ev.header = ev.name;
        // ev.icon = 'fa-clock-o';
        return ev;
      });
    });
  }
}


