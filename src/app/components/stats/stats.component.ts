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

}
