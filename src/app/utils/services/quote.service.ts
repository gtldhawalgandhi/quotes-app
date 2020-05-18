import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { Quote } from '@app/utils/models';

@Injectable({ providedIn: 'root' })
export class QuoteService {
    private quoteSubject: BehaviorSubject<Quote>;
    public quote: Observable<Quote>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.quoteSubject = new BehaviorSubject<Quote>(JSON.parse(localStorage.getItem('quote')));
        this.quote = this.quoteSubject.asObservable();
    }

    public get quoteValue(): Quote {
        return this.quoteSubject.value;
    }

    create(quote: Quote, id: String) {
        const q = {...quote , createdBy: id}
        return this.http.post(`${environment.apiUrl}/quotes/create`, q);
    }

    getAll() {
        return this.http.get<Quote[]>(`${environment.apiUrl}/quotes`);
    }

    getById(id: string) {
        return this.http.get<Quote>(`${environment.apiUrl}/quotes/${id}`);
    }

    update(id, params) {
        return this.http.put(`${environment.apiUrl}/quotes/${id}`, params)
        .pipe(map(x => {
                return x;
            }));
    }
    
    delete(id: string) {
        return this.http.delete(`${environment.apiUrl}/quotes/${id}`)
        .pipe(map(x => {
                return x;
            }));
    }
}