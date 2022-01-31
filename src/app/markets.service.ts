import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs-compat/Observable'


@Injectable({
  providedIn: 'root'
})
export class MarketsService {

  urlBase = "http://173.212.193.40:5486/markets"
  

  constructor(private http: HttpClient) { }


  public get(url: string){

    return this.http.get(this.urlBase + url)

  }

  public post(url: string, body: any) {

    return this.http.post(this.urlBase + url, body)

  }

  public delete(url: string) {

    return this.http.delete(this.urlBase + url)

  }

  public patch(url: string, body: any) {

    return this.http.patch(this.urlBase + url, body)

  }
}

