/** @jsx m */
/**
 * Whisper baseline functionality test bits
 *
 * @package	Let Me See
 * @author	Sam Pospischil <pospi@spadgos.com>
 * @since	2015-01-26
 */

(function(ns, globals, m, web3, shh) {

var TEST_TOPIC = 'testwhisper';

function Controller()
{
	var ctrl = this;

	this.messagePayload = m.prop('test data gooo');
	this.textHistory = m.prop([]);

	var topicHandle, directHandle;

	// identify thyself randomly
	var identity = shh.newIdentity();

	console.log('New ident', identity);

	// open message channels
	topicHandle = shh.watch({
		"topic": [ web3.fromAscii(TEST_TOPIC) ],
	});
	directHandle = shh.watch({
		"topic": [ web3.fromAscii(TEST_TOPIC) ],
		"to": identity,
	});

	// watch for new messages
	topicHandle.arrived(function(msg) {
		console.log('New broadcast', msg);
		onNewMessage.call(ctrl, identity, msg, 'broadcast');
	});
	directHandle.arrived(function(msg) {
		console.log('New PM', msg);
		onNewMessage.call(ctrl, identity, msg, 'direct');
	});

	// read in any existing messages
	topicHandle.messages(function(msgs) {
		msgs.map(function(msg) {
			onNewMessage.call(ctrl, identity, msg, 'direct');
		});
	});
	directHandle.messages(function(msgs) {
		msgs.map(function(msg) {
			onNewMessage.call(ctrl, identity, msg, 'direct');
		});
	});

	this.identity = identity;
}

//------[ data event handlers ]-----------------------------------------------------------------------------------------

function onNewMessage(myId, msg, msgtype)
{
	m.startComputation();
	this.textHistory().push([myId, msg, msgtype]);
	m.endComputation();
}

//------[ user event handlers ]-----------------------------------------------------------------------------------------

function onSendMessage(e)
{
	var self = this;
	e.preventDefault();

	shh.post({
		"from": this.identity,
		"topic": [ web3.fromAscii(TEST_TOPIC) ],
		"payload": [ web3.fromAscii(self.messagePayload()) ],
		"ttl": 1000,
		"priority": 10000
	});
}

function onSendAnonMessage(e)
{
	var self = this;
	e.preventDefault();

	var anonymousSender = shh.newIdentity();

	shh.post({
		"from": anonymousSender,
		"to": this.identity,
		"topic": [ web3.fromAscii(TEST_TOPIC) ],
		"payload": [ web3.fromAscii(self.messagePayload()) ],
		"ttl": 1000,
		"priority": 10000
	});
}

//------[ view DOM ]----------------------------------------------------------------------------------------------------

ns['Test'] = {
	controller : Controller,

	view : function(ctrl)
	{
		return [
			<div>
				{ ctrl.textHistory().map(function(h) {
					var identity = h[0];
					var msg = h[1];
					var msgtype = h[2];
					return <p class={ "msg-" + msgtype + (msg.from == identity ? ' from-me' : '') }><span class="sender">{ msg.from }:</span> { web3.toAscii(msg.payload) }</p>;
				}) }
			</div>,
			<form>
				<textarea name="payload" value={ ctrl.messagePayload() } onchange={ m.withAttr('value', ctrl.messagePayload) }></textarea>
				<input type="submit" value="Send" onclick={ onSendMessage.bind(ctrl) } />
				<input type="submit" value="Send directly" onclick={ onSendAnonMessage.bind(ctrl) } />
			</form>
		];
	}
};

})(LetMeSee.UI, LetMeSee, m, web3, web3.shh);
