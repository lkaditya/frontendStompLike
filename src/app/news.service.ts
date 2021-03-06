import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { News, NewsUpload, User } from './model'


@Injectable()
export class NewsService {
  constructor(private http: HttpClient) {
  };

  getNews(): Promise<News[]> {
    return this.http.get<News[]>('http://localhost:3000/api/viewNews').toPromise();
  }

  shareNews(fileToUpload: NewsUpload,token): Promise<News> {
    let jwt = token;
    const header = new HttpHeaders().set('Authorization', `Bearer ${jwt}`);
    let body = new FormData();
    let filename = File.name + Date.parse(new Date().toLocaleString());
    body.append('image', fileToUpload.image, filename);
    body.append('title', fileToUpload.title);
    body.append('comment', fileToUpload.comments);
  
    return this.http.post<News>('http://localhost:3000/api/postNews', body, { headers: header }).toPromise();
  }

  authenthicate(user: User): Promise<User> {


    return this.http.post<User>('http://localhost:3000/api/login', user).toPromise();
  }





}
