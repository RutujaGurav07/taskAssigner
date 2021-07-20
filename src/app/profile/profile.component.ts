import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormControl } from '@angular/forms';
import { ProfileServiceService } from "../profile-service.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  myform: FormGroup;
  Username: FormControl;
  user;
  githubuser;
  repos;

  constructor(private fb: FormBuilder, private service: ProfileServiceService) {
    this.service.getProfileRepos().subscribe(repos => {
      console.log("in constructor");
      console.log(repos);
      this.repos = repos;
    });


  }

  findProfile(users) {
    this.service.updateProfile(users);
    this.service.getProfileRepos().subscribe(repos => {
      console.log("in findProfile       ");
      console.log(repos);
      this.repos = repos;
    });
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


  onSubmit() {
    if (this.myform) {
      this.githubuser=this.Username.value
      this.findProfile(this.Username.value)
      // console.log("data on page ")
      this.myform.reset()
    }

  }



}