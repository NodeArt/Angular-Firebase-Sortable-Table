import {Directive, ViewContainerRef, ComponentFactoryResolver, Input, Component} from '@angular/core';

@Directive({
  selector: 'template [ngfbSortableItem]'
})
export class SortableItemDirective {
  @Input() public item: Object;
  @Input() set component(data: Component) {
    const factory = this.resolver.resolveComponentFactory(data as any);
    const instance = this.viewContainer.createComponent(factory, 0).instance;
    instance['item'] = this.item;
  }
  constructor(
      private viewContainer: ViewContainerRef,
      private resolver: ComponentFactoryResolver
  ) {}
}