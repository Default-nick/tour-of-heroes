import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { MessageService } from '../services/message.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private messageService: MessageService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (!environment.production) {
          console.log(err);
        }
        let errorMsg = '';

        if (err.error instanceof ErrorEvent) {
          errorMsg = `Error ${err.error.message}`;
        } else {
          errorMsg = `Error Code: ${err.status}, Message: ${err.error.error}`;
        }

        this.messageService.add(errorMsg);

        return throwError(() => new Error(errorMsg));
      })
    );
  }
}
