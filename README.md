# **Angular Firebase Sortable Table**

## **What is Angular Firebase Sortable Table (AFST)?**

**AFST** is Angular module giving a solution for common problem - creation a table with firebase as a backend. 
It was decided to avoid using third part services as 
[firebase cloud functions](https://firebase.google.com/docs/functions/) or writing own
observer servers using [node](https://nodejs.org/en/). Before you start it is strongly recommended to read an 
[this](https://firebase.google.com/docs/database/web/lists-of-data#sorting_and_filtering_data) article.

## Getting started
**AFST** is supplied with [small demo](https://ngfb-sortable-table-demo.firebaseapp.com/) ([source](./demo/src)) 
that shows abilities of sortable table and the way one will use it. In order to start demo locally run `npm run demo`.

Note: npm package is not suplied with demo source code, so visit 
[github page](https://github.com/NodeArt/Angular-Firebase-Sortable-Table) to see it.

## List of components:
For full documentation of each component please visit [this page]().

Sources:
- [`SortableTableComponent`](./src/components/sortable_table/)
- [`LoadingComponent`](./src/components/loading/)
- [`SortableTableService`](./src/services/sortable-table.service.ts)
- [`SortableItemDirective`](./src/directives/sortable-item.directive.ts)
- [`DialogDirective`](./src/directives/dialog.directive.ts)
- [`InfiniteScrollDirective`](./src/directives/infinite-scroll.directive.ts)
- [`PriorityKeysPipe`](./src/pipes/priority-keys.pipe.ts)

## Install:

`npm install @nodeart/ngfb_sortable_table --save`

## Description:
Module is supplied with set of features that could be useful while working with tables such as
search, sort, filter and infinite scroll.
Due to limitations of firebase querying there are no complicated logic under the hood.
According to firebase documentation one can use only one `orderBy` query at a time, so, unfortunately you can not
combine filters.
 
## Events table:

There are **4** types of events could happen. Each of them has its own querying rules and
usage restrictions.

|Events |InfiniteScroll | SortByHeader | FilterByInput |  FilterBySelect |
|:-----:|:-------------:|:------------:|:-------------:|:---------------:|
|**Reset previous query**|`false`| `true` |`true`   |`true`|
|**Basic query**| `{orderByKey: true}`| `{limitTo(First/Last): number, orderByChild: field}` | `{orderByKey: true}` |`orderByChild: field`|
|**Priority**| medium | low | low | high |

## Events details: 
- **InfiniteScroll:**

   InfiniteScroll is a default event. First request to database will be done with it if no config for `FilterBySelect`
   provided. It is **the only** event that doesn't reset previous query, only add the offset.
   Fires when user is reached the bottom of the page.
   
   Requirements:
    - `@Input pagination` is passed;
   
- **SortByHeader:**

   SortByHeader is an event that happen after toggling the arrow button on `sortable` header items.
   
   Restrictions:
    - field to be sorted by has primitive value;
    - field to be sorted by is not nested inside the object;
  
   Resets other queries.
   
- **FilterByInput:**

   FilterByInput is an event happen when user input some data in a search string. Input is debounced by default.
   
   Restrictions:
    - field to be filtered by is a string;
    - field to be sorted by is not nested inside the object;
    
   Requirements:
    - `@Input filterByInputValue` is passed in;
   
   Resets other queries.
- **FilterBySelect:**

   FilterBySelect event has the greatest priority value. If it is passed in than the first request to database will be 
   made by the rules of this event. 
   
   Restrictions:
    - field to be filtered by has primitive value;
    - field to be filtered by is not nested inside the object;
    
   Requirements:
    - `@Input filterBySelect` is passed in;
   
   Resets other queries.
   
## User components communication:

**AFST** is designed for following components structure:

```angular2html
<user-table-container-component>
    <ngfb-sortable-table>
        <!--<ng-template ngfbSortableItem></ng-template>-->
        <tr UserTableItemComponent> </tr>
    </ngfb-sortable-table>
</user-table-container-component>
```
According to this structure you can not directly communicate between your components.
In order to do so, you can provide an `@Input onChange: Function` to `SortableTableComponent` and it will be
called in two cases:
- Popup with [`@Input addNew: Component`](./demo/src/app/table-container/table-container.component.html) 
(passed to `SortableTableComponent`) close. [Example](./demo/src/app/new-person)
- User emits event from `UserTableItemComponent`. [Example](./demo/src/app/employer-item).

Do not forget to bind your `onChange` function to your component context in order to save it. 
   
## Usage tips:
 
- To improve firebase query performance use `.indexOn` [rule](https://firebase.google.com/docs/database/security/indexing-data)
in your database rules.
- The selector of `TableItemComponent` that you pass inside `SortableTableComponent` must be attributive in
order to be properly displayed. Example: `tr [sortableTableItem]`.
- To sort your headers use `PriorityKeysPipe` and pass **enum** with a list of headers as an argument and the list 
of headers you'd prefer not to show.
- Always bind `setHeaders` function to your container component context [(see basic usage)]((./docs/basic_usage.md)) if you
use `this` keyword in this function.
As child component doesn't not know who his parent actually is, we can't use [`forward ref`](http://stackoverflow.com/a/35154016)
to done this.
- As Angular 4 is released and `<template></template>` element is deprecated and will be replaced with `<ng-template></ng-template>`.
We use `<ng-template></ng-template>` so this module is incompatible with Angular 2.
 
   
## List of dependencies:
- [@angular/material](https://material.angular.io)
- [firebase](https://firebase.google.com)
- [lodash.debounce](https://www.npmjs.com/package/lodash.debounce)