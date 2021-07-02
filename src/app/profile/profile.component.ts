import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormControl } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
myform: FormGroup;
Username:FormControl;
reqestedUsername;

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
    requestUserRepos(this.Username.value)
  }

function requestUserRepos(reqestedUsername){
  console.log("getting username : ",reqestedUsername)
  const xhr = new XMLHttpRequest();
  const url = `https://api.github.com/users/${reqestedUsername}/repos`;
  xhr.open('GET',url,true);

  xhr.onload = function(){

    const data = JSON.parse(this.response)

    // console.log("getting data ",data);
    for (let i in data) {
        
      // Log the repo name
      console.log('Repo:', data[i].name);
      
      // Log the repo description
      console.log('Description:', data[i].description);
      
      // Log the repo url
      console.log('URL:', data[i].html_url);
      
      // Add a separator between each repo
      console.log('=========================')
  
  }
  }
  xhr.send();
  }
}}


