import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  sortNumbers(numbers: Array<number>): Array<number> {
    return numbers.sort((a, b) => a - b );
  }
}
