import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicatorService {

  constructor() { }

  private announcedRefreshList = new Subject<Array<number>>();
  private announcedPlacedBet = new Subject<boolean>();

  announcedRefreshList$ = this.announcedRefreshList.asObservable();
  announcedPlacedBet$ = this.announcedPlacedBet.asObservable();

  /**
   * Report the updated list of balls bet.
   * @param betList Balls bet list.
   */
  announceRefreshList(betList: Array<number>) {
    this.announcedRefreshList.next(betList);
  }

  /**
   * Report the placed bet.
   * @param placed Placed bet flag.
   */
  announcePlacedBet(placed: boolean) {
    this.announcedPlacedBet.next(placed);
  }
}
