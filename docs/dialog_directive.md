# Dialog Directive

### [Source](../src/)

## Description

The aim of this directive is to dynamically create components on click event.
Particular use case is to add some data to sortable table by creation a new item.

Note: Component that passed inside directive must be inside `entryComponents` list in your module.

## Usage
```html
<button color="primary"
        md-fab
        
        ngfbDialog
        (onDialogResult)="afterPopupClose()"
        [data]="someData"
        [disableClose]="true"
        [component]="SomeComponent">
```

## Inputs:

```typescript
    @Input() public data: any;
    @Input() public component: Component;
    @Input() public disableClose: boolean = false;
```

## Outputs:
```typescript
    @Output() public onDialogResult = new EventEmitter<any>();
```
