import { Component } from '@angular/core';
import AuthService from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  loggedIn: boolean = false;
  menu: boolean = false;
  profile: {email: string; username: string; _id: string} = {email: '', username: '', _id: ''};

  

  toggleMenu(): void {
    this.menu === false ? this.menu = true : this.menu =false;
  }

  ngOnInit(): void {
    //Checks if local storage is rendered yet
    if (typeof window !== 'undefined' && window.localStorage) {
      // Now it's safe to access localStorage
      AuthService.loggedIn() ? this.loggedIn = true : this.loggedIn = false;
      this.loggedIn ? this.profile = AuthService.getProfile().data : null;
    }
  }

  signOutUser(): void {
    AuthService.logout();
  }
}
