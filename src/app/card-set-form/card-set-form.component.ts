import { Component } from '@angular/core';
import { environment } from '../../environments/environment';
import authService from '../services/auth.service';

@Component({
  selector: 'app-card-set-form',
  templateUrl: './card-set-form.component.html',
  styleUrl: './card-set-form.component.css'
})
export class CardSetFormComponent {
  title: string = '';
  titleError: boolean = false;
  url: string = environment.DB_URL + "flashcards";
  userId: string = "";

  ngOnInit(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      // Now it's safe to access localStorage
        this.userId = authService.getProfile().data._id;
    }
  }

  //Makes the POST request for each service selected
  newSet(e: Event): void {
    e.preventDefault();
    if(this.title.length < 1) {
      this.titleError = true;
      e.stopPropagation();
    }

    fetch(this.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({title: this.title, userId: this.userId, questions: []}) // Convert data to JSON format
    })
    .then(response => {
      // Check if the response is successful
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json(); // Parse the JSON response
    })
    .then(data => {
      // Work with the JSON response data to do a status check
      console.log("Response data:", data);
    })
    .catch(error => {
      // Handle any errors that occur during the fetch
      console.error('There was a problem making the flashcard set:', error);
    });
  }

}
