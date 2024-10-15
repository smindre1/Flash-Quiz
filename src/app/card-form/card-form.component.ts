import { Component, Input } from '@angular/core';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-card-form',
  templateUrl: './card-form.component.html',
  styleUrl: './card-form.component.css'
})
export class CardFormComponent {
  @Input() name!: string; //name is the flashcard set identifier
  @Input() user!: string //user id

  question: string = "";
  answer: string = "";
  questionError: boolean = false;
  answerError: boolean = false;

    //Makes the PUT request to add a flashcard to a flashcard set
    createFlashcard(e: Event): void {
      e.preventDefault();
      let url = environment.DB_URL + "flashcards/add-card/" + this.user + "/"+ this.name;
      // Check if all required fields are set
      if(this.question.length < 1) {
        this.questionError = true;
        e.stopPropagation();
      } else {
        this.questionError = false;
      }
      if(this.answer.length < 1) {
        this.answerError = true;
        e.stopPropagation();
      } else {
        this.answerError = false;
      }
      // If fields
      if(!this.questionError && !this.answerError) {
        fetch(url, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({questions: [{question: this.question, answer: this.answer, quizReady: false}]}) // Convert data to JSON format
        })
        .then(response => {
          // Check if the response is successful
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json(); // Parse the JSON response
        })
        // .then(data => {
        //   // Work with the JSON response data to do a status check
        //   console.log("Response data:", data);
        // })
        .catch(error => {
          // Handle any errors that occur during the fetch
          console.error('There was a problem making the flashcard:', error);
        });
      }
    }

}
