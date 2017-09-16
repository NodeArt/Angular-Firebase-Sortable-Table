/**
 * Events that could happen in NGFBSortableTable process
 */

export enum Events {
    InfiniteScroll = 1,
    SortByField,
    FilterBySearch,
    FilterBySelect,
    DeleteItem,
    InsertItem,
    AddItem
}

export interface EventConfig {
    event: Events | string,
    data?: any
}
