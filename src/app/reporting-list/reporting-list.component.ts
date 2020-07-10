
import {Component, ViewChild, OnInit} from '@angular/core';
declare var $;
import { ReportingService } from '../reporting.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort} from '@angular/material/sort';
import {SelectionModel} from '@angular/cdk/collections';

@Component({
  selector: 'app-reporting-list',
  templateUrl: './reporting-list.component.html',
  styleUrls: ['./reporting-list.component.css']
})
export class ReportingListComponent implements OnInit {

  tableColumns  :  string[] = ['select', 'id', 'title', 'description', 'type', 'action'];
  // dataSource:any  = [];
  dataSource = new MatTableDataSource([]);
  selection = new SelectionModel(true, []);
  bookCategories: any = ['Informatik', 'Biografi', 'Klasik', 'Roman'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, {}) sort: MatSort;
  @ViewChild('content') content: any;

  ngOnInit(): void {
      this.loadReportings();
  }

  constructor( public reportingService: ReportingService){ }


   // Reports list
   loadReportings() {
     this.reportingService.geReportings().subscribe((data: {}) => {
      console.log(data);
      this.dataSource.data  = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


    // // Delete report
    deleteReporting(data){
      if(confirm('Jeni te sigurt per fshirjen e raportit me titull "'+data.title+'" ?')) {
        var index = this.dataSource.data.map(x => {return x.title}).indexOf(data.title);
        console.log(index+' 123');
        
        return this.reportingService.deleteReporting(data.id).subscribe(res => {
          this.dataSource.data.splice(index, 1);
          this.dataSource.paginator = this.paginator;
          console.log('Report deleted!')
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
        console.log(item.id);
        this.reportingService.deleteReporting(item.id).subscribe(res => {
          this.dataSource.paginator = this.paginator;
          console.log('Report deleted!')
        });
      }
    });
    this.selection = new SelectionModel(true, []);
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }
}