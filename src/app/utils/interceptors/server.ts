import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { delay, mergeMap, materialize, dematerialize, timeout } from 'rxjs/operators';

let users = JSON.parse(localStorage.getItem('users')) || [];
let quotes = JSON.parse(localStorage.getItem('quotes')) || [];

@Injectable()
export class CuratedBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;
        const isTesting = environment.fakeServer
        if (isTesting) {
            return of(null)
            .pipe(mergeMap(handleRoute))            
            .pipe(materialize()) 
            .pipe(delay(300))
            .pipe(dematerialize())
        } else {
            return of(null)
            .pipe(mergeMap(forwardReq))            
            .pipe(timeout(1000))
        }
       

        function handleRoute() {
            switch (true) {
                case url.endsWith('/users/authenticate') && method === 'POST':
                    return authenticate();
                case url.endsWith('/users/register') && method === 'POST':
                    return register();
                case url.endsWith('/users') && method === 'GET':
                    return getUsers();
                case url.match(/\/users\/\d+$/) && method === 'GET':
                    return getUserById();
                case url.match(/\/users\/\d+$/) && method === 'PUT':
                    return updateUser();
                case url.match(/\/users\/\d+$/) && method === 'DELETE':
                    return deleteUser();
                case url.endsWith('/quotes/create') && method === 'POST':
                    return createQuote();
                case url.endsWith('/quotes') && method === 'GET':
                    return getQuotes();
                case url.match(/\/quotes\/\d+$/) && method === 'GET':
                    return getQuoteById();
                case url.match(/\/quotes\/\d+$/) && method === 'PUT':
                    return updateQuote();
                case url.match(/\/quotes\/\d+$/) && method === 'DELETE':
                    return deleteQuote();
                default:
                    return next.handle(request);
                }    
        }

        function forwardReq() {
            return next.handle(request);
        }

        /************   Users  ***************/

        function authenticate() {
            const { username, password } = body;
            const user = users.find(x => x.username === username && x.password === password);
            if (!user) return error('Username or password is incorrect');
            let userRes = {
                id: user.id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                token: 'fake-jwt-token',
                role: ''
            }
            if (user.role  === 'Admin' || user.username === 'admin' && user.password === 'admin123' ) {
                userRes.role = 'Admin'
            }
            return ok(userRes)
        }

        function register() {
            const user = body

            if (users.find(x => x.username === user.username)) {
                return error('Username "' + user.username + '" is already taken')
            }

            user.id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;
            users.push(user);
            localStorage.setItem('users', JSON.stringify(users));
            return ok();
        }

        function getUserById() {
            if (!isLoggedIn()) return unauthorized();

            const user = users.find(x => x.id === idFromUrl());
            return ok(user);
        }

        function getUsers() {
            if (!isLoggedIn()) return unauthorized();
            return ok(users);
        }

        function updateUser() {
            if (!isLoggedIn()) return unauthorized();

            let params = body;
            let user = users.find(x => x.id === idFromUrl());

            if (!params.password) {
                delete params.password;
            }

            Object.assign(user, params);
            localStorage.setItem('users', JSON.stringify(users));

            return ok();
        }

        function deleteUser() {
            if (!isLoggedIn()) return unauthorized();

            users = users.filter(x => x.id !== idFromUrl());
            localStorage.setItem('users', JSON.stringify(users));
            return ok();
        }

        /************   Quotes  ***************/

        function createQuote() {
            const quote = body

            if (quotes.find(x => x.quote === quote.quote)) {
                return error('Quote "' + quote.quote + '" is already taken')
            }

            quote.id = quotes.length ? Math.max(...quotes.map(x => x.id)) + 1 : 1;
            quotes.push(quote);
            localStorage.setItem('quotes', JSON.stringify(quotes));
            return ok();
        }


        function getQuotes() {
            if (!isLoggedIn()) return unauthorized();
            return ok(quotes);
        }

        function getQuoteById() {
            if (!isLoggedIn()) return unauthorized();

            const quote = quotes.find(x => x.id === idFromUrl());
            return ok(quote);
        }

        function updateQuote() {
            console.log(`PUT on updateQuotes`)
            if (!isLoggedIn()) return unauthorized();

            let params = body;
            console.log(`BODY: ${JSON.stringify(body, null, 2)}`)
            let quote = quotes.find(x => x.id === idFromUrl());

            Object.assign(quote, params);
            localStorage.setItem('quotes', JSON.stringify(quotes));

            return ok();
        }

        function deleteQuote() {
            if (!isLoggedIn()) return unauthorized();

            quotes = quotes.filter(x => x.id !== idFromUrl());
            localStorage.setItem('quotes', JSON.stringify(quotes));
            return ok();
        }

        function ok(body?) {
            return of(new HttpResponse({ status: 200, body }))
        }

        function error(message) {
            return throwError({ error: { message } });
        }

        function unauthorized() {
            return throwError({ status: 401, error: { message: 'Unauthorised' } });
        }

        function isLoggedIn() {
            return headers.get('Authorization') === 'Bearer fake-jwt-token';
        }

        function idFromUrl() {
            const urlParts = url.split('/');
            return parseInt(urlParts[urlParts.length - 1]);
        }
    }
}