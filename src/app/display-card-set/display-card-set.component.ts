import { Component, Input } from '@angular/core';
import { environment } from '../../environments/environment';

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
}
