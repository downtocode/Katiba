import { Action, createReducer, on } from '@ngrx/store';
import * as PageViewerActions from '../actions/pageviewer.actions';
import { CurrentIbara } from '../models/pageviewer.model';

export interface State {
	currentIbaras: CurrentIbara[];
}

export const initialState: State = {
    currentIbaras: []
}

const pageViewerReducer = createReducer(
    initialState,
    on(PageViewerActions.loaded, state => ({...state, currentIbaras: state.currentIbaras}))
)

export function reducer(state: State | undefined, action: Action) {
    return pageViewerReducer(state, action);
}