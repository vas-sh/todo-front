import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {tap} from "rxjs/operators";
import {Router} from "@angular/router";
import { UserService } from '../services/user.service';
import { NotifyMessageService } from '../services/notify-message.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(
        private router: Router,
        private userService: UserService,
        private notifyMessageService: NotifyMessageService
    ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        for (let path of ['/login', '/sign-up']) {
            if (request.url.includes(path)) {
                return next.handle(request);
            }
        }
        const token = this.userService.getJwtToken();
        if (token) {
            request = request.clone({
                setHeaders: {
                    Authorization: token 
                }
            });
        }
        
        return next.handle(request).pipe( tap({
            next: () => {},
            error:  async (err: any) =>  {
                if (err instanceof HttpErrorResponse) {
                    if (err.status !== 401) {
                        await this.notifyMessageService.send(err.message)
                        return;
                    }
                    console.warn('Session expired. Please login again.', 'danger');
                    this.userService.cleanJwtToken();
                    this.router.navigate(['login']);
                }
        }
        }));
    }

}