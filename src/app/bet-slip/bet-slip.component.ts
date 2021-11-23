import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommunicatorService } from '../core/services/communicator/communicator.service';

@Component({
  selector: 'app-bet-slip',
  templateUrl: './bet-slip.component.html',
  styleUrls: ['./bet-slip.component.scss']
})
export class BetSlipComponent implements OnInit, OnDestroy {

  refreshListSubscription: Subscription;

  formulary: FormGroup;

  /** Array container of balls selected by the player. */
  allBetBalls = new Array(8);
  /** Quantity of balls selected to bet. */
  betBallsQuantity: number = 0;

  /** Flag to show warning message to select any ball */
  showWarningSelectBalls = false;
  /** Flag to show warning message to place a bet up to 5. */
  showWarningMinBet = false;
  /** Flag to show warning message to apply the bet previous to Place the bet. */
  showWarningPlaceBet = false;

  /** Total money of the bet. */
  total: number = 0;

  constructor(public communicatorService: CommunicatorService) {
    // Subscribe to update the balls selections
    this.refreshListSubscription = this.communicatorService.announcedRefreshList$.subscribe( updatedList => {
      this.allBetBalls = new Array(8);
      this.betBallsQuantity = updatedList.length;
      this.total = 0;
      updatedList.forEach((betBall, index) => this.allBetBalls[index] = betBall);
    })

    this.formulary = new FormGroup({
      'betQuantity': new FormControl(5, Validators.min(5))
    });
  }

  ngOnInit(): void {
  }

  /**
   * Event triggered when player apply/ok the bet.
   * Check if there are any selections or not.
   * Calculate the total of bet if all its correct.
   */
  applyBet() {
    const betQuantity = this.formulary.get('betQuantity')?.value;

    this.showWarningPlaceBet = false;
    if (this.betBallsQuantity === 0) {
      this.showWarningSelectBalls = true;
    } else {
      this.showWarningSelectBalls = false;
      if (betQuantity < environment.minimumBet) {
        this.showWarningMinBet = true;
      } else {
        this.showWarningMinBet = false;
        this.total = betQuantity * this.betBallsQuantity;
      }
    }
  }

  /**
   * Event triggered when player Place bet.
   * Announce the total money bet in this game.
   */
  onSubmit() {
    if (this.formulary.valid && this.total !== 0) {
      this.communicatorService.announcePlacedBet(this.total);
    }
    if (this.total === 0) {
      this.showWarningPlaceBet = true;
    }
  }

  ngOnDestroy(): void {
    this.refreshListSubscription.unsubscribe();
  }

}
