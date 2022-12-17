import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ArchiveProductUserRequest } from '../../request/archive-product-user.request';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Store } from '@ngrx/store';
import { archiveProductUserAction, archiveProductUserErrorAction, archiveProductUserSuccessAction } from './archive-product-user.action';
import { catchError, mergeMap, of, tap } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ArchiveProductUserEffect {
  constructor(private actions$: Actions,
              private httpClient: HttpClient,
              private store: Store,
              private messageService: MessageService) {}
  public productUser$ = createEffect(() => this.actions$.pipe(
    ofType(archiveProductUserAction),
    mergeMap(({ archiveProductUser }: { archiveProductUser: ArchiveProductUserRequest }) => {
      return this.httpClient.put('api/product-users/archive-product-users', { ...archiveProductUser }).pipe(
        map(() => archiveProductUserSuccessAction()),
        tap(() => this.messageService.add({ severity: 'success', detail: 'Product archived successful' })),
        catchError((error: Error) => of(archiveProductUserErrorAction({ error })))
      );
    })
  ));
}
