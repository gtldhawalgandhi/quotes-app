import { Component } from '@angular/core';

import { User } from '../utils/models';
import { AccountService } from '../utils/services';

@Component({ templateUrl: 'about.component.html' })
export class AboutComponent {
    user: User;

    constructor(private accountService: AccountService) {
        this.user = this.accountService.userValue;
    }
}