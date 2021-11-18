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

  allBetBalls = new Array(8);
  betBallsQuantity: number = 0;

  showWarningSelectBalls = false;
  showWarningApplyBet = false;
  showWarningPlaceBet = false;

  total: number = 0;

  constructor(private communicatorService: CommunicatorService) {
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

  applyBet() {
    const betQuantity = this.formulary.get('betQuantity')?.value;

    this.showWarningPlaceBet = false;
    if (this.betBallsQuantity === 0) {
      this.showWarningSelectBalls = true;
    } else {
      this.showWarningSelectBalls = false;
      if (betQuantity < environment.minimumBet) {
        this.showWarningApplyBet = true;
      } else {
        this.showWarningApplyBet = false;
        this.total = betQuantity * this.betBallsQuantity;
      }
    }
  }

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
