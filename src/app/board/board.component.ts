import { Component, OnInit } from '@angular/core';
import { ITask } from './task'
import { CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem, CdkDrag } from "@angular/cdk/drag-drop";
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
  newdata;
  Dragupdatestatus;
  orignaltask;
  development: ITask[] = [];
  inprocess: ITask[] = [];
  done: ITask[] = [];

  drop(event: CdkDragDrop<ITask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);

      this.newdata = event.container.data[event.currentIndex];
        this.Dragupdatestatus = event.container.element.nativeElement.parentElement.className;


    }

    this.updateEvent(this.newdata,  this.Dragupdatestatus);
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
    this.currentEvent = { task: ' ', status: ' ' };
    this.modalCallback = this.createEvent.bind(this);
    this.updateForm();

  }
  updateForm() {
    this.form.setValue({
      task: this.currentEvent.task,
      status: this.currentEvent.status,
    });

  }

  createEvent() {
    const newEvent = {
      task: this.form.get('task').value,
      status: this.form.get('status').value,
    };
    this.server.createEvent(newEvent).then(() => {

      this.getEvents();
    });

  }

  getEvents() {
    this.server.getEvents().then((response: any) => {
      // console.log('Response', response);
      this.events = response.map((ev) => {
        ev.body = ev.status;
        ev.header = ev.task;

        return ev;
      });
      this.development = this.events.filter(ev => ev.status == "Development");
      this.inprocess = this.events.filter(ev => ev.status == "Inprocess");
      this.done = this.events.filter(ev => ev.status == "Done");
    });
  }

  updateEvent(newdata, updatestatus) {
    const eventData = {
      task: newdata.task,
      status: updatestatus,
    };
    // const task = newdata.task;
    this.server.updateEvent(eventData, eventData.task).then(() => {
      // this.getEvents();

    });
  }
  showdata(template, item) {

    this.form.setValue({
      task: item.task,
      status: item.status
    })
    this.orignaltask = item.task;
    // this.form.patchValue({
    //   task: item.task,
    //   status: item.status
    // })

  }
  updateFormevent() {
    const updatevalue = {
      task: this.form.get('task').value,
      status: this.form.get('status').value,
    }
    this.server.updateEvent(updatevalue, this.orignaltask).then(() => {
      this.getEvents();

    });
  }

}
