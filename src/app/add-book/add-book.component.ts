
import { Component, OnInit, NgZone } from '@angular/core';
import { BookService } from '../book.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  bookForm: FormGroup;
  bookArray: any = [];
  bookCategories: any = ['Informatik', 'Biografi', 'Klasik', 'Roman']

  ngOnInit() {
    this.addBook()
  }

  constructor(
    public fb: FormBuilder,
    private ngZone: NgZone,
    private router: Router,
    public bookService: BookService
  ){ }

  addBook() {
    this.bookForm = this.fb.group({
    title: [''],
    description: [''],
    author: [''],
    category: [''],
    date: ['']
    })
  }

  submitForm() {
    this.bookService.createBook(this.bookForm.value).subscribe(res => {
      console.log('Book added!')
      this.ngZone.run(() => this.router.navigateByUrl('/'))
    });
  }

}


