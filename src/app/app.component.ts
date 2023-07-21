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
  preview: string = ''
  response: any = {}

  constructor(private rekoginition: RekoginitionService) {
    this.imgPreview = ''
  }

  onSelectFile(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (e: any) => {
      let reader = e.target;
      this.preview = e.target.result;
      this.imageSrc = reader.result;
      const extractedString = this.extractStringAfterBase64(reader.result);
    this.rekoginition.analyzeImage(extractedString).subscribe( (data: any) => {
     this.response = data.responses[0]
     console.log(this.response)
    })
    };
}
extractStringAfterBase64(dataURL: string) {
  const commaIndex = dataURL.indexOf(",");
  if (commaIndex !== -1) {
    return dataURL.substring(commaIndex + 1);
  }
  return ""; // Return an empty string if no base64 data found
}

}
