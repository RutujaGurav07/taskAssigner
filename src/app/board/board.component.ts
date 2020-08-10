import { Component, OnInit } from '@angular/core';
import {ITask} from './task'
import { CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem } from "@angular/cdk/drag-drop";
import { Server1Service } from '../server1.service';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  form: FormGroup;
  events: ITask[] = [];
  currentEvent: any = { id: null, task: ' ', status: ' ' };
  modalCallback: () => void;


  development: ITask[] = [];
  inprocess: ITask[] = [];
  done : ITask[] = [];

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

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

  addEvent(template) {
    this.currentEvent = { task: ' ', status: ' '};
    this.updateForm();
    this.modalCallback = this.createEvent.bind(this);
    
  }
   updateForm() {
    this.form.setValue({
      task: this.currentEvent.task,
      status: this.currentEvent.status,
    });
    console.log("update form");
  }

  createEvent() {
    const newEvent = {
      task: this.form.get('task').value,
      status: this.form.get('status').value,
    };
    this.server.createEvent(newEvent).then(() => {
      console.log("in profile component createEvent function",newEvent);
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
        // this.development= this.events.sel;
        this.development = this.events.filter(ev=>ev.status=="development");
        this.inprocess = this.events.filter(ev=>ev.status=="inprocess");
        this.done = this.events.filter(ev=>ev.status=="done");
      });
    }

}
