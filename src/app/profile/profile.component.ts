import { Component, OnInit } from '@angular/core';
import { AccountService, AlertService } from '../utils/services';
import { User } from '../utils/models';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  user: User;
  edit: any = true;
  form: FormGroup;
  loading = false;
  init = true;
  submitted = false;

  get f() {
    return this.form.controls;
  }

  constructor(
    private accountService: AccountService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AccountService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.accountService.user.subscribe((x) => (this.user = x));
    const passwordValidators = [Validators.minLength(6)];
 
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', Validators.required],
      password: ['', passwordValidators],
    });

    if (this.edit) {
      this.editor();
    }    
  }

  get passwordChanged() {
    return this.f.password.value.length ? true : false;
  }

  get isValid() {
    return this.form.valid
  }

  editor(): void {    
    this.accountService
      .getById(this.user.id)
      .pipe(first())
      .subscribe((x) => {
        this.init = false;
        this.f.firstName.setValue(x.firstName);
        this.f.lastName.setValue(x.lastName);
        this.f.userName.setValue(x.username);
      });
  }

  onSubmit() {
    this.submitted = true;
    this.alertService.clear();

    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.updateUser();
  }

  private updateUser() {
    const updatedUser = { ...this.user, ...this.form.value }
    this.accountService
      .update(this.user.id, updatedUser)
      .pipe(first())
      .subscribe(
        (data) => {
          this.alertService.success('Update successful', {
            RetainAfterRouteChange: false,
          });
          this.loading = false;
          this.router.navigate(['/profile']);
        },
        (error) => {
          this.alertService.error(error);
          this.loading = false;
        }
      );
  }
}
