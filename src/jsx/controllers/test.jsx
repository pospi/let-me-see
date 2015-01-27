/** @jsx m */
/**
 * Whisper baseline functionality test bits
 *
 * @package	Let Me See
 * @author	Sam Pospischil <pospi@spadgos.com>
 * @since	2015-01-26
 */

(function(ns, globals, m, web3, shh) {

var TEST_TOPIC = 'test whisper';

function Controller()
{
	this.messagePayload = m.prop('test data gooo');
}

function onSendMessage(e)
{
	e.preventDefault();

	var identity = shh.newIdentity();
	if (!shh.haveIdentity(identity)) {
		console.error('oh gnoes identity fail');
	}

console.log('New ident', identity);

	this.topicHandle = shh.watch({
		"filter": [ web3.fromAscii(TEST_TOPIC) ],
		// "to": identity,
	});
	this.topicHandle.arrived(function(msg) {
		console.log('New message', msg, msg.from == identity);
	});


	var identity2 = shh.newIdentity();


	shh.post({
		"from": identity2,
		"to": identity,
		"topics": [ web3.fromAscii(TEST_TOPIC) ],
		"payload": [ web3.fromAscii(this.messagePayload()) ],
		"ttl": 100,
		"priority": 1000
	});
}

ns['Test'] = {
	controller : Controller,

	view : function(ctrl)
	{
		return <form onsubmit={ onSendMessage.bind(ctrl) }>
				<textarea name="payload" value={ ctrl.messagePayload() } onchange={ m.withAttr('value', ctrl.messagePayload) }></textarea>
				<input type="submit" />
			</form>;
	}
};

})(LetMeSee.UI, LetMeSee, m, web3, web3.shh);
