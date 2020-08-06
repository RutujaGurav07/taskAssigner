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
  currentEvent: any = { id: null, task: '', status: '' };
  modalCallback: () => void;


  constructor(private fb: FormBuilder, private server: Server1Service) { }
  ngOnInit() {
    this.form = this.fb.group({
      task: [this.currentEvent.task, Validators.required],
      status: [this.currentEvent.status, Validators.required]
    });
    this.getEvents();
  }
  onSubmit() {

  }
  // addEvent(){
    
  // }
  addEvent(template
    ) {
    // this.currentEvent = { task: '', status: ''};
    // this.updateForm();
    this.modalCallback = this.createEvent.bind(this);
  }
  // private updateForm() {
  //   this.form.setValue({
  //     task: this.currentEvent.task,
  //     status: this.currentEvent.status,

  //   });
  // }

  createEvent() {
    const newEvent = {
      task: this.form.get('task').value,
      status: this.form.get('status').value,
    };
    this.server.createEvent(newEvent).then(() => {
      console.log("createEvent function",newEvent);
      
      this.getEvents();
    });
  }

    getEvents() {
      this.server.getEvents().then((response: any) => {
        console.log('Response', response);
        this.events = response.map((ev) => {
          ev.body = ev.status;
          ev.header = ev.task;
       
          return ev;
        });
      });
    }
}


