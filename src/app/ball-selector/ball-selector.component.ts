import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommunicatorService } from '../core/services/communicator/communicator.service';
import { UtilsService } from '../core/services/utils/utils.service';

@Component({
  selector: 'app-ball-selector',
  templateUrl: './ball-selector.component.html',
  styleUrls: ['./ball-selector.component.scss']
})
export class BallSelectorComponent implements OnInit {

  placedBetSubscription: Subscription;

  ballsQuantity = environment.ballsQuantity;
  
  ballsList: Array<number> = [];
  ballsSelected: Array<number> = [];

  winnerBall: number | undefined;
  ballResult: boolean | undefined;
  
  constructor(
    private communicatorService: CommunicatorService,
    private utilsService: UtilsService
  ) {
    for (let index = 1; index <= this.ballsQuantity; index++) {
      this.ballsList[index-1] = index;
    }

    this.placedBetSubscription = this.communicatorService.announcedPlacedBet$.subscribe(flag => {
      this.winnerBall = Math.floor(Math.random() * 10) + 1;
      console.log('Bola ganadora', this.winnerBall);
      const foundBall = this.ballsSelected.findIndex( ball => ball === this.winnerBall);
      this.ballResult = foundBall === -1 ? false : true;
      console.log('Jugador gana?', this.ballResult ? 'Si' : 'No');
    })
  }

  ngOnInit(): void {
  }

  selection(ballNumberSelected: number) {
    if (this.ballsSelected.length < 8) {
      const alreadySelectedIndex = this.ballsSelected.findIndex( ball => ball === ballNumberSelected);
      if (alreadySelectedIndex === -1) {
        this.ballsSelected.push(ballNumberSelected);
        this.ballsSelected = this.utilsService.sortNumbers(this.ballsSelected);
        this.communicatorService.announceRefreshList(this.ballsSelected);
      }
    }
  }

  resetList() {
    this.ballsSelected = [];
    this.communicatorService.announceRefreshList(this.ballsSelected);
    this.winnerBall = undefined;
    this.ballResult = undefined;
  }

  ngOnDestroy(): void {
    this.placedBetSubscription.unsubscribe();
  }
}
