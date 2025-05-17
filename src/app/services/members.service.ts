import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Member } from '../models/member.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private apiUrl = 'http://localhost:8080/api/members';

  constructor(private http: HttpClient) {}

  list(): Observable<Member[]> {
    return this.http.get<any>(`${this.apiUrl}/list`)
      .pipe(map(res => res.data));
  }

  create(member: Member): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, member);
  }

  update(id: number, member: Member): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, member);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
