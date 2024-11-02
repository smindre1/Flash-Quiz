import { Component } from '@angular/core';
import { environment } from '../../environments/environment';
import authService from '../services/auth.service';

interface Group {_id: string; title: string; public: boolean}

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
      !authService.loggedIn() ? document.location.href = '/auth' : null;
      // Now it's safe to access localStorage
      this.userId = authService.getProfile().data._id;
    }
    this.loadData();
  }

  loadData(): void {
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

  highlightSet(e: Event): void {
    const button = e.target as HTMLButtonElement;
    this.selected = button.id;
  }

  publicToggle(e: Event): void {
    let button = e.currentTarget as HTMLElement;
    let change = button.getAttribute("public") || "false";
    let bool = change === "true" ? true : false;

    let url = environment.DB_URL + "flashcards/set/" + this.userId + "/"+ button.id;
    
    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({public: !bool }) // Convert data to JSON format
    })
    .then(response => {
      // Check if the response is successful
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json(); // Parse the JSON response
    }).then(() => {
      this.loadData();
    })
    .catch(error => {
      // Handle any errors that occur during the fetch
      console.error('There was a problem updating the flash card set public view:', error);
    });
  }
}
