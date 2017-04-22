import { Directive, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * Emits event when user scrolled table to the end
 */

@Directive({
  selector: '[ngfbInfiniteScroll]'
})
export class InfiniteScrollDirective {
  @Input() private debounce: number = 500;
  @Output() private scrolled: EventEmitter<Event> = new EventEmitter();
  constructor(elem: ElementRef) {
    const native = elem.nativeElement;
    Observable
        .fromEvent(native, 'scroll')
        .debounceTime(this.debounce)
        .distinctUntilChanged()
        .filter(() => native.scrollTop + native.offsetHeight >= native.scrollHeight)
        .subscribe(event => this.scrolled.emit(event as Event));
  }
}
