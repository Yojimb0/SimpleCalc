path = require 'path'

module.exports = (grunt) ->


	grunt.loadNpmTasks 'grunt'
	grunt.loadNpmTasks 'grunt-cli'
	grunt.loadNpmTasks 'grunt-contrib-watch'
	grunt.loadNpmTasks 'grunt-contrib-connect'

	grunt.loadNpmTasks 'grunt-contrib-jshint'
	grunt.loadNpmTasks 'grunt-contrib-uglify'

	grunt.loadNpmTasks 'grunt-contrib-sass'
	grunt.loadNpmTasks 'grunt-autoprefixer'
	
	grunt.loadNpmTasks 'grunt-manifest'
	


	grunt.initConfig
		watch:
			options:
				livereload: true
			sass:
				files: 'css_src/**/*.scss'
				tasks: ['sass', 'autoprefixer', 'manifest']
			html:
				files: ['*.html']
				tasks: ['manifest']
			javascript:
				files: 'js_src/*.js'
				tasks: ['jshint', 'uglify', 'manifest']

		connect:
			all:
				options:
					port: 9000
					hostname: 'localhost'

		jshint:
			options:
				debug: true
				globals:
						jQuery: true
						debugger: true
			all: ['js_src/*.js']

		uglify:
			dist:
				files:
					'js/main.js': ['js_src/main.js']

		sass:
			all:
				options:
					style: 'compact'
					sourcemap: false
				files:
					'css/style.css': 'css_src/main.scss'

		autoprefixer:
			all:
				options:
					map: true
				expand: true
				flatten: true
				src: 'css/*.css'
				dest: 'css/'

		manifest: 
			all: 
				options: 
					basePath: '../'
					cache: [
						'js/main.js',
						'css/style.css',
						'index.html',
						'favicon.png',
						'favicon.ico'
					]
					network: ['http://*', 'https://*']
					# fallback: ['/ /offline.html']
					preferOnline: false
					verbose: true
					timestamp: true
					hash: false
				src: ['./index.html', 'js/*.js', 'css/*.css']
				dest: 'manifest.appcache'
			
		




	grunt.registerTask 'default', ['sass', 'autoprefixer', 'jshint', 'uglify', 'manifest', 'connect', 'watch']







