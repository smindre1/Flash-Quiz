import { Component } from '@angular/core';
import AuthService from '../services/auth.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrl: './portal.component.css',
})
export class PortalComponent {
  name: string = '';
  nameError: boolean = false;
  email: string = '';
  emailError: boolean = false;
  number: string = '';
  numberError: boolean = false;
  password: string = '';
  passwordError: boolean = false;
  toggle: string = 'signup';
  success: boolean = false

  changeToggle(key: string): void {
    this.toggle = key;
  }

  handlePhone(event: KeyboardEvent): void {
    if (!event) return;
    // Resets any non-numbers that the user inputs
    const letterRegex = /[\D]/g;
    if (event.code.match(letterRegex)) {
      return;
    }

    // Takes the inputted numbers and formats them into a phone number template
    const regex = /[\d]/g;
    var phoneNumber: RegExpMatchArray | null = this.number.match(regex);
    let newNumber: string = phoneNumber != null ? phoneNumber.join('') : '';

    const numLength = newNumber.length;
    if (numLength < 4) {
      this.number = newNumber;
    }
    if (3 < numLength && numLength < 7) {
      this.number = `(${newNumber.slice(0, 3)}) ${newNumber.slice(3)}`;
    }
    if (numLength > 6) {
      this.number = `(${newNumber.slice(0, 3)}) ${newNumber.slice(3,6)} - ${newNumber.slice(6, 10)}`;
    }
  }

  checkForm(): boolean {
    //If the input field is empty, change the input's error variable to true
    this.name.length === 0 ? this.nameError = true : null;
    this.email.length === 0 ? this.emailError = true : null;
    this.number.length === 0 ? this.numberError = true : null;
    this.password.length === 0 ? this.passwordError = true : null;
    //If any input has an error return false, else return true
    if(this.nameError == true || this.emailError == true || this.numberError == true || this.passwordError == true) {
      return false;
    } else {
      return true;
    }
  }

  handleSubmit(e: Event): void {
    e.preventDefault();
    // const Auth = new AuthService;
    //A failed checkForm will prevent the form from submitting
    if(!this.checkForm()) {
      e.stopPropagation()
    } else {
      
      const userFormData = { username: this.name, email: this.email, phone: this.number, password: this.password };

      const url = environment.DB_URL + "users/";
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userFormData) // Convert data to JSON format
      })
      .then(response => {
        // Check if the response is successful
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // Parse the JSON response
      })
      .then(data => {
        // Work with the JSON response data
        console.log("Response data", data);
        AuthService.login(data.token);
      })
      .catch(error => {
        // Handle any errors that occur during the fetch
        console.error('There was a problem with the fetch operation:', error);
      });

      // Resets form after successful submission
      this.name = "";
      this.email = "";
      this.number = "";
      this.password = "";
    }
  }
}
//Dev Notes:
// - Removed Refs in html
// Should I include phone numbers with user profiles?
// I should send a confirmation email for them to click to confirm making the account.
