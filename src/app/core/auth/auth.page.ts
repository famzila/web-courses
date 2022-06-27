import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  isLoading = false;
  isLogin = true;

  constructor(private authService: AuthService,
    private router: Router, public loadingController: LoadingController) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    console.log("Login/ sign up: ", form)
    if (!form.valid) {
      return;
    }

    const userCredentials = { email: form.value.email, password: form.value.password };

    this.authenticate(userCredentials);
  }

  onSwitchAuthMode() {
    this.isLogin = !this.isLogin;
  }

  authenticate(credentials: any) {
    this.isLoading = true;

    this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000
    }).then(loader => {
      loader.present();
      let user: any = undefined;
      if (this.isLogin) {
        this.authService.login(credentials).then(authUser => {
          console.log("LOGIN: ", authUser);
          if (authUser) {
            user = authUser;
            loader.dismiss();
            this.router.navigateByUrl('/courses', { replaceUrl: true });
          }
        });
      } else {
        this.authService.register(credentials).then(authUser => {
          console.log("SIGNIN: ", authUser);
          //   this.authService.SendVerificationMail()
          // this.router.navigate(['verify-email']);
          if (authUser) {
            user = authUser;
            loader.dismiss();
            this.router.navigateByUrl('/courses', { replaceUrl: true });
          }
        })
      }
    })

  }

}
