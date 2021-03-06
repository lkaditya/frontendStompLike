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
  form: FormGroup;
  constructor(private fb: FormBuilder, private router: Router, private newssvc: NewsService, private datasvc: DataService) {

  }
  user: User;
  status: string;

  ngOnInit(): void {
    this.status = "true";
    this.form = this.fb.group({
      username:this.fb.control('', [Validators.required]),
      password:this.fb.control('', [Validators.required])
    })



  }

  processLogin() {
    const user = this.fb.group({
      username: this.form.value.username,
      password: this.form.value.password
    })


    this.newssvc.authenthicate(user.value).then(result => {
      this.datasvc.token = result.token;
      this.router.navigate(['/postpage']);
    }, msg => {
        console.log("error found here= " + JSON.stringify(msg.error));
        this.status = "false";
    });
    
    
  }

}
