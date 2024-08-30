import { Component } from '@angular/core';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css'
})
export class QuizComponent {

  timer: string = '';
  questions: string[] = ['1', '2', '3'];
  timeDeducted: number = 0;
  sequence: number = 0;
  curQuestion: string = this.questions[this.sequence];

  startQuiz(): void {
    let start: Date = new Date();
    //This sets up the games timer.
    const interval = setInterval(() => {
        const time: number = this.questions.length * 15 - Math.floor((new Date().getTime() - start.getTime()) / 1000) - this.timeDeducted;
        if (time > 0) {
          this.timer = "Time: " + time + " seconds";
        }
        //When time runs out, end the game.
        if (time < 0) {
          // endGame();
          this.timer = "Time: 0 seconds";
          clearInterval(interval);
        }
    }, 1000);
    //Flips through the questions, and ends the game if there are no more questions.
    // if (this.sequence < this.questions.length) {
    //   loadQuestion();
    // } else {
    //   // endGame();
    //   console.log('done');
    // }
  } 
}
