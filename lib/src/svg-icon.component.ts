import { Component, ElementRef, Input, OnChanges, OnDestroy, OnInit,
	Renderer, SimpleChange } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { SvgIconRegistryService } from './svg-icon-registry.service';


@Component({
	selector: 'svg-icon',
	styles: [ ':host { display:inline-block; }' ],
	template: '<ng-content></ng-content>'
})

export class SvgIconComponent implements OnInit, OnDestroy, OnChanges {
	@Input() src:string;

	private icnSub:Subscription;

	constructor(private element:ElementRef, private renderer:Renderer,
		private iconReg:SvgIconRegistryService) {
	}

	ngOnInit() {
		this.init();
	}

	ngOnDestroy() {
		this.destroy();
	}

	ngOnChanges(changeRecord: {[key:string]:SimpleChange}) {
		if (changeRecord['src']) {
			this.destroy();
			this.init();
		}
	}

	private init() {
		this.icnSub = this.iconReg.loadSvg(this.src).subscribe(svg => {
			this.setSvg(svg);
		});
	}

	private destroy() {
		if (this.icnSub) {
			this.icnSub.unsubscribe();
		}
	}

	private setSvg(svg:SVGElement) {
		const icon = <SVGElement>svg.cloneNode(true);
		const elem = this.element.nativeElement;
		elem.innerHTML = '';
		this.renderer.projectNodes(elem, [icon]);
	}
}
