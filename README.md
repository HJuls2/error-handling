# ErrorHandling

Generato con [Angular CLI](https://github.com/angular/angular-cli) versione 13.1.2.

Modulo dimostrativo in cui si realizza un controllo centralizzato della gestione degli errori HTTP tramite *intercettore* Angular.

Oltre a messaggi di errore generici validi per l'intera applicazione, è possibile utilizzare un file JSON (nel formato mostrato nell'esempio nella sezione ...) per definire messaggi di errore relativi a specifiche coppie *endpoint-codice di errore HTTP*.

## Requisiti

- **Angular 6/7+**
- **Typescript 2.9+**
- nel file **tsconfig.json**, impostare sotto `compilerOptions` i campi:

```typescript
"resolveJsonModule": true,
"allowSyntheticDefaultImports": true
```

- **Angular Material**;

## Funzionamento

Un servizio Angular **`MessageService`** legge ed interpreta il file di configurazione *endpoints.json* posto nella cartella *assets*. L'oggetto ricavato viene organizzato in una mappa utilizzando come chiave la tupla (metodo HTTP, url dell'endpoint, codice di errore) e come valore il messaggio di errore corretto.

Se nel file JSON di configurazione non viene definito uno specifico messaggio di errore per l'endpoint desiderato, vengono usati i messaggi predefiniti (*hard-coded* nel metodo privato **`getBasicErrorMessages(error:HttpErrorResponse):string`**).

Il metodo **`getMessage(request:HttpRequest<any>, error: HttpErrorResponse)`** servizio **`MessageService`** viene invocato dall'intercettore Angular **ErrorHandlerInterceptor** nell'operatore **`catchError`** per recuperare il corretto messaggio da mostrare nella snackbar.

La snackbar è definita dal componente Angular **`ErrorSnackbarComponent`** e si limita a stampare a video per 5 secondi il messaggio ricevuto.

## Esempio di file di configurazione JSON

```json
[
  {
   "method": "GET",
   "url": "URL 1",
   "errors": [
    {
     "code": 400,
     "message": "RICHIESTA ERRATA per url 1"
    },
    {
     "code": 401,
     "message": "NON AUTORIZZATO per url 1"
    }
   ]
  },
  {
   "method": "GET",
   "url" : "URL 2",
   "errors": [
    {
     "code": 400,
     "message": "RICHIESTA ERRATA per url 2"
    },
    {
     "code": 404,
     "message": "NON TROVATO"
    },
    {
     "code": 500,
     "message": "ERRORE DEL SERVER"
    }
   ]
  }
]
```
