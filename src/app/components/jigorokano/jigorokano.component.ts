import { Component } from '@angular/core';
import { StatName } from 'src/app/enums/stat-name';
import { StatsService } from 'src/app/services/stats.service';

@Component({
  selector: 'app-jigorokano',
  templateUrl: './jigorokano.component.html',
  styleUrls: ['./jigorokano.component.scss']
})
export class JigorokanoComponent {
  constructor(private statService: StatsService) {}

  ngOnInit () {
    this.statService.add(StatName.jigorokano).subscribe();
  }
}
