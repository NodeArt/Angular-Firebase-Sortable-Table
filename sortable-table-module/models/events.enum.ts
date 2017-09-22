/**
 * Events that could happen in NGFBSortableTable process
 */
import { FieldToQueryBy } from './filter-to-query-by.interface';

export enum Events {
    InfiniteScroll = 1,
    SortByField,
    FilterBySearch,
    FilterBySelect,
    DeleteItem,
    InsertItem,
    AddItem,
    LoadingStarted,
    LoadingFinished
}

export interface EventConfig {
    event: Events | string,
    config?: FieldToQueryBy
}
