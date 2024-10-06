import { Component } from '@angular/core';
import { environment } from '../../environments/environment';
import authService from '../services/auth.service';

interface Group {_id: string; title: string;}

@Component({
  selector: 'app-user-sets',
  templateUrl: './user-sets.component.html',
  styleUrl: './user-sets.component.css'
})

export class UserSetsComponent {
  url: string = environment.DB_URL + "flashcards";
  userId: string = "";
  selected: string = '';
  flashcardSets: Group[] = [];
  ngOnInit(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
    // Now it's safe to access localStorage
      this.userId = authService.getProfile().data._id;
    }
    if (this.userId != "") {
      const url = environment.DB_URL + "flashcards/" + this.userId;
          fetch(url)
          //Checks if the responding data is ok
          .then(response => {
              if (!response.ok) {
              throw new Error('Network response was not ok');
              }
              // Parse the JSON response
              return response.json();
          })
          .then(data => {
              // console.log(data);
              this.flashcardSets = data;
              // console.log("Check: ", this.flashcardSets);
          })
          .catch(error => {
              console.error('There was a problem with the fetch operation:', error);
          });
    }
  }

  thing(e: Event): void {
    const button = e.target as HTMLButtonElement;
    this.selected = button.id;
  }
}
