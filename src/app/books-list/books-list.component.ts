import {Component, ViewChild, OnInit} from '@angular/core';
declare var $;
import { BookService } from '../book.service';


@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent implements OnInit {

  BooksList: any = [];
  dtOptions: any = {};


  ngOnInit(): void {
  
    this.loadBooks();
    this.loadDatatable();

  }


  loadDatatable() {
    this.dtOptions = {
      "paging":   true,
      "ordering": true,
      "info":     true
    };

    $(()=>{  
      $('table#books-list').DataTable(this.dtOptions);
    });
  }

  constructor(
    public bookService: BookService
  ){ }


  isChecked = false;
  checkuncheckall()
  {
    if(this.isChecked == true)
  {
  this.isChecked = false;
  }
  else
  {
  this.isChecked = true;
  }
  
  }


   // Books list
   loadBooks() {
     this.bookService.getBooks().subscribe((data: {}) => {
      this.BooksList = data;
    });
  }



    // // Delete book
    deleteBook(data){

      if(confirm('Jeni te sigurt per fshirjen e librit me titull "'+data.title+'" ?')) {
        var index = this.BooksList.map(x => {return x.title}).indexOf(data.title);
      
         this.bookService.deleteBook(data.id).subscribe(res => {
          this.BooksList.splice(index, 1)
          console.log('Book deleted!')
        });

      }
  
    }

}