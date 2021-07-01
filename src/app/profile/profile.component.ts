import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormControl } from '@angular/forms';

// import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
myform: FormGroup;
Username:FormControl;

constructor(private fb: FormBuilder,) { 
}
ngOnInit() {
  this.createFormControls();
  this.createForm();
}

createFormControls() {
  this.Username = new FormControl('', Validators.required);
  
}

createForm() {
  this.myform = new FormGroup({
    Username: this.Username,
    
  });
}

onSubmit()
{
  if(this.myform){
    console.log("Form Submitted");
    this.myform.reset();
  
  }
}}


