import {Injectable} from '@angular/core';
import {HttpHeaders, HttpClient} from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { environment } from './../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class RekoginitionService {

  apiKey: any = environment.apiKey;

  private apiUrl: any = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  analyzeImage(imageData: string) {

    
    const request: any = {
      "requests": [
        {
          "image": {
            content: imageData
          },
          "features": [
            {
              type: 'IMAGE_PROPERTIES',
              maxResults: 5  
            }, {
              type: 'OBJECT_LOCALIZATION',
              maxResults: 5 
            }
          ]
        }
      ]
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const params = {
      key: this.apiKey
    };

    const options = {
      headers: headers,
      params: params
    };



    return  this.http.post(this.apiUrl, request, options).pipe(retry(1), catchError((error)=> {
console.log(`ERROR:: ${error}`)
      return error
      
     }));
  }

}

