/** @jsx m */
/**
 * Video preview panel
 *
 * :TODO: selectable video source
 *
 * @package	Let Me See
 * @author	Sam Pospischil <pospi@spadgos.com>
 * @since	2015-01-28
 */

(function(ui, globals, models, m) {

function Controller()
{
	var self = this;

	this.webcam = m.prop(null);

	models.Webcam().then(function(webcam) {
		m.startComputation();
		self.webcam(webcam);
		m.endComputation();
	}, function(e) {
		console.error('sad times!', e);	// :TODO:
	});
}

function configAudio(el, inited, context)
{
	this.webcam().setEcho(models.Playback.echoAudio());
}

ui.VideoPanel = {
	controller : Controller,

	view : function(ctrl)
	{
console.log('panel redraw: video', ctrl);
		if (!ctrl.webcam()) {
			// :TODO: activation screen
			return;
		}
		return <section class={ "c--camera-preview" + (ctrl.webcam().mediaError() ? ' s--media-error' : '') } config={ configAudio.bind(ctrl) }>
			<video width="640" height="480" autoplay src={ ctrl.webcam().videoStreamSrc() }></video>
			{ /* <canvas width="640" height="480"></canvas> */ }
			<ul>
				<li onclick={ function() { models.Playback.echoAudio(!models.Playback.echoAudio()); } } class={ models.Playback.echoAudio() ? 's--echo-on' : '' }>Toggle audio playback</li>
			</ul>
		</section>;
	}
};

})(LetMeSee.UI, LetMeSee, LetMeSee.models, m);

