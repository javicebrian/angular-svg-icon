import { Injectable, Optional, SkipSelf } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';


@Injectable()
export class SvgIconRegistryService {

	private iconsByUrl = new Map<string, SVGElement>();
	private iconsLoadingByUrl = new Map<string, Observable<SVGElement>>();

	constructor(private http:HttpClient) {
	}

	loadSvg(url:string): Observable<SVGElement> {

		if (this.iconsByUrl.has(url)) {
			return Observable.of(this.iconsByUrl.get(url));
		} else if (this.iconsLoadingByUrl.has(url)) {
			return this.iconsLoadingByUrl.get(url);
		} else {
			const o = <Observable<SVGElement>> this.http.get(url, { responseType: 'text' })
				.map(svg => {
					const div = document.createElement('DIV');
					div.innerHTML = svg;
					return <SVGElement>div.querySelector('svg');
				})
				.do(svg => {
					this.iconsByUrl.set(url, svg);
				})
				.finally(() => {
					this.iconsLoadingByUrl.delete(url);
				})
				.share();

			this.iconsLoadingByUrl.set(url, o);
			return o;
		}
	}

	unloadSvg(url:string) {
		if (this.iconsByUrl.has(url)) {
			this.iconsByUrl.delete(url);
		}
	}

}

export function SVG_ICON_REGISTRY_PROVIDER_FACTORY(parentRegistry:SvgIconRegistryService, http:HttpClient) {
	return parentRegistry || new SvgIconRegistryService(http);
}

export const SVG_ICON_REGISTRY_PROVIDER = {
	provide: SvgIconRegistryService,
	deps: [ [new Optional(), new SkipSelf(), SvgIconRegistryService], HttpClient ],
	useFactory: SVG_ICON_REGISTRY_PROVIDER_FACTORY
};
