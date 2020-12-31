import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable()
export class UserService {
  isLoggedIn = false;

  @Output() change: EventEmitter<boolean> = new EventEmitter();

  toggle(result: boolean): void {
    this.isLoggedIn = result;
    this.change.emit(this.isLoggedIn);
  }
}
