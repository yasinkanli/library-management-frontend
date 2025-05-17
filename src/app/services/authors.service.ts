import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Author } from '../models/author.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  private apiUrl = 'http://localhost:8080/api/authors';

  constructor(private http: HttpClient) {}

  list(): Observable<Author[]> {
    return this.http.get<any>(`${this.apiUrl}/listAll`)
      .pipe(map(res => res.data));
  }

  getById(id: number): Observable<Author> {
    return this.http.get<any>(`${this.apiUrl}/${id}`)
      .pipe(map(res => res.data));
  }

  create(author: { name: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, author);
  }

  update(id: number, author: { name: string }): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, author);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  search(name: string): Observable<Author[]> {
    return this.http.get<any>(`${this.apiUrl}/list?name=${encodeURIComponent(name)}`)
      .pipe(map(res => res.data));
  }
}
