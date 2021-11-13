import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CommunicatorService } from '../core/services/communicator/communicator.service';

@Component({
  selector: 'app-bet-slip',
  templateUrl: './bet-slip.component.html',
  styleUrls: ['./bet-slip.component.scss']
})
export class BetSlipComponent implements OnInit, OnDestroy {

  refreshListSubscription: Subscription;

  allBetBalls = new Array(8);
  betBallsQuantity: number = 0;

  total: number = 0;

  formulario: FormGroup;

  constructor(private communicatorService: CommunicatorService) {
    this.refreshListSubscription = this.communicatorService.announcedRefreshList$.subscribe( updatedList => {
      this.allBetBalls = new Array(8);
      this.betBallsQuantity = updatedList.length;
      updatedList.forEach((betBall, index) => this.allBetBalls[index] = betBall);
    })

    this.formulario = new FormGroup({
      'betQuantity': new FormControl(5, Validators.min(5))
    });
  }

  ngOnInit(): void {
  }

  applyBet() {
    this.total = this.formulario.get('betQuantity')?.value * this.betBallsQuantity;
  }

  onSubmit() {
    if (this.formulario.valid) {
      this.communicatorService.announcePlacedBet(true);
    }
  }

  ngOnDestroy(): void {
    this.refreshListSubscription.unsubscribe();
  }

}
