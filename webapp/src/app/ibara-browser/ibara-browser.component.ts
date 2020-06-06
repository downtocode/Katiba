import { Component, OnInit, Input, HostListener } from '@angular/core';
declare var $:any

@Component({
	selector: 'app-ibara-browser',
	templateUrl: './ibara-browser.component.html',
	styleUrls: ['./ibara-browser.component.css']
})
export class IbaraBrowserComponent implements OnInit {
	
	currentIbaras: { href: string, displayText: string }[];

	constructor() { }

	ngOnInit(): void {
		let h3 = $("h3");
		console.log(h3);
		addEventListener('pageViewerLoaded', function(evt) {
			console.log(evt)
		})
	}

	@HostListener('document:pageViewerLoaded', ['$event'])
	handleLoaded(evt: any) {
		console.log(evt);
	}
	
}
