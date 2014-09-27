document.addEventListener("deviceready", illust, false);
window.onload = illust();

function illust() {

	canvas2D = new OCanvas('myCanvas');
	controllers = new OControllers(canvas2D);

	canvas2D.init();
	canvas2D.work();
}