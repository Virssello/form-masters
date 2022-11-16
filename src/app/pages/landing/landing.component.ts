import { Component } from '@angular/core';
import { LayoutService } from '../../../layout/service/app.layout.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html'
})
export class LandingComponent {

  constructor(public layoutService: LayoutService, public router: Router) { }

}
