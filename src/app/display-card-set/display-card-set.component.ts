import { Component, Input } from '@angular/core';
import { environment } from '../../environments/environment';

interface CardObject {
  question: string,
  answer: string,
  quizReady: boolean,
  _id: string,
  fakeAnswers: any[]
}

@Component({
  selector: 'app-display-card-set',
  templateUrl: './display-card-set.component.html',
  styleUrl: './display-card-set.component.css'
})
export class DisplayCardSetComponent {
  @Input() name!: string; //name is the flashcard set identifier
  @Input() user!: string //user id

  title: string = "";
  size: number = 0;
  setId: string = "";
  cardArray: CardObject[] = [];
  displayCard: number = 0;
  displayFront: boolean = true;


  loadData(): void {
    const url = environment.DB_URL + "flashcards/set/" + this.user + "/"+ this.name;
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
        // console.log(data[0]);
        this.title = data[0].title;
        this.size = data[0].questions.length;
        this.setId = data[0]._id;
        this.cardArray = data[0].questions;
        console.log("test: ", this.cardArray);
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
  }

  ngOnInit(): void {
    this.loadData()
  }

  ngOnChanges():void {
    this.loadData()
  }

  flipCard(event?: KeyboardEvent): void {
    if(event) {
      console.log(event);
      console.log(event.code);
      event.code === "Space" ? this.displayFront = !this.displayFront : null;
    }
    if(!event) {
      this.displayFront = !this.displayFront;
    }
  }

  changeCard(direction: string): void {
    // Resets to the front of the card when switching
    this.displayFront = true;
    //Checks the direction for next card and adjusts displayCard number
    if(direction === "Prev") {
      if(this.displayCard <= 0) {
        this.displayCard = (this.size - 1);
      } else {
        this.displayCard = this.displayCard - 1;
      }
    }
    if(direction === "Next") {
      if(this.displayCard >= this.size - 1 ) {
        this.displayCard = 0;
      } else {
        this.displayCard = this.displayCard + 1;
      }
    }
  }

}
