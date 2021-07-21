import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../data.service';
import { User } from '../../model';
import { NewsService } from '../../news.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  //declare class variable
  form: FormGroup;
  status: string;

  //inject the required dependency
  constructor(private fb: FormBuilder, private router: Router, private newssvc: NewsService, private datasvc: DataService) {

  }
  
  ngOnInit(): void {
    this.status = "true";
    this.form = this.fb.group({
      username:this.fb.control('', [Validators.required]),
      password:this.fb.control('', [Validators.required])
    })
  }

  processLogin() {
    //bind the user with the data from the form
    const user = this.fb.group({
      username: this.form.value.username,
      password: this.form.value.password
    })
    //validate the data by calling the backend through service
    this.newssvc.authenthicate(user.value).then(result => {
      //pass the token to postnews later via dataservice
      this.datasvc.token = result.token;
      this.datasvc.username = result.username;
      //go to the postpage 
      this.router.navigate(['/postpage']);
    }, msg => {
        console.log("error found here= " + JSON.stringify(msg.error));
        this.status = "false";
    });
    
    
  }

}
