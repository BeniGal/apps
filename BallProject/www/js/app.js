document.addEventListener("deviceready", illust, false);
window.onload = illust();

function illust() {
	$('#controllers').before(
		'<canvas id="myCanvas" width="'
		+($('body').width()-33)
		+'" height="'
		+(
			$('body').height() - 210
			//($('#header').height() + $('#controllers').height())
		)
		+'" style="border:1px solid #888"></canvas>'
	);

	canvas2D = new OCanvas('myCanvas');
	controllers = new OControllers(canvas2D);
	
	canvas2D.init();
	canvas2D.work();
}