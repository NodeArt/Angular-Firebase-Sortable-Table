import { InjectionToken, EventEmitter } from '@angular/core';
import { EventConfig } from '../../index';

export const NgFbSortableTableEventsService = new InjectionToken<EventEmitter<EventConfig>>('NgFbSortableTableEventsService');
export const diValue = new EventEmitter();
