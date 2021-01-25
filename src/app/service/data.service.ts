import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private BASE_URL = "https://api.spacexdata.com/v3/launches?limit=100";

  constructor(private httpClient: HttpClient) { }

  public getRequest(param) {
    return this.httpClient.get(this.BASE_URL, { params: param })
  }

}
