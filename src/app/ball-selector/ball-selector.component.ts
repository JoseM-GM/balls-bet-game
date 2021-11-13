import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ball-selector',
  templateUrl: './ball-selector.component.html',
  styleUrls: ['./ball-selector.component.scss']
})
export class BallSelectorComponent implements OnInit {

  ballsSelected: Array<Number> = [];
  
  constructor() { }

  ngOnInit(): void {
  }

  selection(ballNumberSelected: Number) {
    const alreadySelectedIndex = this.ballsSelected.findIndex( ball => ball === ballNumberSelected);
    if (alreadySelectedIndex === -1) {
      this.ballsSelected.push(ballNumberSelected);
    }
    console.log('Listado seleccion: ', this.ballsSelected)
  }
}
