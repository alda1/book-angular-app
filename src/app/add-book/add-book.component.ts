
import { Component, OnInit, NgZone } from '@angular/core';
import { BookService } from '../book.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  submitted = false;

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
    title: ['', Validators.required],
    description: [''],
    author: ['', Validators.required],
    category: ['', Validators.required],
    date: ['']
    })
  }


    // convenience getter for easy access to form fields
    get f() { 
      return this.bookForm.controls;
     }


  submitForm() {

    this.submitted = true;

     // stop here if form is invalid
      if (this.bookForm.invalid) {
          return;
      }

    this.bookService.createBook(this.bookForm.value).subscribe(res => {
      console.log('Book added!')
      this.ngZone.run(() => this.router.navigateByUrl('/'))
    });
  }

}


