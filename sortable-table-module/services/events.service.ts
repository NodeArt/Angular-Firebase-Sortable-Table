import { InjectionToken } from '@angular/core';
import { Subject } from 'rxjs/Subject';

export const NgFbSortableTableEventsService = new InjectionToken<Subject<any>>('NgFbSortableTableEventsService');
export const diValue = new Subject();
