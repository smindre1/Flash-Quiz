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
  home: boolean = false;
  portal: boolean = false;
  

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
    //Hides the home button on the homepage
    window.location.pathname === '/' ? this.home = true : this.home = false;
    //Hides the home button on the homepage
    window.location.pathname === '/auth' ? this.portal = true : this.portal = false;
  }

  signOutUser(): void {
    AuthService.logout();
  }
}
