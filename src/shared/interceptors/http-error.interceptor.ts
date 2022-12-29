import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  private requests: HttpRequest<any>[] = [];

  constructor(private messageService: MessageService) { }

  public removeRequest(req: HttpRequest<any>): void {
    const i = this.requests.indexOf(req);

    if (i >= 0) {
      this.requests.splice(i, 1);
    }
  }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.requests.push(req);

    return Observable.create((observer: any) => {
      const subscription = next.handle(req)
        .subscribe(
          (event: any) => {
            if (event instanceof HttpResponse) {
              this.removeRequest(req);
              observer.next(event);
            }
          },
          (err: any) => {
            this.messageService.add({
              severity: 'error', summary: 'Something went wrong', detail: 'Please make sure you have did everything right'
            });
            this.removeRequest(req);
            observer.error(err);
          },
          () => {
            this.removeRequest(req);
            observer.complete();
          }
        );

      return () => {
        this.removeRequest(req);
        subscription.unsubscribe();
      };
    });
  }
}
