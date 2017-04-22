import { Pipe, PipeTransform } from '@angular/core';

/**
 * Used to help sort and filter data in headers
 */

@Pipe({
  name: 'ngfbPriorityKeysPipe'
})
export class PriorityKeysPipe implements PipeTransform {

  /**
   * Sort and filter data passed.
   * @param value
   * @param priorityEnum
   * @param notShowFields
   * @returns {string[]}
   */
  transform(value: Object, priorityEnum?: any, notShowFields? : Array<string>) : Array<string> {
    let res = Object.keys(value);
    if (priorityEnum) {
      res = res.sort((a, b) => priorityEnum[a] - priorityEnum[b]);
      if (notShowFields) {
        res = res.filter(key => notShowFields.indexOf(key) === -1);
      }
    }
    return res;
  }

}