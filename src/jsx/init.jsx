/**
 * Application bootstrap
 *
 * @package	Let Me See
 * @author	Sam Pospischil <pospi@spadgos.com>
 * @since	2015-01-27
 */

(function(exports, config) {
	// Ethereum API is not added to window object by default, need to call the faux-module system
	if (!exports.web3) {
		exports.web3 = require('web3');
	}

	// Configure transports
	if (config.force_http_uri) {
		web3.setProvider(new web3.providers.HttpSyncProvider(config.force_http_uri));
	} else if (config.force_websocket_uri) {
		web3.setProvider(new web3.providers.WebSocketProvider(config.force_websocket_uri));
	} else {
		web3.setProvider(new web3.providers.AutoProvider());
	}

	// Boot the application
	setTimeout(function() {
		m.module(document.getElementById('let-me-see'), LetMeSee.UI.App);
	}, 0);
})(window, LetMeSee.config);
