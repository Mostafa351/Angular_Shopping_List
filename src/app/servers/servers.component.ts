import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  // styleUrls: ['./servers.component.css'],
  styles: [`
      h1{
      color: dodgerblue;
    },
    h3{
      color:dodgerblue;
    }

  `],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class ServersComponent {

}
