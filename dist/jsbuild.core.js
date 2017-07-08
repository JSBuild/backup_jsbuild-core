this.JSBuild = this.JSBuild || {};
this.JSBuild.Core = (function () {
	'use strict';

	/**
	 * Created by Jamey McElveen on 7/7/17.
	 */

	var merge = require('webpack-merge');

	/**
	 * Created by jameym on 7/7/17.
	 */

	var defaultConfig = {
	  webpack: {
	    // webpack options
	    // webpackMiddleware takes a Compiler object as first parameter
	    // which is returned by webpack(...) without callback.
	    entry: "...",
	    output: {
	      path: "/"
	      // no real path is required, just pass "/"
	      // but it will work with other paths too.
	    }
	  },
	  devServer: {
	    // publicPath is required, whereas all other options are optional

	    noInfo: false,
	    // display no info to console (only warnings and errors)

	    quiet: false,
	    // display nothing to the console

	    lazy: false,
	    // switch into lazy mode
	    // that means no watching, but recompilation on every request

	    watchOptions: {
	      aggregateTimeout: 300,
	      poll: true
	    },
	    // watch options (only lazy: false)

	    publicPath: "/assets/",
	    // public path to bind the middleware to
	    // use the same as in webpack

	    index: "index.html",
	    // the index path for web server

	    headers: {"X-Custom-Header": "yes"},
	    // custom headers

	    mimeTypes: {"text/html": ["phtml"]},
	    // Add custom mime/extension mappings
	    // https://github.com/broofa/node-mime#mimedefine
	    // https://github.com/webpack/webpack-dev-middleware/pull/150

	    stats: {
	      colors: true
	    },
	    // options for formating the statistics

	    reporter: null,
	    // Provide a custom reporter to change the way how logs are shown.

	    serverSideRender: false,
	    // Turn off the server-side rendering mode. See Server-Side Rendering part for more info.

	  }
	};

	/**
	 * Created by Jamey McElveen on 7/6/17.
	 */

	var Release = (function (BuildBase) {
		function Release () {
			BuildBase.apply(this, arguments);
		}if ( BuildBase ) Release.__proto__ = BuildBase;
		Release.prototype = Object.create( BuildBase && BuildBase.prototype );
		Release.prototype.constructor = Release;

		

		return Release;
	}(BuildBase));

	function debug (config) {
	  var mergedConfig = merge(defaultConfig, config || {});
	  app.use(webpackMiddleware(webpack(mergedConfig.webpack), mergedConfig));
	};

	/**
	 * Created by Jamey McElveen on 7/6/17.
	 */

	var main = {
	  release: Release, debug: debug
	};

	return main;

}());