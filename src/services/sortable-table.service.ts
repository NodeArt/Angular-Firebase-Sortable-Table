import { Injectable } from '@angular/core';
import { Observable } from  'rxjs';
import { database } from 'firebase';
import { FieldToQueryBy } from '../models/sortable-table.model';

@Injectable()
export class SortableTableService {
  public DB: database.Database = database();
  public query : Object = {
    orderByKey: true
  };
  public lastKeyGot: string | undefined;
  public lastItemGot: Object;
  public lastEventHappened: number;
  public lastSort: FieldToQueryBy | null;
  public pagination: number;

  constructor() { }

  public setLimit(first, number) {
    this.query[first ? 'limitToFirst' : 'limitToLast'] = Number(number);
  }

  public setPagination(pagination: number): void {
    this.pagination = pagination;
  }

  public querify(ref: database.Reference): any {
    const keys = Object.keys(this.query);
    return keys.reduce((ref, key: string) =>
      key === 'orderByKey' || key === 'orderByPriority' ?
        ref[key]() :
        ref[key](this.query[key]),
      ref
    );
  }

  public preGet(event?: number, fieldToQueryBy?: FieldToQueryBy) {
    const se = SortableEvents;
    switch (event) {
        case se.InfiniteScroll:
          //if there was no events, user just scrolled down;
          if (this.lastEventHappened === undefined) {
              if (this.lastKeyGot) {
                  this.query['startAt'] = this.lastKeyGot
              }
          //if prev event was sorting by field
          } else if (this.lastEventHappened === se.SortByField) {
              const query = Object.assign({}, this.query);

              this.query = {
                  orderByChild: this.query['orderByChild'],
              };

              if (this.pagination) {
                  this.setLimit(query.hasOwnProperty('limitToFirst'), this.pagination += this.pagination)
              }
          //else if last was an other events
          } else if (this.lastEventHappened === se.FilterBySearch || this.lastEventHappened === se.FilterBySelect) {
              if (this.pagination) {
                  this.setLimit(true, this.pagination += this.pagination);
              }
          }
        break;
      case se.SortByField:
        this.lastSort = Object.assign({}, fieldToQueryBy);
        this.query = {
          orderByChild: fieldToQueryBy.field,
        };
        if (this.pagination) {
          this.setLimit(fieldToQueryBy.order === 'desc', this.pagination)
        }
        break;
      case se.FilterBySearch:
        this.lastSort = Object.assign({}, fieldToQueryBy);
        this.query = {
            startAt: fieldToQueryBy.value,
            endAt: fieldToQueryBy.value + "\uf8ff",
            orderByChild: fieldToQueryBy.field
        };
        if (this.pagination) {
          this.setLimit(true, this.pagination);
        }
        break;
      case se.FilterBySelect:
          if (fieldToQueryBy.value === null) {
              this.query = {
                  orderByKey: true
              }
          } else {
              this.query = {
                  orderByChild: fieldToQueryBy.field,
                  equalTo: fieldToQueryBy.value
              };
          }
        if (this.pagination) {
            this.setLimit(true, this.pagination);
        }
        break;
      default:
        this.query = {
            orderByKey: true
        };
        if (this.pagination) {
          this.setLimit(true, this.pagination);
        }
        break;
    }
  }

  public get(path: string, event?: number, fieldToQueryBy?: FieldToQueryBy) : Observable<any> {
    if (event !== this.lastEventHappened && event !== SortableEvents.InfiniteScroll) {
      this.lastItemGot = null;
      this.lastKeyGot = null;
    }

    const prevLastKey = this.lastKeyGot;

    this.preGet(event, fieldToQueryBy);
    return Observable.fromPromise(this.querify(this.DB['ref'](path)).once('value') as Promise<any>)
        .map((snapshot : database.DataSnapshot) => {
          let data = [];
          snapshot['forEach']((elem : database.DataSnapshot) => {
            const val = elem['val']();
            if (val) {
                Object.defineProperty(val, '$key', {
                    value: elem['key']
                });
                data.push(val);
            }
            return false;
          });
          const lastObj = data.slice(-1)[0];

          if (lastObj) {
              this.lastItemGot = lastObj;
              this.lastKeyGot = lastObj['$key'];
          }

          if (prevLastKey === this.lastKeyGot &&
              event === SortableEvents.InfiniteScroll &&
              this.lastEventHappened === undefined
          ) {
              data = [];
          }

          return ({key : snapshot['key'], value : data})
        })
        .map(({key, value} : {key : string, value: Array<any>}): any => {
          if (
              (event === SortableEvents.SortByField && fieldToQueryBy.order === 'desc') ||
              (event === SortableEvents.InfiniteScroll &&
              this.lastSort &&
              this.lastSort.order &&
              this.lastSort.order === 'desc')
          ) {
              value = value.reverse();
          //filter by input string
          } else if (event === SortableEvents.FilterBySearch) {
            value = value.filter(
                elem => typeof elem[fieldToQueryBy.field] === 'string' ?
                    elem[fieldToQueryBy.field]
                        .toLowerCase()
                        .startsWith((fieldToQueryBy.value as string)
                        .toLowerCase()) : false
            )
          }
          return ({key: key, value: value});
        })
        .do(() => {
          if (event !== SortableEvents.InfiniteScroll) {
            this.lastEventHappened = event;
          }
        })
  }
}

export enum SortableEvents {
  InfiniteScroll = 1,
  SortByField,
  FilterBySearch,
  FilterBySelect
}