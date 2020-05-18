import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { CuratedBackendInterceptor, JwtInterceptor, ErrorInterceptor } from './utils';
import { AppComponent } from './app.component';
import { AlertComponent } from './utils/components';
import { AboutComponent } from './about';;
import { ProfileComponent } from './profile/profile.component'

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        AboutComponent
,
        ProfileComponent    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: CuratedBackendInterceptor, multi: true },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { };