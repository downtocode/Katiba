import {
	ActionReducer,
	ActionReducerMap,
	createFeatureSelector,
	createSelector,
	MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { CurrentIbara } from '../models/pageviewer.model';
import * as pageViewerReducer from './pageviewer.reducer';


export interface State {
	currentIbaras: pageViewerReducer.State
}

export const reducers: ActionReducerMap<State> = {
	currentIbaras: pageViewerReducer.reducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
