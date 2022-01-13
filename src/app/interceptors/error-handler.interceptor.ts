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

  constructor(private snackbar: MatSnackBar) {}

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
        data: this.getBasicErrorMessage(error),
        duration: 5000
      };
      this.snackbar.openFromComponent(ErrorSnackbarComponent, config);
      return throwError(() => error); 
    })
    );
  }

  private getBasicErrorMessage(error: HttpErrorResponse): string{
    let message: string;
    switch (error.status){
        case 400: {
          message = 'Operazione non definita.';
          break;
        }
        case 401: {
          message = 'Autenticazione richiesta.';
          break;
        }
        case 403: {
          message = 'Operazione non autorizzata.';
          break;
        }
        case 404: {
          message = 'La risorsa richiesta non è stata trovata.';
          break;
        }
        case 500: {
          message = 'Si è verificato un problema, si prega di riprovare più tardi.';
          break;
        }
        default: {
          message = `${error.status} ${error.statusText}`;
          break;
        }
      }
    return message;
  }
}
