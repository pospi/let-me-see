/** @jsx m */
/**
 * Toplevel application component
 *
 * @package	Let Me See
 * @author	Sam Pospischil <pospi@spadgos.com>
 * @since	2015-01-26
 */

(function(ui, globals, m) {

function Controller()
{
	this.videoCtrl = new ui.VideoPanel.controller();	// :TODO: check browser support and switch controllers
	this.testCtrl = new ui.Test.controller();
}

ui.App = {
	controller : Controller,

	view : function(ctrl)
	{
console.log('base view');
		return <div>
			{ ui.VideoPanel.view(ctrl.videoCtrl) }
			{ ui.Test.view(ctrl.testCtrl) }
		</div>;
	}
};

})(LetMeSee.UI, LetMeSee, m);
