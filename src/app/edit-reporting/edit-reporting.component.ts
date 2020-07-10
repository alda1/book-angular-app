import { Component, OnInit, NgZone } from '@angular/core';
import { ReportingService } from '../reporting.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-reporting',
  templateUrl: './edit-reporting.component.html',
  styleUrls: ['./edit-reporting.component.css']
})
export class EditReportingComponent implements OnInit {

  updateReportingForm: FormGroup;
  reportingTypes: any = ['Chart', 'Table'];
  submitted = false;

  ngOnInit() {
    this.updateForm()
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
      this.updateReportingForm = this.fb.group({
        title: [data.title, Validators.required],
        description: [data.description],
        type: [data.type]

      })
    })
  }

  updateForm(){
    this.updateReportingForm = this.fb.group({
        title: ['', Validators.required],
        description: [''],
        type: [''],
    })    
  }

  // convenience getter for easy access to form fields
  get f() { 
    return this.updateReportingForm.controls;
  }

  submitForm(){ 
    this. submitted = true;

    console.log(this.updateReportingForm.invalid);
     // stop here if form is invalid
      if (this.updateReportingForm.invalid) {
          return;
      }

    var id = this.actRoute.snapshot.paramMap.get('id');
    this.ReportingService.updateReporting(id, this.updateReportingForm.value).subscribe(res => {
      this.ngZone.run(() => this.router.navigateByUrl('/reporting'))
    })
  }

}