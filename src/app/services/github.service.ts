import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


@Injectable()
export class GithubService {

  private startPoint = "https://api.github.com/users/";

  constructor(private http: HttpClient) { }

  getRepositories(username: string) {
    if (username) {
      let url = `${this.startPoint}${username}/repos?sort=updated`;
      return this.http.get(url)
        .catch(this.handleError);
    }
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
