
import { Component, OnInit, NgZone } from '@angular/core';
import { BookService } from '../book.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {

  updateBookForm: FormGroup;
  bookCategories: any = ['Informatik', 'Biografi', 'Klasik', 'Roman'];
  submitted = false;

  ngOnInit() {
    this.updateForm()
  }

  constructor(
    private actRoute: ActivatedRoute,    
    public bookService: BookService,
    public fb: FormBuilder,
    private ngZone: NgZone,
    private router: Router
  ) { 
    var id = this.actRoute.snapshot.paramMap.get('id');
    this.bookService.getBook(id).subscribe((data) => {
      this.updateBookForm = this.fb.group({
        title: [data.title, Validators.required],
        description: [data.description],
        author: [data.author, Validators.required],
        category: [data.category, Validators.required],
        date: [data.date]

      })
    })
  }

    // convenience getter for easy access to form fields
    get f() { 
      return this.updateBookForm.controls;
     }


  updateForm(){
    this.updateBookForm = this.fb.group({
        title: [''],
        description: [''],
        author: [''],
        category: [''],
        date: ['']
    })    
  }

  submitForm(){ 

console.log('submit form');
    this.submitted = true;
    console.log(this.updateBookForm.invalid);
     // stop here if form is invalid
      if (this.updateBookForm.invalid) {
          return;
      }

    var id = this.actRoute.snapshot.paramMap.get('id');
    this.bookService.updateBook(id, this.updateBookForm.value).subscribe(res => {
      this.ngZone.run(() => this.router.navigateByUrl('/'))
    })
  }

}