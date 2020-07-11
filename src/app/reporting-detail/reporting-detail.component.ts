import { Component, OnInit, NgZone } from '@angular/core';
import { ReportingService } from '../reporting.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reporting-detail',
  templateUrl: './reporting-detail.component.html',
  styleUrls: ['./reporting-detail.component.css']
})


export class ReportingDetailComponent implements OnInit {

  detailReportingForm: FormGroup;
  reportingTypes: any = ['Chart', 'Table'];

  ngOnInit() {
  }

  constructor(
    private actRoute: ActivatedRoute,    
    public ReportingService: ReportingService,
    public fb: FormBuilder,
    private ngZone: NgZone,
    private router: Router
  ) { 
    var id = this.actRoute.snapshot.paramMap.get('id');
    this.ReportingService.getReporting(id).subscribe((data) => {
      this.detailReportingForm = this.fb.group({
        title: [data.title, Validators.required],
        description: [data.description],
        type: [data.type]

      })
    })
  }




}