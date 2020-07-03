
import {Component, ViewChild, OnInit} from '@angular/core';
declare var $;
import { ReportingService } from '../reporting.service';


@Component({
  selector: 'app-reporting-list',
  templateUrl: './reporting-list.component.html',
  styleUrls: ['./reporting-list.component.css']
})
export class ReportingListComponent implements OnInit {

  ReportingList: any = [];
  dtOption: any = {};

  ngOnInit(): void {
  
    this.loadReportings();
    this.dtOption = {
        "paging":   true,
        "ordering": true,
        "info":     true,
        retrieve: true,
    };
    $(()=>{  
      $('table#reporting-list').DataTable(this.dtOption);
    });
  }

  constructor(
    public reportingService: ReportingService
  ){ }


   // Books list
   loadReportings() {
     this.reportingService.geReportings().subscribe((data: {}) => {
      this.ReportingList = data;
    })
  }

    // // Delete book
    deleteReporting(data){

      if(confirm('Jeni te sigurt per fshirjen e raportit me titull "'+data.title+'" ?')) {
        var index = this.ReportingList.map(x => {return x.title}).indexOf(data.title);
      
        return this.reportingService.deleteReporting(data.id).subscribe(res => {
          this.ReportingList.splice(index, 1)
          console.log('Reporting deleted!')
        });
      }
  
    }
}