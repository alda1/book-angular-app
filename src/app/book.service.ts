import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Book } from './book';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class BookService {

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
  createBook(data): Observable<Book> {
    console.log(data);
    return this.http.post<Book>(this.baseurl + '/booktracking/', JSON.stringify(data), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }  

  // GET
  getBook(id): Observable<Book> {
    return this.http.get<Book>(this.baseurl + '/booktracking/' + id)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  // GET
  getBooks(): Observable<Book> {
    return this.http.get<Book>(this.baseurl + '/booktracking/')
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  // PUT
  updateBook(id, data): Observable<Book> {
    return this.http.put<Book>(this.baseurl + '/booktracking/' + id, JSON.stringify(data), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  // // DELETE
  deleteBook(id){
    
    return this.http.delete<Book>(this.baseurl + '/booktracking/' + id, this.httpOptions)
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