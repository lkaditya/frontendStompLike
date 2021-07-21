import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { News } from '../../model';
import { NewsService } from '../../news.service';

@Component({
  selector: 'app-viewnews',
  templateUrl: './viewnews.component.html',
  styleUrls: ['./viewnews.component.css']
})
export class ViewnewsComponent implements OnInit {
  //declare the class variable to be used in the frontend
  news: News[] = [];
  //inject the service singleton
  constructor(private newsSvc: NewsService, private router:Router) { }

  //functionality of the button to go to login
  gotoLogin() {
    this.router.navigate(['/login']);

  };

  getFormattedDate(x) {
    var date = new Date(x);
    return date;
  };

  //initial page for showing the news from db through service
  ngOnInit(): void {
    this.newsSvc.getNews().then(result => {
      this.news = result;
      console.log(result);
    })

  }

}
