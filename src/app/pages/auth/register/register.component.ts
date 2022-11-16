import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LayoutService } from '../../../../layout/service/app.layout.service';

@Component({
  selector: 'app-login',
  templateUrl: './register.component.html',
  styleUrls:['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent {

  valCheck: string[] = ['remember'];

  password!: string;

  constructor(public layoutService: LayoutService) { }
}
