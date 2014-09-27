function OControllers(canvas)
{	this.canvas = canvas;

	this.start = function() {
		if (!this.canvas.started) {

			this.canvas.started = 1;
			document.getElementById('start').disabled = 'disabled';
			document.getElementById('pause').removeAttribute('disabled');
			this.canvas.work();

		}
	};

	this.pause = function() {

		if ( (this.canvas.paused =- this.canvas.paused) < 0) {
			
			document.getElementById('pause').value='Pause';
			this.canvas.work();

		} else {
			document.getElementById('pause').value='Continue';
		}
	};

	this.reset = function() {

		this.canvas.started = 0;
		this.canvas.paused = -1;

		document.getElementById('pause').value='Pause';
		document.getElementById('pause').disabled='disabled';
		document.getElementById('start').removeAttribute('disabled');

		this.canvas.init();

	}
}