import {Component, ViewChild, OnInit} from '@angular/core';
declare var $;
import { BookService } from '../book.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort} from '@angular/material/sort';
import {SelectionModel} from '@angular/cdk/collections';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent implements OnInit {

  tableColumns  :  string[] = ['select', 'id', 'title', 'description', 'author', 'category', 'date', 'action'];
  // dataSource:any  = [];
  dataSource:any = new MatTableDataSource([]);
  selection = new SelectionModel(true, []);
  bookCategoriesModal: any = ['Informatik', 'Biografi', 'Klasik', 'Roman'];
  modalIsOpen = false;
  selectedCategory: string = '';
  data;
  finalSelectedCategory;

  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, {}) sort: MatSort;
  @ViewChild('content') content: any;

  ngOnInit() {
    // Load books and maintain pagination
    this.loadBooks();
  }

   // Books list
   loadBooks() {
    this.bookService.getBooks().subscribe((data: {}) => {
    //  this.BooksList = data;
     console.log(data);
     this.dataSource.data  = data;
     this.dataSource.paginator = this.paginator;
     this.dataSource.sort = this.sort;
   
   });
 }
  constructor(
    public bookService: BookService
  ){ }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  // Delete book
  deleteBook(data){

    // console.log(data);

    if(confirm('Jeni te sigurt per fshirjen e librit me titull "'+data.title+'" ?')) {
      var index = this.dataSource.data.map(x => {return x.title}).indexOf(data.title);
      console.log(index+' 123');
      
      return this.bookService.deleteBook(data.id).subscribe(res => {
        this.dataSource.data.splice(index, 1);
        this.dataSource.paginator = this.paginator;
        console.log('Book deleted!')
      });

    }

  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  removeSelectedRows() {
      this.selection.selected.forEach(item => {
      if(confirm('Jeni te sigurt per fshirjen e librit me titull "'+item.title+'" ?')) {
        let index: number = this.dataSource.data.findIndex(d => d === item);
        this.dataSource.data.splice(index,1);
        
        this.bookService.deleteBook(item.id).subscribe(res => {
          // this.dataSource.data.splice(index, 1);
          this.dataSource.paginator = this.paginator;
          console.log('Book deleted!')
        });
      }
    });
    this.selection = new SelectionModel(true, []);
    this.dataSource.sort = this.sort;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

   openModal(open : boolean) {
      this.selection.selected.forEach(item => {
        this.modalIsOpen = open;
    });
  }

  selectChangeHandler (event: any) {
    this.selectedCategory = event.target.value;
    return this.selectedCategory;
  }

  btnOKClick(open) {

    this.selection.selected.forEach(item => {
      // console.log(item);
      // console.log(this.selectedCategory);
      this.finalSelectedCategory = this.selectedCategory.substring(3);
      item.category = this.finalSelectedCategory;
      if(item.category != '') {
        this.bookService.updateBook(item.id, item).subscribe(res => {
          this.dataSource.paginator = this.paginator;
          this.modalIsOpen = open;
          this.selection = new SelectionModel(true, []);
          this.dataSource.sort = this.sort;
        });
      }
      else {
        console.log('You have to select a category!');
      }
   });
  }

}

