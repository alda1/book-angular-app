// import {Component, ViewChild, OnInit} from '@angular/core';
// declare var $;

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent implements OnInit{
//   dtOption: any = {};
//   constructor(){
//   }



//   isChecked = false;
//   checkuncheckall()
//   {
//     if(this.isChecked == true)
//   {
//   this.isChecked = false;
//   }
//   else
//   {
//   this.isChecked = true;
//   }
  
//   }
//   // ngOnInit(): void {
//   // this.dtOptions = {
//   //     pagingType: 'full_numbers',
//   //     pageLength: 10,
//   //     processing: true
//   //   };
//   // }

//   ngOnInit(): void {
//     this.dtOption = {
//         "paging":   true,
//         "ordering": false,
//         "info":     false
//     };
//     $(()=>{  
//       $('table.display').DataTable(this.dtOption);
//       });
//   }
// }

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-crud-app';
}