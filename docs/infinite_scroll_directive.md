# Infinite Scroll Directive

### [Source](../src/)

## Description:

According to name, this directive is aimed to emit events, when user scrolled page to bottom.
`InfiniteScroll` event is bind to this directive and triggers data fetching only when user scrolled down.

## Usage
```html
<main class="container" appInfiniteScroll (scrolled)="onInfinite()">
```

## Inputs:

```typescript
  @Input() private debounce: number = 400;
  
```

## Outputs:
```typescript
  @Output() private scrolled: EventEmitter<Event> = new EventEmitter();
```
