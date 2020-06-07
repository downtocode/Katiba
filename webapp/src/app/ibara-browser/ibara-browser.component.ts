import { Component, OnInit } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import { CurrentIbara } from '../models/pageviewer.model';
import { Observable, of } from 'rxjs';
import { select } from '@ngrx/store';

@Component({
	selector: 'app-ibara-browser',
	templateUrl: './ibara-browser.component.html',
	styleUrls: ['./ibara-browser.component.css']
})

export class IbaraBrowserComponent implements OnInit {
	
	currentIbaras$: Observable<CurrentIbara[]>;

	constructor(private actions$: Actions) { }

	ngOnInit(): void {
	}

	@Effect({dispatch: false})
	loadCurrentIbaras = this.actions$.pipe(
		ofType('[PageViewer] Loaded'),
		select((action: {pageNum: string, currentIbaras: CurrentIbara[]}) => {
			console.log(action)
			return action.currentIbaras;
		})
	);
	
}
