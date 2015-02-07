/** @jsx m */
/**
 * Webcam input source wrapper
 *
 * @package	Let Me See
 * @author	Sam Pospischil <pospi@spadgos.com>
 * @since	2015-01-31
 */

(function(models, globals, m, Promise) {

function Webcam(resolve, reject)
{
	var self = this;

	// video data handles
	this.videoStream = function(val) {
		if (val === undefined) {
			return this._videoStream();
		}
		if (val) {
			if (window.URL.createObjectURL) {
				self.videoStreamSrc(window.URL.createObjectURL(val));
			} else if (window.webkitURL.createObjectURL) {
				self.videoStreamSrc(window.webkitURL.createObjectURL(val));
			}
			resolve(self);
		} else {
			self.videoStreamSrc(null);
		}
		return self._videoStream(val);
	};
	this._videoStream = m.prop(null);
	this.videoStreamSrc = m.prop(null);

	// audio data handles
	this.audioContext = m.prop(null);
	this.microphone = m.prop(null);
	this.volume = m.prop(null);

	// quality controls
	this.audioBufferSize = m.prop(2048);

	// error if any
	this.mediaError = function(val) {
		if (val) {
			reject(val);
		}
		return self._mediaError(val);
	};
	this._mediaError = m.prop(null);

	// internal variables
	this._echoingAudio = false;

	// init!
	this.initListeners();
}

globals.extend(Webcam,
{
	initListeners : function()
	{
		var self = this;

		var videoObj = { "video": true, "audio": true };

		// Grab video handle

		var getMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
		var AudioContext = window.AudioContext || window.webkitAudioContext;

		getMedia.call(navigator, videoObj, function(stream) {
console.log('H5: got stream', arguments);
			self.videoStream(stream);

			// Grab audio handle

			try {
				var audioContext = new AudioContext();
				var createProcessor = audioContext.createScriptProcessor || audioContext.createJavaScriptNode;

				var microphone = audioContext.createMediaStreamSource(stream);
				var volume = audioContext.createGain();
				var recorder = createProcessor.call(audioContext, self.audioBufferSize(), 1, 1);	// :TODO: read number of inputs from context?
console.log('H5: devices:', audioContext, microphone, recorder);
				microphone.connect(volume);
			} catch (e) {
				// :TODO: deeper logging
				console.error('Media init failure:', e);
				throw e;
			}

			self.audioContext(audioContext);
			self.microphone(microphone);
			self.volume(volume);
		}, this.mediaError);
	},

	setEcho : function(doEcho)
	{
		if (doEcho && !this._echoingAudio) {
console.log('H5: connect audio');
			this.volume().connect(this.audioContext().destination);
		} else if (!doEcho && this._echoingAudio) {
console.log('H5: disconnect audio');
			this.volume().disconnect();
		}
		this._echoingAudio = doEcho;
	},
});

var promise;

models.Webcam = function() {
	if (!promise) {
		promise = new Promise(function(resolve, reject) {
			new Webcam(resolve, reject);
		});
	}
	return promise;
};

})(LetMeSee.models, LetMeSee, m, Promise);
