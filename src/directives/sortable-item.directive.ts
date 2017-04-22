import {Directive, ViewContainerRef, ComponentFactoryResolver, Input, Output, Component, EventEmitter} from '@angular/core';

/**
 * Creates TableItemComponent provided by user
 */

@Directive({
  selector: '[ngfbSortableItem]'
})
export class SortableItemDirective {
  @Input() public item: Object;
  @Input() public index: number;
  @Output() itemChange: EventEmitter<any> = new EventEmitter<any>();
  @Input() set component(data: Component) {
    const factory = this.resolver.resolveComponentFactory(data as any);
    const instance = this.viewContainer.createComponent(factory, 0).instance;
    instance['item'] = this.item;
    instance['index'] = this.index;
    if (instance['onItemChange']) {
      instance['onItemChange'].subscribe(value => this.itemChange.emit(value));
    }
  }
  constructor(
      private viewContainer: ViewContainerRef,
      private resolver: ComponentFactoryResolver
  ) {}
}