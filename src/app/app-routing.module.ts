import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './about';
import { AuthGuard } from './utils';
import { Role } from './utils/models';
import { ProfileComponent } from './profile/profile.component';

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const usersModule = () => import('./users/users.module').then(x => x.UsersModule);
const QuoteModule = () => import('./quotes/quote.module').then(x => x.QuoteModule);

const routes: Routes = [
    { path: '',   redirectTo: '/quotes', pathMatch: 'full' , canActivate: [AuthGuard]},
    { path: 'quotes', loadChildren: QuoteModule, canActivate: [AuthGuard] },
    { path: 'about', component: AboutComponent, canActivate: [AuthGuard] },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
    { path: 'users', loadChildren: usersModule, data: { roles: [Role.Admin] }, canActivate: [AuthGuard] },
    { path: 'account', loadChildren: accountModule },
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }