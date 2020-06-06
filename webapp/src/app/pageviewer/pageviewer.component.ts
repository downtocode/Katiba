import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MarkdownService } from 'ngx-markdown';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-pageviewer',
	templateUrl: './pageviewer.component.html',
	styleUrls: ['./pageviewer.component.css']
})
export class PageviewerComponent implements OnInit {
	
	constructor(private route: ActivatedRoute, private markdownService: MarkdownService) { }

	markdown: string;
	currentIbaras: { href: string, displayText: string }[];
	currentPage: string;

	@Output()
	pageViewerLoaded = new EventEmitter();
	
	ngOnInit(): void {
		this.currentPage = this.route.snapshot.params['page'];
		this.markdownService.renderer.heading = (text: string, level: number) => {
			let escapedText = text.toLowerCase().replace(/[^a-zA-Z]+/g, '-');
			if (escapedText[0] === '-') {
				escapedText = escapedText.replace('-', '');
			}
			let h1Style = "";
			if (level === 1) {
				h1Style = "sura-header"
			}
			return '<h' + level + ' id="' + escapedText + (h1Style.length > 0 ? ('" class="' + h1Style + '">') : '">') +
					text +
					'<a href="pages/' + this.currentPage + '#' + escapedText + '">' +
					'<span class="header-link"><i class="material-icons">link</i></span>' +
					'</a>' +
					'</h' + level + '>';
		};
		this.route.paramMap.subscribe(params => {
			let page = params.get('page');
			switch (page) {
				case '0-utangulizi':
					this.markdown = require('raw-loader!../../../markdown/0-utangulizi.md').default;
					break;
				case '01':
					this.markdown = require('raw-loader!../../../markdown/01.md').default;
					console.log(this.markdownService.compile('../../../markdown/01.md'));
					break;
				case '02':
					this.markdown = require('raw-loader!../../../markdown/02.md').default;
					break;
				case '03':
					this.markdown = require('raw-loader!../../../markdown/03.md').default;
					break;
				case '04':
					this.markdown = require('raw-loader!../../../markdown/04.md').default;
					break;
				case '05':
					this.markdown = require('raw-loader!../../../markdown/05.md').default;
					break;
				case '06':
					this.markdown = require('raw-loader!../../../markdown/06.md').default;
					break;
				case '07':
					this.markdown = require('raw-loader!../../../markdown/07.md').default;
					break;
				case '08':
					this.markdown = require('raw-loader!../../../markdown/08.md').default;
					break;
				case '09':
					this.markdown = require('raw-loader!../../../markdown/09.md').default;
					break;
				case '10':
					this.markdown = require('raw-loader!../../../markdown/10.md').default;
					break;
				case '101':
					this.markdown = require('raw-loader!../../../markdown/11.md').default;
					break;
				case '102':
					this.markdown = require('raw-loader!../../../markdown/12.md').default;
					break;
				case '103':
					this.markdown = require('raw-loader!../../../markdown/13.md').default;
					break;
				case '104':
					this.markdown = require('raw-loader!../../../markdown/14.md').default;
					break;
				case '105':
					this.markdown = require('raw-loader!../../../markdown/15.md').default;
					break;
				case '106':
					this.markdown = require('raw-loader!../../../markdown/16.md').default;
					break;
				case '107':
					this.markdown = require('raw-loader!../../../markdown/17.md').default;
					break;
				case '108':
					this.markdown = require('raw-loader!../../../markdown/18.md').default;
					break;
				case '109':
					this.markdown = require('raw-loader!../../../markdown/19.md').default;
					break;
				default:
					break;
			}
			this.collectAllIbaras(page);
		});
	}
	
	private collectAllIbaras(page: string) {
		let regex = /^[#]{1,3}[\w\. ]+$/gm
		let matches = this.markdown.match(regex);
		this.currentIbaras = [];
		matches.forEach(match => {
			this.currentIbaras.push(this.getIbaraLiElement(page, match));
		});
		this.pageViewerLoaded.emit(this.currentIbaras);
	}

	private getIbaraLiElement(page: string, regexMatch: string): {href: string, displayText: string} {
		let href = regexMatch.toLowerCase().replace(/[^a-zA-Z]+/g, '-');
		if (href[0] === '-') {
			href = href.replace('-', '');
		}
		href = "pages/" + page + "#" + href;

		// Find the display text by stripping out ###s and number
		let displayText = regexMatch.replace(/[#]+ [\d. ]*/g, '');

		return {href: href, displayText: displayText};
	}
}
