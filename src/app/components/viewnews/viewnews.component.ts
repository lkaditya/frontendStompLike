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

  news: News[] = [];
  constructor(private newsSvc: NewsService, private router:Router) { }

  gotoLogin() {
    this.router.navigate(['/login']);

  };

  ngOnInit(): void {
    this.newsSvc.getNews().then(result => {
      this.news = result;
      console.log(result);
    })

  }

}
