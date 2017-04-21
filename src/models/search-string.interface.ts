import {TableFilterOption} from "./table-filter-option.interface";

export interface SearchString {
    defaultField: string;
    inputPlaceholder?: string;
    selectPlaceholder?: string;
    fields: Array<TableFilterOption>;
}