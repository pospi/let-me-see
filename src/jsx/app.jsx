/** @jsx m */
/**
 * Toplevel application component
 *
 * @package	Let Me See
 * @author	Sam Pospischil <pospi@spadgos.com>
 * @since	2015-01-26
 */

(function(ns, globals, m) {

function Controller()
{
	this.testCtrl = new ns['Test'].controller();
}

ns['App'] = {
	controller : Controller,

	view : function(ctrl)
	{
		return ns['Test'].view(ctrl.testCtrl);
	}
};

})(LetMeSee.UI, LetMeSee, m);
