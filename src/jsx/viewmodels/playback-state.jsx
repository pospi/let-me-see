/** @jsx m */
/**
 * Playback controls state
 *
 * @package	Let Me See
 * @author	Sam Pospischil <pospi@spadgos.com>
 * @since	2015-01-31
 */

(function(models, globals, m) {

function PlaybackControls()
{
	this.echoAudio = m.prop(false);
}

models.Playback = new PlaybackControls();

})(LetMeSee.models, LetMeSee, m);
