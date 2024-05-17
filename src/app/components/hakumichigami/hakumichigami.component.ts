import { Component } from '@angular/core';
import { StatName } from 'src/app/enums/stat-name';
import { StatsService } from 'src/app/services/stats.service';

@Component({
  selector: 'app-hakumichigami',
  templateUrl: './hakumichigami.component.html',
  styleUrls: ['./hakumichigami.component.scss']
})
export class HakumichigamiComponent {
  constructor(private statService: StatsService) {}

  ngOnInit () {
    this.statService.add(StatName.hakumichigami).subscribe();
  }
}
