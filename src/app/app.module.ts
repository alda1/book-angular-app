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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { ReportingDetailComponent } from './reporting-detail/reporting-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    AddBookComponent,
    EditBookComponent,
    BooksListComponent,
    AddReportingComponent,
    EditReportingComponent,
    ReportingListComponent,
    ReportingDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DataTablesModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule,
    MatCheckboxModule,
    MatDialogModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

