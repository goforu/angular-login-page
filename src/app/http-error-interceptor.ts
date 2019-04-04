import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpResponse,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

    constructor(private router: Router){}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(
                tap(evt => {
                    if (evt instanceof HttpResponse) {
                        // handle logging out when session expired
                        if(evt.body && evt.body.code === -1){
                            this.router.navigate(['/login'])
                        }
                    }
                }),
                catchError((err: any) => {
                    if (err instanceof HttpErrorResponse) {
                        try {
                            console.log("error caught", err.error.message, err.error.title)
                        } catch (e) {
                            console.log("error", e)
                        }
                        //log error 
                    }
                    return of(err);
                }))

    }
}