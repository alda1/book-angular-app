import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { DataTablesModule } from 'angular-datatables';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddBookComponent } from './add-book/add-book.component';
import { EditBookComponent } from './edit-book/edit-book.component';
import { BooksListComponent } from './books-list/books-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddReportingComponent } from './add-reporting/add-reporting.component';
import { EditReportingComponent } from './edit-reporting/edit-reporting.component';
import { ReportingListComponent } from './reporting-list/reporting-list.component';



@NgModule({
  declarations: [
    AppComponent,
    AddBookComponent,
    EditBookComponent,
    BooksListComponent,
    AddReportingComponent,
    EditReportingComponent,
    ReportingListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DataTablesModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

