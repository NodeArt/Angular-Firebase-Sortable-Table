import { TableFilterOption } from './table-filter-option.interface';

export interface TableFilter {
    field: string;
    defaultOption: string | number | boolean;
    resetTo: string | number | boolean;
    placeholder?: string;
    options: Array<TableFilterOption>;
}
