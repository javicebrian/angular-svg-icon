import { Component, ElementRef, Input, OnChanges, OnDestroy, SimpleChange } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

import { SvgIconRegistryService } from './svg-icon-registry.service';

@Component({
	selector: 'svg-icon',
	styles: [ ':host { display:inline-block; }' ],
	template: '<ng-content></ng-content>'
})
export class SvgIconComponent implements OnChanges, OnDestroy {
	@Input() src:string;

	private ngUnsubscribe:Subject<void> = new Subject<void>();

	constructor(private element:ElementRef, private iconReg:SvgIconRegistryService) {
	}

	ngOnDestroy() {
		// Clean-up subscriptions.
		this.ngUnsubscribe.next();
		this.ngUnsubscribe.complete();
	}

	ngOnChanges(changeRecord: {[key:string]:SimpleChange}) {
		if (changeRecord['src']) {
			this.fetch();
		}
	}

	private fetch() {
		this.iconReg.loadSvg(this.src)
			.takeUntil(this.ngUnsubscribe)
			.subscribe(svg => {
				this.setSvg(svg);
			});
	}

	private setSvg(svg:SVGElement) {
		const icon = <SVGElement>svg.cloneNode(true);
		this.element.nativeElement.innerHTML = '';
		this.element.nativeElement.append(icon);
	}
}
