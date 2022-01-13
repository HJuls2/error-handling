import { MessageService } from './../services/message.service';
import { ErrorSnackbarComponent } from './../components/error-snackbar/error-snackbar.component';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

  constructor(
    private messageService: MessageService,
    private snackbar: MatSnackBar
    ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
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
