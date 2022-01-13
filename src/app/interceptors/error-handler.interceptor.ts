import { MessageService } from './../services/message.service';
import { ErrorSnackbarComponent } from './../components/error-snackbar/error-snackbar.component';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
  HttpContextToken
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

export const skipControl = new HttpContextToken(() => false);

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

  constructor(
    private messageService: MessageService,
    private snackbar: MatSnackBar
    ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // Use this to skip control on specific requests
    if (request.context.get(skipControl)) {
      return next.handle(request);
    }

    // Handling for all others requests
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          console.log('event--->>>', event);
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        const config: MatSnackBarConfig = {
          data: this.messageService.getMessage(request,error),
          duration: 5000
        };
        this.snackbar.openFromComponent(ErrorSnackbarComponent, config);
        return throwError(() => error); 
      })
    );
  }

  
}
