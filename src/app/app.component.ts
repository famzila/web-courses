import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { Plugins, Capacitor } from '@capacitor/core';


import { AuthService } from './core/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  private authSub: Subscription;
  private previousAuthState = false;

  constructor(private platform: Platform,
    private authService: AuthService,
    private router: Router) {
    this.initApp();
  }

  ngOnInit() {
    const user = localStorage.getItem('user');
    if(!user){
      this.router.navigateByUrl('/auth');
    }
  }

  initApp() {
    this.platform.ready().then(() => {
      if (Capacitor.isPluginAvailable('Splashscreen')) {
        Plugins.Splashscreen.hide();
      }
    });
  }

  onLogout() {
    this.authService.logout();
  }
}
