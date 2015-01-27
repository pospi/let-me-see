/** @jsx m */
/**
 * Global methods
 *
 * @package	Let Me See
 * @author	Sam Pospischil <pospi@spadgos.com>
 * @since	2015-01-26
 */

(function(ns) {

ns['extend'] = function(fn, proto)
{
	for (var i in proto) {
		fn.prototype[i] = proto[i];
	}
};

ns['mixin'] = function(cls, methods)
{
	for (var i in methods) {
		cls[i] = methods[i];
	}
};

})(LetMeSee);
