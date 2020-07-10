
import { Component, OnInit, NgZone } from '@angular/core';
import { ReportingService } from '../reporting.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-reporting',
  templateUrl: './add-reporting.component.html',
  styleUrls: ['./add-reporting.component.css']
})
export class AddReportingComponent implements OnInit {
  reportingForm: FormGroup;
  reportingTypes: any = ['Chart', 'Table']
  submitted = false;

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
    title: ['', Validators.required],
    description: [''],
    type: ['', Validators.required],
    })
  }


    // convenience getter for easy access to form fields
    get f() { 
      return this.reportingForm.controls;
    }

  submitForm() {

    this.submitted = true;

    // stop here if form is invalid
     if (this.reportingForm.invalid) {
         return;
     }

    this.reportingService.createReporting(this.reportingForm.value).subscribe(res => {
      console.log('Reporting added!')
      this.ngZone.run(() => this.router.navigateByUrl('/reporting'))
    });
  }

}


