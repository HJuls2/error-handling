import { skipControl } from './../interceptors/error-handler.interceptor';
import { HttpClient, HttpContext, HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import jsonConfig from 'src/assets/endpoints.json';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  // Can be improved with using as key an hash of the object{method: config.method, url: config.url, error: error.code}
  private messages: Map<string,string > = new Map();

  constructor() { 
    this.getConfiguration()
  }

  public getMessage(request: HttpRequest<any>, error: HttpErrorResponse){
    return (this.getAdvancedErrorMessage(request, error) !== undefined) ? this.getAdvancedErrorMessage(request, error) : this.getBasicErrorMessage(error);
  }

  private getConfiguration(): void {
   
    for (const config of jsonConfig){
      for (const error of config.errors){
        this.messages.set(JSON.stringify({method: config.method, url: config.url, error: error.code}), error.message);
      }
    }

    console.log(this.messages);
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

  private getAdvancedErrorMessage(request: HttpRequest<any>, error: HttpErrorResponse): string | undefined{
    return this.messages.get(JSON.stringify({method: request.method, url: request.url, error: error.status}));
  }


}
