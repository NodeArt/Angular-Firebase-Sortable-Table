import { Directive, ViewContainerRef, ComponentFactoryResolver, Input, Output, Component, EventEmitter} from '@angular/core';
import { database } from 'firebase';

@Directive({
  selector: '[ngfbSortableContent]'
})
export class SortableContentDirective {
  @Input() private index?: number;
  @Input() private ref?: database.DataSnapshot;
  @Input() set component(data: Component) {
    const factory = this.resolver.resolveComponentFactory(data as any);
    const instance = this.viewContainer.createComponent(factory, 0).instance;
    if (this.index) instance['index'] = this.index;
    if (this.ref) instance['ref'] = this.ref;
  }
  constructor(private viewContainer: ViewContainerRef, private resolver: ComponentFactoryResolver) {}
}