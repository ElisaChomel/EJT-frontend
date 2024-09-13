import { Component, AfterViewInit  } from '@angular/core';
import { embed } from 'embedrax';

import { StatName } from 'src/app/enums/stat-name';
import { StatsService } from 'src/app/services/stats.service';

@Component({
  selector: 'app-hakumichigami',
  templateUrl: './hakumichigami.component.html',
  styleUrls: ['./hakumichigami.component.scss']
})
export class HakumichigamiComponent {
  constructor(private statService: StatsService) {
  }

  ngAfterViewInit() {
    embed([
      {
          width: 640,
          height: 360,
          autoplay: true,
          fullscreen: false,
          controls: true,
          videoUrl: 'https://www.dailymotion.com/video/x464pr_maitre-haku-michigami-9-dan-bordeau_sport',
          videoClass: 'embed-youtube-one-clip'
      }
    ]);
  }

  ngOnInit () {
    this.statService.add(StatName.hakumichigami).subscribe();
  }
}
