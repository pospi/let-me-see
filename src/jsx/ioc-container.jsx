/** @jsx m */
/**
 * The simplest IoC container ever - somewhere to put dependencies
 * during init until Mithril is ready to boot the application
 *
 * @package	Let Me See
 * @author	Sam Pospischil <pospi@spadgos.com>
 * @since	2015-01-27
 */

// Init the application DI container
var LetMeSee = {
	config : {},
	UI : {},
	models : {},
};
