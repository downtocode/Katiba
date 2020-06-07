import { createAction, props } from '@ngrx/store';
import { CurrentIbara } from '../models/pageviewer.model';

export const loaded = createAction(
    '[PageViewer] Loaded',
    props<{pageNum: string, currentIbaras: CurrentIbara[]}>()
);