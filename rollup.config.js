export default {
	name: 'angular-svg-icon',
	external: [
		'@angular/common',
		'@angular/common/http',
		'@angular/core',
        'rxjs/add/observable/of',
        'rxjs/add/operator/do',
        'rxjs/add/operator/finally',
        'rxjs/add/operator/map',
        'rxjs/add/operator/takeUntil',
        'rxjs/add/operator/share',
        'rxjs/Observable',
        'rxjs/Subject',
	],
    globals: {
        '@angular/common': 'ng.common',
		'@angular/common/http': 'ng.common.http',
        '@angular/core': 'ng.core',
		'rxjs/add/observable/of' : 'Rx.Observable',
		'rxjs/add/operator/do' : 'Rx.Observable.prototype',
		'rxjs/add/operator/finally' : 'Rx.Observable.prototype',
		'rxjs/add/operator/map' : 'Rx.Observable.prototype',
		'rxjs/add/operator/takeUntil' : 'Rx.Observable.prototype',
		'rxjs/add/operator/share' : 'Rx.Observable.prototype',
		'rxjs/Observable' : 'Rx',
		'rxjs/Subject' : 'Rx',
    },
	onwarn: ( warning ) => {
		const skip_codes = [
			'THIS_IS_UNDEFINED',
			'MISSING_GLOBAL_NAME'
		];
		if ( skip_codes.indexOf(warning.code) != -1 )
			return;
		console.error(warning);
	},
	output: {
		format: 'umd'
	}
};

