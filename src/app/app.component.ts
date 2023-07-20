import { Component } from '@angular/core';
import {RekoginitionService} from './rekoginition.service'
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'image-analysis-aws';

  imgPreview: string;
  imageSrc: string = '';

  constructor(private rekoginition: RekoginitionService) {
    this.imgPreview = ''
  }

  onSelectFile(event: any) {
    const file = event.dataTransfer ? event.dataTransfer.files[0] :  event.target.files[0];
    const pattern  = /image-*/
    const reader = new FileReader();
    reader.onload = this._handleReaderLoaded.bind(this);
   const resuilt =  reader.readAsDataURL(file);

   
   
    console.log(file,resuilt, 'imgPreview')
    if(file) {
// this.rekoginition.analyzeImage(this.imageSrc)
    }
  }

  _handleReaderLoaded(e: any) {
    let reader = e.target;
   
    this.imageSrc = reader.result;
    this.rekoginition.analyzeImage(reader.result)
    // console.log(this.imageSrc)
  }
}
