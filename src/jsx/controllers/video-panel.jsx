/** @jsx m */
/**
 * Video preview panel
 *
 * @package	Let Me See
 * @author	Sam Pospischil <pospi@spadgos.com>
 * @since	2015-01-28
 */

(function(ui, globals, m) {

function Controller()
{

}

ui.VideoPanel = {
	controller : Controller,

	view : function(ctrl)
	{
		return <section class="camera-preview">
			<video id="video" width="640" height="480" autoplay></video>
			<canvas id="canvas" width="640" height="480"></canvas>
		</section>;
	}
};

})(LetMeSee.UI, LetMeSee, m);

