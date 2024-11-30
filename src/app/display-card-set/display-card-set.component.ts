import { Component, Input, SimpleChanges } from '@angular/core';
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
  @Input() name!: string; //name is the flashcard set identifier.
  @Input() user!: string; //user id.
  @Input() mode!: string; // Displays either an edit or study mode (edit mode displays a button toggle that allows for editing individual cards).

  title: string = "";
  size: number = 0;
  setId: string = "";
  cardArray: CardObject[] = [];
  displayCard: number = 0;
  displayFront: boolean = true;
  editMode: boolean = false;
  // 'question' and 'answer' are for the textarea values when editing the flashcard.
  question: string = "";
  answer: string = "";
  toggle: string = "display";



  loadData(): void {
    const url = environment.DB_URL + "flashcards/set/" + this.user + "/"+ this.name;
    fetch(url)
    //Checks if the responding data is ok.
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

  ngOnChanges(changes: SimpleChanges):void {
    if(changes['name']) {
      this.editMode = false;
      this.displayCard = 0;
      this.displayFront = true;
    }
    this.loadData()
  }

  flipCard(event?: KeyboardEvent): void {
    if(event) {
      // console.log(event);
      // console.log(event.code);
      event.code === "Space" ? this.displayFront = !this.displayFront : null;
    }
    // console.log("check");

    if(!event) {
      this.displayFront = !this.displayFront;
    }
  }

  changeCard(direction: string): void {
    // Resets to the front of the card when switching.
    this.displayFront = true;
    //Checks the direction for next card and adjusts displayCard number.
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

  editToggle(): void {
    this.editMode = !this.editMode;
    // Updates 'question' and 'answer' variables with currently displayed flashcard values.
    this.editMode === true ? (this.question = this.cardArray[this.displayCard].question, this.answer = this.cardArray[this.displayCard].answer) : null;
  }

  displayToggle(): void {
    this.toggle === "display" ? this.toggle = "new-card" : this.toggle = "display";
  }

  saveEdits(): void {
    let url = environment.DB_URL + "flashcards/edit-card/" + this.user + "/"+ this.name + "/" + this.cardArray[this.displayCard]._id;
    // if(!this.questionError && !this.answerError) {
      fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({question: this.question, answer: this.answer}) // Convert data to JSON format
      })
      .then(response => {
        // Check if the response is successful
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        if (response.ok) {
          this.editMode = false;
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
    // }
  }

}
