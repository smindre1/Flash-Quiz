import { Component, OnInit } from '@angular/core';
import AuthService from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
  title = 'Flash-Quiz';
  userLog: boolean = false;
  ngOnInit(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      // Now it's safe to access localStorage
      this.userLog = AuthService.loggedIn()
    }
  }
}