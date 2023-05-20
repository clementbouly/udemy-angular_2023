import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';
import { Post } from './post.model';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  API_URL =
    'https://ng-http-request-training-default-rtdb.europe-west1.firebasedatabase.app';
  // error = new Subject<string>();

  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http.get(`${this.API_URL}/posts.json`).pipe(
      map((responseData: { [key: string]: Post }) => {
        return this.formatResponseData(responseData);
      })
    );
  }

  createPost(postData: Post): Observable<Post> {
    return this.http
      .post<{ name: string }>(`${this.API_URL}/posts.json`, postData)
      .pipe(
        map((responseData) => {
          return { id: responseData.name, ...postData };
        })
      );
  }

  deleteAllPosts(): Observable<any> {
    return this.http.delete(`${this.API_URL}/posts.json`);
  }

  deletePost(id: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/posts/${id}.json`);
  }

  updatePost(id: string, postData: Post): Observable<Post> {
    return this.http.patch(`${this.API_URL}/posts/${id}.json`, postData).pipe(
      map((responseData: Post) => {
        return responseData;
      })
    );
  }

  private formatResponseData(responseData: { [key: string]: Post }): Post[] {
    if (!responseData) {
      return [];
    }

    return Object.entries(responseData).map(([id, value]) => ({
      id,
      ...value,
    }));
  }
}
