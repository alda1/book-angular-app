import { Component, OnInit, NgZone } from '@angular/core';
import { ReportingService } from '../reporting.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { BookService } from '../book.service';

@Component({
  selector: 'app-reporting-detail',
  templateUrl: './reporting-detail.component.html',
  styleUrls: ['./reporting-detail.component.css']
})


export class ReportingDetailComponent implements OnInit {

  detailReportingForm: FormGroup;
  reportingTypes: any = ['Chart', 'Table'];
  isChart = false;
  barChartData: ChartDataSets[];

  barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          stepSize: 1,
          beginAtZero: true,
        },
      }],
    }
    
  };

  barChartLabels: Label[] = ['Informatik', 'Biografi', 'Klasik', 'Roman'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  countInformatik = 0;
  countBiografi = 0;
  countKlasik = 0;
  countRoman = 0;

  countInformatikFinal;
  countBiografiFinal;
  countKlasikFinal;
  countRomanFinal;


  ngOnInit() {
  console.log(this.countRomanFinal);
  this.bookService.getBooks().subscribe((data: {}) => {
    // this.BooksList = data;
    console.log(data);
  
    for (var _i = 0; _i < data.length; _i++) {
        var item = data[_i];

      switch(item.category) {
        case 'Informatik':
          this.countInformatik++;
          break;
        
        case 'Biografi':
          this.countBiografi++;
          break
        
        case 'Klasik':
          this.countKlasik++;
          break;

        case 'Roman':
          this.countRoman++;
          break
      }
    }

    this.barChartData= [
      { data: [this.countInformatik, this.countBiografi, this.countKlasik, this.countRoman], label: 'Nr i librave te grupuar sipas kategorive' }
    ];

  });

  }

  constructor(
    private actRoute: ActivatedRoute,    
    public ReportingService: ReportingService,
    public fb: FormBuilder,
    private ngZone: NgZone,
    private router: Router,
    public bookService: BookService
  ) { 
    var id = this.actRoute.snapshot.paramMap.get('id');
    this.ReportingService.getReporting(id).subscribe((data) => {
      console.log(data);
      if(data.type == 'Chart')
        this.isChart = true;

      this.detailReportingForm = this.fb.group({
        title: [data.title, Validators.required],
        description: [data.description],
        type: [data.type]

      })
    });
  }


}