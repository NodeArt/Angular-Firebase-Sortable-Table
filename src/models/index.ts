import {FieldToQueryBy} from "./filter-to-query-by.interface";
export {Pagination} from "./pagination.interface";
export {HeaderItem} from "./header-item.interface";
export {SetHeadersFunction} from "./set-headers-funtion.interface";
export {SearchString} from "./search-string.interface";
export {TableFilter} from "./table-filter.interface";
export {TableItem} from "./table-item.interface";
export {TableFilterOption} from "./table-filter-option.interface";
export {FieldToQueryBy} from "./filter-to-query-by.interface";
export enum SortableEvents {
  InfiniteScroll = 1,
  SortByField,
  FilterBySearch,
  FilterBySelect
}

export interface DefaultSort {
  event: number,
  config: FieldToQueryBy
}