import { Component, OnInit } from '@angular/core';
import AuthService from '../services/auth.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrl: './portal.component.css',
  host: { 'class': 'cen'}
})
export class PortalComponent {
  name: string = '';
  nameError: boolean = false;
  email: string = '';
  emailError: boolean = false;
  password: string = '';
  hidePassword: boolean = true;
  passwordError: boolean = false;
  passwordIncorrect: boolean = false;
  toggle: string = 'login';
  success: boolean = false;

  changeToggle(key: string): void {
    this.toggle = key;
  }

  updateValue(status: string): void {
    console.log(status, "status");
    status === 'password' ? this.passwordError = false : null;
    status === 'email' ? this.emailError = false : null;
  }

  checkForm(): boolean {
    //If the input field is empty, change the input's error variable to true
    this.name.length === 0 ? this.nameError = true : null;
    this.email.length === 0 ? this.emailError = true : null;
    this.password.length === 0 ? this.passwordError = true : null;
    //If any input for signup form has an error return false, else return true
    if(this.toggle === 'signup' && (this.nameError == true || this.emailError == true || this.passwordError == true)) {
      return false;
    } else {
      //Checks if it's a login form and then checks for errors, if everything is good return true
      if(this.toggle === 'login' && (this.emailError == true || this.passwordError == true)) {
        return false
      } else {
        return true;
      }
    }
  }

  handleSubmit(e: Event): void {
    e.preventDefault();
    //A failed checkForm will prevent the form from submitting
    if(!this.checkForm()) {
      e.stopPropagation()
    } else {
      
      const userFormData = this.toggle === 'signup' ? { username: this.name, email: this.email, password: this.password } : { email: this.email, password: this.password };

      let url = environment.DB_URL + "users/";
      this.toggle === 'login' ? url = url + 'login' : null;
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
          
          return response.json().then(data => {throw new Error(data.error);})
          // throw new Error(response.error);
        }
        return response.json(); // Parse the JSON response
      })
      .then(data => {
        // Work with the JSON response data
        // console.log("Response data", data);
        AuthService.login(data.token);
        console.log("running");
        // Resets form after successful submission
        this.name = "";
        this.email = "";
        this.password = "";
      })
      .catch(error => {
        // Handle any errors that occur during the fetch
        error.message === 'Incorrect Password' ? this.passwordIncorrect = true : null;
        console.error('There was a problem with the fetch operation:', error);
      });


    }
  }
}
//Dev Notes:
// - Removed Refs in html
// I should send a confirmation email for them to click to confirm making the account.
