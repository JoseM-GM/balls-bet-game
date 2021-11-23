import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  /**
   * Sort an array of numbers.
   * @param numbers 
   * @returns 
   */
  sortNumbers(numbers: Array<number>): Array<number> {
    return numbers.sort((a, b) => a - b );
  }
}
