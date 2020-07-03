
import { Component, OnInit, NgZone } from '@angular/core';
import { BookService } from '../book.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {

  updateBookForm: FormGroup;
  bookCategories: any = ['Informatik', 'Biografi', 'Klasik', 'Roman'];
  
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
        title: [data.title],
        description: [data.description],
        author: [data.author],
        category: [data.category],
        date: [data.date]

      })
    })
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
    var id = this.actRoute.snapshot.paramMap.get('id');
    this.bookService.updateBook(id, this.updateBookForm.value).subscribe(res => {
      this.ngZone.run(() => this.router.navigateByUrl('/'))
    })
  }

}