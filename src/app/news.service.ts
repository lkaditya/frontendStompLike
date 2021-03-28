import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { News, NewsUpload, User } from './model'

let mainurl = "https://assignment-stomp.herokuapp.com/";
//let mainurl = "http://localhost:3000/";
@Injectable()
export class NewsService {
 
  constructor(private http: HttpClient) {
  };
 

  getNews(): Promise<News[]> {
    return this.http.get<News[]>(mainurl+"api/viewNews").toPromise();
  }

  shareNews(fileToUpload: NewsUpload,token): Promise<News> {
    let jwt = token;
    const header = new HttpHeaders().set('Authorization', `Bearer ${jwt}`);
    //form data to submit multipart including image
    let body = new FormData();
    let filename = File.name + Date.parse(new Date().toLocaleString());
    body.append('image', fileToUpload.image, filename);
    body.append('title', fileToUpload.title);
    body.append('comment', fileToUpload.comments);
  
    return this.http.post<News>(mainurl+'api/postNews', body, { headers: header }).toPromise();
  }

  authenthicate(user: User): Promise<User> {


    return this.http.post<User>(mainurl+'api/login', user).toPromise();
  }





}
