import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FieldToQueryBy, Events } from '../models';
import { database } from 'firebase';

import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

/**
 * Service that provides querying under the hood of SortableTableComponent
 */

@Injectable()
export class NgFbSortableTableService {
    private query: Object = {
        orderByKey: true
    };
    private lastKeyGot: string | undefined;
    private lastItemGot: Object;
    private lastSort: FieldToQueryBy | null;
    private pagination: number;
    public lastEventHappened: number;

    private DB: database.Database = database();

    set databaseInstance(databaseInstance: database.Database) {
        this.DB = databaseInstance;
    }

    /**
     * Changes the direction of limit
     * @param first
     * @param number
     */
    public setLimit(first, number) {
        this.query[first ? 'limitToFirst' : 'limitToLast'] = Number(number);
    }

    /**
     * Changes pagination number
     * @param pagination
     */
    public setPagination(pagination: number): void {
        this.pagination = pagination;
    }

    /**
     * Add ability to transform native firebase querying that uses chaining to object passing like in
     * [Angularfire](https://github.com/angular/angularfire2)
     * @param ref
     * @returns {database.Reference}
     */
    private querify(ref: database.Reference): any {
        const keys = Object.keys(this.query);
        return keys.reduce((reference, key: string) =>
            key === 'orderByKey' || key === 'orderByPriority' ?
              reference[key]() :
              reference[key](this.query[key]),
          ref
        );
    }

    /**
     * Control querying before sending request. Handle all possible cases of querying.
     * @param event
     * @param fieldToQueryBy
     */
    private preGet(event?: number, fieldToQueryBy?: FieldToQueryBy) {
        const se = Events;
        switch (event) {
            case se.InfiniteScroll:
                // if there was no events, user just scrolled down;
                if (this.lastEventHappened === undefined) {
                    if (this.lastKeyGot) {
                        this.query['startAt'] = this.lastKeyGot
                    }
                    // if prev event was sorting by field
                } else if (this.lastEventHappened === se.SortByField) {
                    const query = Object.assign({}, this.query);

                    this.query = {
                        orderByChild: this.query['orderByChild'],
                    };

                    if (this.pagination) {
                        this.setLimit(query.hasOwnProperty('limitToFirst'), this.pagination += this.pagination)
                    }
                    // else if last was an other events
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
                    endAt: fieldToQueryBy.value + '\uf8ff',
                    orderByChild: fieldToQueryBy.field
                };
                if (this.pagination) {
                    this.setLimit(true, this.pagination);
                }
                break;
            case se.FilterBySelect:
                if (fieldToQueryBy.value === null) {
                    this.query = { orderByKey: true };
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
                this.query = { orderByKey: true };
                if (this.pagination) {
                    this.setLimit(true, this.pagination);
                }
                break;
        }
    }

    /**
     * Function that actually makes a request to database.
     * @param path
     * @param event
     * @param fieldToQueryBy
     */
    public get(path: string, event?: number, fieldToQueryBy?: FieldToQueryBy): Observable<any> {
        if (event !== this.lastEventHappened && event !== Events.InfiniteScroll) {
            this.lastItemGot = null;
            this.lastKeyGot = null;
        }
        const prevLastKey = this.lastKeyGot;
        this.preGet(event, fieldToQueryBy);
        return Observable
          .fromPromise(this.querify(this.DB['ref'](path)).once('value') as Promise<any>)
          .map((snapshot: database.DataSnapshot): Array<database.DataSnapshot> => {
              let refs: Array<database.DataSnapshot> = [];
              snapshot.forEach((childRef: database.DataSnapshot) => {
                  refs.push(childRef);
                  return false;
              });
              const lastObj = refs.slice(-1)[0];
              if (lastObj) {
                  this.lastItemGot = lastObj;
                  this.lastKeyGot = lastObj.key;
              }

              if (prevLastKey === this.lastKeyGot &&
                event === Events.InfiniteScroll &&
                this.lastEventHappened === undefined
              ) {
                  refs = []
              }
              return refs;
          })
          .map((refs: Array<database.DataSnapshot>): Array<database.DataSnapshot> => {
              if (
                (event === Events.SortByField && fieldToQueryBy.order === 'asc') ||
                (event === Events.InfiniteScroll &&
                this.lastSort &&
                this.lastSort.order &&
                this.lastSort.order === 'asc')
              ) {
                  return refs.reverse();
              } else if (event === Events.FilterBySearch) {
                  // FIXME: Suspect this is not needed.
                  return refs.filter(
                    elem => typeof elem[fieldToQueryBy.field] === 'string' ?
                      elem[fieldToQueryBy.field]
                        .toLowerCase()
                        .startsWith((fieldToQueryBy.value as string).toLowerCase()) : false
                  )
              }
              return refs;
          })
          .do(() => {
              if (event !== Events.InfiniteScroll) {
                  this.lastEventHappened = event;
              }
          })
    }
}
