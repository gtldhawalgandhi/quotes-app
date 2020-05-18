import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { QuoteService, AccountService, AlertService } from '../utils/services';
import { User } from '../utils/models';

@Component({ templateUrl: 'add-edit.component.html' })
export class AddEditComponent implements OnInit {
    form: FormGroup;
    id: string;
    isAddMode: boolean;
    loading = false;
    submitted = false;
    user: User;
    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private quoteService: QuoteService,
        private authenticationService: AccountService,
        private alertService: AlertService
    ) {
        this.authenticationService.user.subscribe(x => this.user = x)
    }

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];
        this.isAddMode = !this.id;
        this.form = this.formBuilder.group({
            quote: ['', Validators.required],
            author: ['', Validators.required],
            created: [''],
            likes: ['']
        });


        if (!this.isAddMode) {
            this.quoteService.getById(this.id)
                .pipe(first())
                .subscribe(x => {
                    this.f.quote.setValue(x.quote);
                    this.f.author.setValue(x.author);
                    this.f.created.setValue(x.created);
                    this.f.likes.setValue((x.likes));
                });
        }
    }

    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        this.alertService.clear();

        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        if (this.isAddMode) {
            this.createQuote();
        } else {
            this.updateQuote();
        }
    }

    private createQuote() {
        this.quoteService.create(this.form.value, this.user.id)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Quote added successfully', { RetainAfterRouteChange: true });
                    this.router.navigate(['.']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

    private updateQuote() {
        this.quoteService.update(this.id, this.form.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Update successful', { RetainAfterRouteChange: true });
                    this.router.navigate(['..']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}