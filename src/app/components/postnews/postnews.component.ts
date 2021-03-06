import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../data.service';
import { NewsUpload } from '../../model';
import { NewsService } from '../../news.service';

@Component({
  selector: 'app-postnews',
  templateUrl: './postnews.component.html',
  styleUrls: ['./postnews.component.css']
})

export class PostnewsComponent implements OnInit {
  form: FormGroup;
  image: String;
  imageempty: boolean;
  token: String;
  

  constructor(private fb: FormBuilder, private router: Router, private newssvc: NewsService, private dataSvc: DataService) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      title: this.fb.control('',[Validators.required]),
      comments: this.fb.control('', [Validators.required])
    });
    let imgdata = this.dataSvc.sharedData;
    if (!imgdata) {
      this.image = "assets/placeholder.jpg";
      this.imageempty = true;
    } else {
      this.image = "data:image/jpeg;base64,"+this.dataSvc.sharedData;
      this.imageempty = false;  
    }
    this.token = this.dataSvc.token;
    

  }

  viewNews() {
    this.router.navigate(['/']);
  }

  capture() {
    this.router.navigate(['/capturepage']);
  }

  shareNews() {
    class News implements NewsUpload {
      image: Blob;
      title: string;
      comments: string
    }
    const news = new News();
    news.image = this.dataURItoBlob(this.image),
      news.title = this.form.value.title,
      news.comments = this.form.value.comments
    
    this.newssvc.shareNews(news,this.token).then(result => {
      console.log(result);
    });



    console.log("it is shared");
    this.reset();
    this.form.reset();

  }

  reset() {
    this.image = this.image = "assets/placeholder.jpg";
    this.imageempty = true;
  }

  dataURItoBlob(dataURI) {
  // convert base64 to raw binary data held in a string
  var byteString = atob(dataURI.split(',')[1]);

  // separate out the mime component
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

  // write the bytes of the string to an ArrayBuffer
  var arrayBuffer = new ArrayBuffer(byteString.length);
  var _ia = new Uint8Array(arrayBuffer);
  for (var i = 0; i < byteString.length; i++) {
    _ia[i] = byteString.charCodeAt(i);
  }

  var dataView = new DataView(arrayBuffer);
  var blob = new Blob([dataView], { type: mimeString });
  return blob;
}

}
