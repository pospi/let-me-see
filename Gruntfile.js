'use strict';

var BROWSERSYNC_HOST_PROXY = "letmesee.localhost";

var ASSETS_PATH = 'assets/';
var SOURCE_PATH = 'src/';
var LIBS_PATH = 'bower_components/';
var NODE_MODULES = 'node_modules/';

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
			ASSETS_PATH + 'vendor.min.js',
			ASSETS_PATH + 'vendor.min.js.map',
		],
		appjs: [
			ASSETS_PATH + 'app.min.js',
			ASSETS_PATH + 'app.min.js.map',
		],
		appcss: [
			ASSETS_PATH + 'app.min.css',
			ASSETS_PATH + 'app.min.css.map',
		],
		jsxcache: [
			ASSETS_PATH + 'temp/**/*.js',
			ASSETS_PATH + 'temp/**/*.jsx',
		],
	},
	less : {
		appcss: {
			options: {
				sourceMap: true,
				outputSourceFiles: false,
				sourceMapFilename: ASSETS_PATH + 'app.min.css.map',
				sourceMapRootpath: '/' + ASSETS_PATH,
				compress: true,
				cleancss: false,
			},
			files: {
				'assets/app.min.css': [
					SOURCE_PATH + 'less/app.less',
				],
			},
		},
	},
	msx : {
		appjs : {
			files : [{
				expand: true,
				cwd: SOURCE_PATH,
				src: "**/*.jsx",
				dest: ASSETS_PATH + "temp",
			}],
		},
	},
	uglify : {
		vendor: {
			options: {
				sourceMap: ASSETS_PATH + 'vendor.min.js.map',
				sourceMapIncludeSources: false,
				beautify: true,     // ...for debugging
				mangle: false
			},
			files: {
				'assets/vendor.min.js': [
					SOURCE_PATH + 'bignumber.js',
					LIBS_PATH + 'mithril/mithril.js',
					NODE_MODULES + 'ethereum.js/dist/ethereum.js',
				],
			},
		},
		appjs: {
			options: {
				sourceMap: ASSETS_PATH + 'app.min.js.map',
				sourceMapIncludeSources: false,
				beautify: true,     // ...for debugging
				mangle: false,
			},
			files: {
				'assets/app.min.js': [
					ASSETS_PATH + 'temp/js/ioc-container.jsx',
					ASSETS_PATH + 'temp/js/globals.jsx',
					ASSETS_PATH + 'temp/js/_config.jsx',
					ASSETS_PATH + 'temp/js/init.jsx',
					ASSETS_PATH + 'temp/**/*.jsx',
				]
			}
		}
	},
	browserSync : {
		dev: {
			bsFiles: {
				src: [
					ASSETS_PATH + 'app.min.css',
					ASSETS_PATH + 'vendor.min.js',
					ASSETS_PATH + 'app.min.js',
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
			files: [SOURCE_PATH + '**/*.less'],
			tasks: ['less:appcss'],
		},
		appjs: {
			files: [SOURCE_PATH + '**/*.jsx'],
			tasks: ['clean:jsxcache', 'msx:appjs', 'uglify:appjs'],
		},
		vendor : {
			files : [LIBS_PATH + '**/*.js', LIBS_PATH + '**/*.css', LIBS_PATH + '**/*.less'],
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
