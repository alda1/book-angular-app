import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddBookComponent } from './add-book/add-book.component';
import { EditBookComponent } from './edit-book/edit-book.component';
import { BooksListComponent } from './books-list/books-list.component';
import { AddReportingComponent } from './add-reporting/add-reporting.component';
import { EditReportingComponent } from './edit-reporting/edit-reporting.component';
import { ReportingListComponent } from './reporting-list/reporting-list.component';

const routes: Routes = [

  {
    path: '',
    component: BooksListComponent,
    data: {title: 'List of books'}
  },

  {
    path: 'book/add',
    component: AddBookComponent,
    data: { title: 'Add book' }
  },
  {
    path: 'book/edit/:id',
    component: EditBookComponent,
    data: { title: 'Edit book' }
  },
  {
    path: 'reporting',
    component: ReportingListComponent,
    data: { title: 'List of reportings' }
  },
  {
    path: 'reporting/add',
    component: AddReportingComponent,
    data: { title: 'Add reporting' }
  },
  {
    path: 'reporting/edit/:id',
    component: EditReportingComponent,
    data: { title: 'Edit reporting' }
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
