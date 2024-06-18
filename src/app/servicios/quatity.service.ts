import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class QuatityService {
  private quantitySubject = new BehaviorSubject<number>(0);
  quantity$ = this.quantitySubject.asObservable();

  updateQuantity(newQuantity: number) {
    this.quantitySubject.next(newQuantity);
  }

  resetQuantity() {
    this.quantitySubject.next(0);
  }

  get currentQuantity() {
    return this.quantitySubject.value;
  }
}