import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class GitService {

    private headers = new HttpHeaders({
        'Content-Type': 'application/json;charset=utf-8',
        'Accept': 'application/json'
    });

    /**
     * GitService Constructor
     * @param {HttpClient} http
     */
    constructor(private http: HttpClient) { }

    /**
     * Function to find user repos in github
     * @param {string} _gitHubUser 
     */
    findUserGithubRepos(_gitHubUser: string): Observable<any> {
        let _lResult;
        return this.http.get('https://api.github.com/users/' + _gitHubUser + '/repos', { headers: this.headers });
    }
}