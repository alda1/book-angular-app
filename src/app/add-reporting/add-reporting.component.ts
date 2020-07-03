
import { Component, OnInit, NgZone } from '@angular/core';
import { ReportingService } from '../reporting.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-reporting',
  templateUrl: './add-reporting.component.html',
  styleUrls: ['./add-reporting.component.css']
})
export class AddReportingComponent implements OnInit {
  reportingForm: FormGroup;
  reportingTypes: any = ['Chart', 'Table']

  ngOnInit() {
    this.addReporting()
  }

  constructor(
    public fb: FormBuilder,
    private ngZone: NgZone,
    private router: Router,
    public reportingService: ReportingService
  ){ }

  addReporting() {
    this.reportingForm = this.fb.group({
    title: [''],
    description: [''],
    type: [''],
    })
  }

  submitForm() {
    this.reportingService.createReporting(this.reportingForm.value).subscribe(res => {
      console.log('Reporting added!')
      this.ngZone.run(() => this.router.navigateByUrl('/reporting'))
    });
  }

}


