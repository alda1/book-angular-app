

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Reporting } from './reporting';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ReportingService {

  // Base url
  baseurl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  // POST
  createReporting(data): Observable<Reporting> {
    console.log(data);
    return this.http.post<Reporting>(this.baseurl + '/reportingtracking/', JSON.stringify(data), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }  

  // GET
  getReporting(id): Observable<Reporting> {
    return this.http.get<Reporting>(this.baseurl + '/reportingtracking/' + id)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  // GET
  geReportings(): Observable<Reporting> {
    return this.http.get<Reporting>(this.baseurl + '/reportingtracking/')
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  // PUT
  updateReporting(id, data): Observable<Reporting> {
    return this.http.put<Reporting>(this.baseurl + '/reportingtracking/' + id, JSON.stringify(data), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  // // DELETE
  deleteReporting(id){
    return this.http.delete<Reporting>(this.baseurl + '/reportingtracking/' + id, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  // Error handling
  errorHandl(error) {
     let errorMessage = '';
     if(error.error instanceof ErrorEvent) {
       // Get client-side error
       errorMessage = error.error.message;
     } else {
       // Get server-side error
       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
     }
     console.log(errorMessage);
     return throwError(errorMessage);
  }

}