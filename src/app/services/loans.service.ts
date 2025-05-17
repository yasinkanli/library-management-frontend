import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Loan } from '../models/loan.model';

@Injectable({
  providedIn: 'root'
})
export class LoanService {
  private apiUrl = 'http://localhost:8080/api/loans';

  constructor(private http: HttpClient) {}

  list(): Observable<any> {
    return this.http.get(`${this.apiUrl}/list`);
  }

  create(loan: Loan): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, loan);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  update(id: number, loan: Loan): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, loan);
  }
  
  
}
