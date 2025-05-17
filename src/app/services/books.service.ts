import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Book {
  id?: number;
  title: string;
}

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = 'http://localhost:8080/api/books';

  constructor(private http: HttpClient) {}

  list(): Observable<any> {
    return this.http.get(`${this.apiUrl}/listAll`);
  }

  create(book: Book): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, book);
  }

  update(id: number, book: Book): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, book);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
