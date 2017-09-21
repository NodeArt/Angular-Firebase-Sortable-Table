import { InjectionToken } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { EventConfig } from '../../index';

export const NgFbSortableTableEventsService = new InjectionToken<Subject<EventConfig>>('NgFbSortableTableEventsService');
export const diValue = new Subject();
