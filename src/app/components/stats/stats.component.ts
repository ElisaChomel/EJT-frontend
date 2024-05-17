import { Component } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { StatsService } from 'src/app/services/stats.service';

import pluginDataLabels from 'chartjs-plugin-datalabels';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent {
  public barChartLegend = true;  
  public pieChartLegend = true;

  public barChartPlugins = [];
  public pieChartPlugins = [];
  
  public barChartOptions: ChartConfiguration<'bar'>['options'] = {responsive: true};
  public pieChartOptions: ChartOptions<'pie'> = {responsive: true};  

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [ 'ND' ],
    datasets: [
      { data: [ 1 ], label: 'ND' }
    ]
  };
  
  public pieChartLabels : string[]= ['ND'];
  public pieChartDatasets = [ {
    data: [1]
  }];

  public pieSubscription: Subscription = new Subscription;
  public barSubscription: Subscription = new Subscription;

  constructor(private statService: StatsService) {
  }

  ngOnInit () {
    this.pieSubscription = this.statService.getPieValues().subscribe(x => {
      this.pieChartLabels = x.labels;
      this.pieChartDatasets = [ {
        data: x.values
      }];
    });

    this.barSubscription = this.statService.getBarValues().subscribe(x => {
      console.log(x);
      this.barChartData = {
        labels: x.labels,
        datasets: x.values,
      };
    });
  }
  
  ngOnDestroy() {
    this.pieSubscription.unsubscribe();  
    this.barSubscription.unsubscribe();   
  }

  // public barChartData: ChartConfiguration<'bar'>['data'] = {
  //   labels: [ '2006', '2007', '2008', '2009', '2010', '2011', '2012' ],
  //   datasets: [
  //     { data: [ 65, 59, 80, 81, 56, 55, 40 ], label: 'Series A' },
  //     { data: [ 28, 48, 40, 19, 86, 27, 90 ], label: 'Series B' }
  //   ]
  // };
  // public pieChartLabels = [ 'Accueil', 'Qui sommes nous', 'Les maitres', 'News', 'Agenda', 'Documents', 'Tarifs', 'Kimono', 'Compétition', 'Stage' ];
  // public pieChartDatasets = [ {
  //   data: [ 300, 500, 100 ]
  // } ];

}
