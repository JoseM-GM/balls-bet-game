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

  /** Default value of quantity of balls to play with. */
  ballsQuantity = environment.ballsQuantity;
  
  /** Array container of all balls. */
  lotteryDrum: Array<number> = [];
  /** Array container of balls selected by the player. */
  ballsSelected: Array<number> = [];

  /** Winner ball number generated randomly. */
  winnerBall: number | undefined;
  /** Flag that indicates that player won the bet or not. */
  ballResult: boolean | undefined;

  /** Total money if player won the bet. */
  moneyWon = 0;
  
  constructor(
    private communicatorService: CommunicatorService,
    private utilsService: UtilsService
  ) {
    // Initialize lottery drum balls
    for (let index = 1; index <= this.ballsQuantity; index++) {
      this.lotteryDrum[index-1] = index;
    }

    // Subscribe to the bet placed by the user. Generates the winner random ball, check if player won and money.
    this.placedBetSubscription = this.communicatorService.announcedPlacedBet$.subscribe(totalBet => {
      this.winnerBall = Math.floor(Math.random() * 10) + 1;
      const foundBall = this.ballsSelected.findIndex( ball => ball === this.winnerBall);
      this.ballResult = foundBall === -1 ? false : true;
      this.moneyWon = totalBet * environment.winningBetMultiply;
    })
  }

  ngOnInit(): void {
  }

  /**
   * Event triggered when player select a ball.
   * Updated balls selected are announced to be showed in another part of app (bet-slip)
   * @param ballNumberSelected Ball number.
   */
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

  /**
   * Event triggered when player clear the selection.
   */
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
