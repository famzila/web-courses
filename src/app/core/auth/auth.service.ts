import { Injectable, NgZone } from "@angular/core";
import { getAuth } from "firebase/auth";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from "@angular/router";

export interface User {
	uid: string;
	name: string;
	email: string;
	photoUrl: string;
	emailVerified: boolean;
}

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	private currentUser: any;

	constructor(private ngFireAuth: AngularFireAuth, private router: Router, private ngZone: NgZone) {
		this.ngFireAuth.authState.subscribe(user => {
			if (user) {
				this.currentUser = user;
				localStorage.setItem('user', JSON.stringify(this.currentUser));
				JSON.parse(localStorage.getItem('user'));
			} else {
				localStorage.setItem('user', null);
				JSON.parse(localStorage.getItem('user'));
			}
		})
	}

	getCurrentUser(){
		return this.currentUser;
	}

	userIsAuthenticated() {
		if (getAuth().currentUser) {
			return true;
		} else {
			return false;
		}
	}

	async register({ email, password }) {
		return this.ngFireAuth.createUserWithEmailAndPassword(email, password);
	}

	async login({ email, password }) {
		return this.ngFireAuth.signInWithEmailAndPassword(email, password);
	}

	 // Sign-out
	 logout() {
		return this.ngFireAuth.signOut().then(() => {
		  localStorage.removeItem('user');
		  this.router.navigate(['auth']);
		});
	  }

} 