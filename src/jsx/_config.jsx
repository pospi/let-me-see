/** @jsx m */
/**
 * Application configuration
 *
 * @package	Let Me See
 * @author	Sam Pospischil <pospi@spadgos.com>
 * @since	2015-01-27
 */

(function(ns, mixin) {

mixin(ns, {
	// If set, will force override the AutoProvider web3 transport type
	'force_websocket_uri' : null,	// 'ws://localhost:40404/eth' is the default for the Go websocket server when run locally i.e. `ethereum -ws -loglevel=4`
	'force_http_uri' : 'http://localhost:8080',		// 'http://localhost:8080' is the default for the Go http server
});

})(LetMeSee.config, LetMeSee.mixin);
