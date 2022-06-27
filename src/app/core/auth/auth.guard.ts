import { Injectable } from "@angular/core";
import { CanLoad, Route, Router, UrlSegment, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({
    providedIn: 'root'
})
export class CanLoadGuard implements CanLoad {

    constructor(private authService: AuthService, private router: Router){

    }

    // Only load module when user is logged in
    canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
        const logged = localStorage.getItem('user') !== 'null';

        if(!logged){
            this.router.navigateByUrl("/auth");
        }
        return true;  
    }
} 