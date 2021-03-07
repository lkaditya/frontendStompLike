import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebcamImage } from 'ngx-webcam';
import { Subject,Observable } from 'rxjs';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-capturenews',
  templateUrl: './capturenews.component.html',
  styleUrls: ['./capturenews.component.css']
})
export class CapturenewsComponent implements OnInit {

  constructor(private router: Router, private dataSvc: DataService) { }
  public showWebcam = true;

  // latest snapshot
  public webcamImage: WebcamImage = null;

  public allowCameraSwitch = true;

  private trigger: Subject<void> = new Subject<void>();
  private nextWebcam: Subject<boolean | string> = new Subject<boolean | string>();

  public deviceId: string;

  ngOnInit(): void {
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<boolean | string> {
    return this.nextWebcam.asObservable();
  }

  public cameraWasSwitched(deviceId: string): void {
    console.log('active device: ' + deviceId);
    this.deviceId = deviceId;
  }

  public handleImage(webcamImage: WebcamImage): void {
    console.info('received webcam image', webcamImage);
    this.dataSvc.sharedData = webcamImage.imageAsBase64;
    //this.webcamImage = webcamImage;
    this.back();
  }

  back() {
    this.router.navigate(['/postpage']);
  }

  takePicture() {
    this.trigger.next();
  }

  switch() {
    //not done
    this.showWebcam = !this.showWebcam;
  }

}
