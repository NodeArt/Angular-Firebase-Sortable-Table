# **Angular 2+ Firebase Sortable Table**

## **What is Angular 2+ Firebase Sortable Table (AFT)?**

**AFT** is A2+ module giving a solution for common problem - creation a table with firebase as a backend. 
It was decided to avoid using third part services as 
[firebase cloud functions](https://firebase.google.com/docs/functions/) or writing own
observer servers using [node](https://nodejs.org/en/). Before you start it is strongly recommended to read an 
[this](https://firebase.google.com/docs/database/web/lists-of-data#sorting_and_filtering_data) article.

## List of components:

- [`SortableTableComponent`]() [doc](./docs/sortable_table_component.md)
- [`SortableTableService`]() [doc](./docs/sortable_table_service.md)
- [`SortableItemDirective`]() [doc](./docs/sortable_item_directive.md)
- [`DialogDirective`]() [doc](./docs/dialog_directive.md)
- [`InfiniteScrollDirective`]() [doc](./docs/infinite_scroll_directive.md)
- [`PriorityKeysPipe`]() [doc](./docs/priority_keys_pipe.md)

## Install:

`npm install @nodeart/ngfb-sortable-table --save`

## Description:
Module is supplied with set of features that could be useful while working with tables such as
search, sort, filter and infinite scroll.
Due to limitations of firebase querying there are no complicated logic under the hood.
According to firebase documentation one can use only one `orderBy` query at a time.

## [Basic Usage](./docs/basic_usage.md)
 
## Events table:

There are **4** types of events could have happen. Each of them has its own querying rules and
usage restrictions.

|Events |InfiniteScroll | SortByHeader | FilterByInput |  FilterBySelect |
|:-----:|:-------------:|:------------:|:-------------:|:---------------:|
|**Reset previous query**|`false`| `true` |`true`   |`true`|
|**Basic query**| `{orderByKey: true}`| `{limitTo(First/Last): number, orderByChild: field}` | `{orderByKey: true}` |`orderByChild: field`|
|**Priority**| 1 | 0 | 0 | 2 |

## Events details: 
- **InfiniteScroll:**

   InfiniteScroll is a default event and first request to database will be done with it if no config for `FilterBySelect`
   provided; It is **the only** event that doesn't reset previous query, only add the offset. 
   Fires when user is reached the bottom of the page.
   
   Restrictions:
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
    - `@Input filterByInputValue` is passed in;
   
   Resets other queries.
- **FilterBySelect:**

   FilterBySelect event has the greatest priority value. If it is passed in than the first request to database will be 
   made by the rules of this event. 
   
   Restrictions:
    - field to be filtered by has primitive value;
    - field to be filtered by is not nested inside the object;
    - `@Input filterBySelect` is passed in;
   
   Resets other queries.
   
## List of dependencies:
- [@angular/material](https://material.angular.io)
- [firebase](https://firebase.google.com)
- [lodash.debounce](https://www.npmjs.com/package/lodash.debounce)