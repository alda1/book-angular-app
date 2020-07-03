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
        title: [data.title],
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

  /* Handle form errors in Angular 8 */
  public errorHandling = (control: string, error: string) => {
    return this.updateReportingForm.controls[control].hasError(error);
  }

  submitForm(){ 
    this. submitted = true;

    var id = this.actRoute.snapshot.paramMap.get('id');
    this.ReportingService.updateReporting(id, this.updateReportingForm.value).subscribe(res => {
      this.ngZone.run(() => this.router.navigateByUrl('/reporting'))
    })
  }

}