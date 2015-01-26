'use strict';

var BROWSERSYNC_HOST_PROXY = "letmesee.localhost";

var tasks = {
	'watchfs' : [ 'watch' ],
	'default' : [
		'clean', 			// clear temp build files
		'less', 			// compile styles
		'uglify:vendor', 	// compile vendor scripts
		'msx:appjs', 'uglify:appjs', // compilie app scripts
		'browserSync:dev', 'watchfs',	 // monitor filesystem
	],
	'build' : [
		'clean', 'less', 'uglify:vendor', 'msx:appjs', 'uglify:appjs'
	],
};

var config = {
	init: false,
	clean : {
		vendor: [
			'assets/vendor.min.js',
			'assets/vendor.min.js.map',
		],
		appjs: [
			'assets/app.min.js',
			'assets/app.min.js.map',
		],
		appcss: [
			'assets/app.min.css',
			'assets/app.min.css.map',
		],
		jsxcache: [
			'assets/temp/**/*.js',
			'assets/temp/**/*.jsx',
		],
	},
	less : {
		appcss: {
			options: {
				sourceMap: true,
				outputSourceFiles: false,
				sourceMapFilename: 'assets/app.min.css.map',
				sourceMapRootpath: '/assets/',
				compress: true,
				cleancss: false,
			},
			files: {
				'assets/app.min.css': [
					'src/less/app.less',
				],
			},
		},
	},
	msx : {
		appjs : {
			files : [{
				expand: true,
				cwd: 'src',
				src: "**/*.jsx",
				dest: "assets/temp",
			}],
		},
	},
	uglify : {
		vendor: {
			options: {
				sourceMap: 'assets/vendor.min.js.map',
				sourceMapIncludeSources: false,
				beautify: true,     // ...for debugging
				mangle: false
			},
			files: {
				'assets/vendor.min.js': [
					'bower_components/mithril/mithril.js',
				],
			},
		},
		appjs: {
			options: {
				sourceMap: 'assets/app.min.js.map',
				sourceMapIncludeSources: false,
				beautify: true,     // ...for debugging
				mangle: false,
			},
			files: {
				'assets/app.min.js': [
					'assets/temp/**/*.jsx',
				]
			}
		}
	},
	browserSync : {
		dev: {
			bsFiles: {
				src: [
					'assets/app.min.css',
					'assets/vendor.min.js',
					'assets/app.min.js',
					'index.html',
				],
			},
			options: {
				proxy: BROWSERSYNC_HOST_PROXY,
				injectChanges: true,
				watchTask: true,
				browser: 'firefox',
			},
		},
	},
	watch : {
		less: {
			files: ['src/**/*.less'],
			tasks: ['less:appcss'],
		},
		appjs: {
			files: ['src/**/*.jsx'],
			tasks: ['clean:jsxcache', 'msx:appjs', 'uglify:appjs'],
		},
		vendor : {
			files : ['bower_components/**/*.js', 'bower_components/**/*.css', 'bower_components/**/*.less'],
			tasks: ['less:appcss', 'uglify:vendor'],
		},
	}
};

//----------------------------------------------------------------------------------------------------------------------

var path = require('path');

module.exports = function(grunt)
{
	require('load-grunt-tasks')(grunt);
	require('time-grunt')(grunt);

	for (var t in tasks) {
		grunt.registerTask(t, tasks[t]);
	}
	grunt.initConfig(config);

	grunt.loadNpmTasks('grunt-msx');
	grunt.loadNpmTasks('grunt-browser-sync');
	grunt.loadNpmTasks('grunt-contrib-watch');
};
