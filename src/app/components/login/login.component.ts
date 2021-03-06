import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../model';
import { NewsService } from '../../news.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  constructor(private fb: FormBuilder, private router: Router, private newssvc: NewsService) {

  }
  user: User;
  token: string;
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
      this.token = result.token;
      console.log("result= " + result);
      this.router.navigate(['/postpage']);
    })
    if (!this.token) {
      this.status = "false";
    }
    
  }

}
