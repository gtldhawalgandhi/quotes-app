import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { QuoteService, AccountService } from '@app/utils/services';
import { User, Quote, Role } from '@app/utils/models';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
    quotes = null;
    user: User;
    currentQuoteId: String;

    constructor(
        private quoteService: QuoteService,
        private authenticationService: AccountService
    ) {
        this.authenticationService.user.subscribe((x) => (this.user = x));
    }

    isPermitted(quote) {
        return this.user && this.user.role
            ? this.user.role === Role.Admin
            : this.user.id == quote.createdBy;
    }

    ngOnInit() {
        this.quoteService
            .getAll()
            .pipe(first())
            .subscribe(
                (quotes) => {
                    this.quotes = quotes;
                },
                (error) => {
                    this.quotes = [];
                })
                
    }

    updateQuoteLike(id: string) {
        let quote = this.quotes.find((x) => x.id === id);
        const likes = quote.likes ? parseInt(quote.likes) + 1 : 1;
        quote = { ...quote, likes };
        console.log(
            `updateQuoteLike Called, Likes >> ${JSON.stringify(quote.likes, null, 2)}`
        );
        this.quoteService
            .update(id, quote)
            .pipe(first())
            .subscribe(() => {
                this.quotes = this.quotes.map((x) => x);
            });
    }

    deleteQuote(id: string) {
        let quote: Quote = this.quotes.find((x) => x.id === id);
        if (this.user.role !== 'Admin' && quote.createdBy !== this.user.id) {
            return;
        }
        this.currentQuoteId = id;
        this.quoteService
            .delete(id)
            .pipe(first())
            .subscribe(
                (data) => {
                    this.quotes = this.quotes.filter((x) => x.id !== id);
                    this.currentQuoteId = '';
                },
                (error) => {
                    let quote: Quote = this.quotes.find((x) => x.id === id);
                    this.currentQuoteId = '';
                }
            );
    }
}
