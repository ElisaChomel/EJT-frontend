import { Component } from '@angular/core';
import { StatName } from 'src/app/enums/stat-name';
import { StatsService } from 'src/app/services/stats.service';

@Component({
  selector: 'app-tarif',
  templateUrl: './tarif.component.html',
  styleUrls: ['./tarif.component.scss']
})
export class TarifComponent {
  constructor(private statService: StatsService) {}

  ngOnInit () {
    this.statService.add(StatName.tarif).subscribe();
  }
}
