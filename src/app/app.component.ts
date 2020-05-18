import { Component } from '@angular/core';

import { AccountService } from './utils/services';
import { User, Role } from './utils/models';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {
    user: User;

    constructor(private accountService: AccountService) {
        this.accountService.user.subscribe(x => this.user = x);
    }

    get isAdmin() {
        return this.user && this.user.role === Role.Admin;
    }


    logout() {
        this.accountService.logout();
    }
}