import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LayoutService } from '../../../../layout/service/app.layout.service';
import { MessageService } from 'primeng/api';
import { Store } from '@ngrx/store';
import { userLoginAction } from './store/commands/user-login.action';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MessageService]
})
export class LoginComponent {

  public userLoginForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(public layoutService: LayoutService,
              private store: Store,
              private formBuilder: FormBuilder,
              private messageService: MessageService) {}

  public onUserLoginSubmit(): void {
    this.messageService.add({ severity: 'info', summary: 'Please wait, server is processing login request' });
    this.store.dispatch(userLoginAction({
      user: {
        username: this.userLoginForm.value.username!,
        password: this.userLoginForm.value.password!
      }
    }));
  }
}
